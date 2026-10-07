/**
 * migrate.ts â€” production migration of N4MES project media from
 * /public to Sanity Content Lake.
 *
 * Steps (idempotent â€” safe to re-run; upload progress lives in
 * sanity/.media-manifest.json):
 *  1. Converts the six legacy self-projects from fixed card slots
 *     (card1..card4 + closingBanner) to the ordered `media[]` array
 *     (in place â€” existing asset references are reused, nothing uploads).
 *  2. Uploads every file under /public/<category>/<project>/ to Sanity
 *     (image/* â†’ image assets, video/* â†’ file assets).
 *  3. Creates/updates one `project` document per folder:
 *     categoryRef-linked; hero = first file (image, or video + same-stem
 *     poster), media[] = remaining files in path order.
 *  4. Points each foldered category's ordered `projects[]` at those
 *     documents (categories without folders â€” motion â€” are untouched).
 *  5. Writes sanity/.project-inventory.json â€” the test gates' source of
 *     truth for project files + localâ†”CDN asset URL mapping.
 *
 * Usage:  npx tsx sanity/migrate.ts
 * Needs:  NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN in .env.local
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import {
  listPublicProjectFiles,
  type PublicProjectFiles,
} from "../src/lib/content/public-content";
import { createUploader } from "./upload";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
});

const uploader = createUploader(client);

const INVENTORY_PATH = path.resolve(
  process.cwd(),
  "sanity",
  ".project-inventory.json",
);

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

const isVideo = (file: string): boolean =>
  VIDEO_EXTS.has(path.posix.extname(file).toLowerCase());

/** Same-stem sibling image for a video (poster), path-order independent. */
function sameStemPoster(video: string, files: string[]): string | undefined {
  const dir = path.posix.dirname(video).toLowerCase();
  const stem = path.posix
    .basename(video, path.posix.extname(video))
    .toLowerCase();
  return files.find(
    (file) =>
      IMAGE_EXTS.has(path.posix.extname(file).toLowerCase()) &&
      path.posix.dirname(file).toLowerCase() === dir &&
      path.posix.basename(file, path.posix.extname(file)).toLowerCase() ===
        stem,
  );
}

interface CategoryMeta {
  _id: string;
  slug: { current: string };
  title: string;
  subtitle: string;
  description: string;
  tint?: string;
}

async function loadCategories(): Promise<Map<string, CategoryMeta>> {
  const categories = await client.fetch<CategoryMeta[]>(
    `*[_type == "category"]{ _id, slug, title, subtitle, description, tint }`,
  );
  return new Map(
    categories.map((category) => [category.slug.current, category]),
  );
}

/* ----------------------------------------------------------------
    Step 1 â€” legacy fixed card slots â†’ ordered media[] (in place)
   ---------------------------------------------------------------- */

interface LegacyDoc {
  _id: string;
  hasMedia: boolean;
  card1?: Record<string, unknown>;
  card2?: Record<string, unknown>;
  card3?: Record<string, unknown>;
  card4?: Record<string, unknown>;
  closingBanner?: Record<string, unknown>;
}

async function convertLegacyProjects(): Promise<void> {
  console.log("\n[1/5] legacy card slots -> media[]");
  const docs = await client.fetch<LegacyDoc[]>(
    `*[_type == "project" && !defined(categoryRef)]{
      _id,
      "hasMedia": defined(media),
      card1, card2, card3, card4, closingBanner
    }`,
  );

  for (const doc of docs) {
    const slots = [
      doc.card1,
      doc.card2,
      doc.card3,
      doc.card4,
      doc.closingBanner,
    ].filter((slot): slot is Record<string, unknown> => Boolean(slot));

    if (slots.length === 0) {
      console.log(
        `  skip ${doc._id} (${doc.hasMedia ? "already media[]" : "no card slots"})`,
      );
      continue;
    }

    const media = slots.map((slot, index) => ({
      _key: `m-${index}`,
      _type: "projectMedia" as const,
      ...(slot.image ? { image: slot.image } : {}),
      ...(slot.video ? { video: slot.video } : {}),
    }));

    await client
      .patch(doc._id)
      .set({ media })
      .unset(["card1", "card2", "card3", "card4", "closingBanner"])
      .commit();
    console.log(`  ${doc._id}: ${slots.length} slots -> media[]`);
  }
}

/* ----------------------------------------------------------------
    Step 2 â€” upload every project file (manifest-idempotent)
   ---------------------------------------------------------------- */

async function uploadProjectMedia(
  projects: PublicProjectFiles[],
): Promise<void> {
  console.log("\n[2/5] uploading project media to Sanity");

  // Heal manifest entries whose assets were deleted in the Studio.
  const allPaths = projects.flatMap((project) => project.files);
  const missing = await uploader.verify(allPaths);
  if (missing.length > 0) {
    console.log(
      `  ${missing.length} manifest entries missing remotely â€” re-uploading`,
    );
    uploader.evict(missing);
  }

  let done = 0;
  for (const project of projects) {
    for (const file of project.files) {
      const entry = await uploader.upload(file);
      done += 1;
      const mb = (entry.size / (1024 * 1024)).toFixed(1);
      console.log(`  [${done}/${allPaths.length}] ${file} (${mb} MB) ok`);
    }
  }
  await uploader.flush();
}

/* ----------------------------------------------------------------
    Step 3 â€” one project document per folder
   ---------------------------------------------------------------- */

async function upsertFolderProjects(
  projects: PublicProjectFiles[],
  categories: Map<string, CategoryMeta>,
): Promise<void> {
  console.log("\n[3/5] creating project documents");
  const manifest = await uploader.manifest();

  const ref = (file: string): { _type: "reference"; _ref: string } => {
    const entry = manifest[file];
    if (!entry) throw new Error(`no manifest entry for ${file}`);
    return { _type: "reference", _ref: entry.assetId };
  };
  const imageField = (file: string, alt: string) => ({
    _type: "image" as const,
    asset: ref(file),
    alt,
  });
  const fileField = (file: string) => ({
    _type: "file" as const,
    asset: ref(file),
  });

  for (const project of projects) {
    const category = categories.get(project.category);
    if (!category) {
      console.warn(
        `  skip ${project.category}/${project.slug}: no category document`,
      );
      continue;
    }

    const prefix = `${project.category}/${project.project}/`;
    const rel = (file: string) => file.slice(prefix.length);
    const first = project.files[0];

    let hero: ReturnType<typeof imageField> | undefined;
    let heroVideo: ReturnType<typeof fileField> | undefined;
    if (first) {
      if (isVideo(first)) {
        heroVideo = fileField(first);
        const poster = sameStemPoster(first, project.files);
        if (poster) hero = imageField(poster, project.title);
      } else {
        hero = imageField(first, project.title);
      }
    }

    const media = project.files.slice(1).map((file, index) => {
      const item: Record<string, unknown> = {
        _key: `m-${index}`,
        _type: "projectMedia",
      };
      if (isVideo(file)) {
        item.video = fileField(file);
        const poster = sameStemPoster(file, project.files);
        if (poster) item.image = imageField(poster, project.title);
      } else {
        item.image = imageField(file, project.title);
      }
      return item;
    });

    await client.createOrReplace({
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      category: category.subtitle,
      description: category.description,
      tint: category.tint,
      categoryRef: { _type: "reference", _ref: category._id },
      ...(hero ? { hero } : {}),
      ...(heroVideo ? { heroVideo } : {}),
      media,
    });
    console.log(
      `  project-${project.slug}: hero=${first ? rel(first) : "(empty)"} media=${media.length} (category=${category.slug.current})`,
    );
  }
}

/* ----------------------------------------------------------------
    Step 4 â€” ordered category project references
   ---------------------------------------------------------------- */

async function linkCategoryProjects(
  projects: PublicProjectFiles[],
  categories: Map<string, CategoryMeta>,
): Promise<void> {
  console.log("\n[4/5] linking category project lists");

  const byCategory = new Map<string, string[]>();
  for (const project of projects) {
    const list = byCategory.get(project.category) ?? [];
    list.push(`project-${project.slug}`);
    byCategory.set(project.category, list);
  }

  for (const [slug, ids] of byCategory) {
    const category = categories.get(slug);
    if (!category) {
      console.warn(`  skip category-${slug}: not found`);
      continue;
    }
    const refs = ids.map((_id, index) => ({
      _key: `p-${index}`,
      _type: "reference" as const,
      _ref: _id,
    }));
    await client.patch(category._id).set({ projects: refs }).commit();
    console.log(`  category-${slug}: ${refs.length} projects`);
  }

  for (const slug of categories.keys()) {
    if (!byCategory.has(slug)) {
      console.log(`  category-${slug}: untouched (no /public folder)`);
    }
  }
}

/* ----------------------------------------------------------------
    Step 5 â€” gate inventory (project files + URL mapping)
   ---------------------------------------------------------------- */

interface Inventory {
  generatedAt: string;
  projects: Record<
    string,
    {
      title: string;
      folder: string;
      category: string;
      files: string[];
      card: { image?: string; video?: string };
    }
  >;
  assets: Record<string, { url: string; assetId: string }>;
}

async function writeInventory(projects: PublicProjectFiles[]): Promise<void> {
  console.log("\n[5/5] writing project inventory");

  const manifest = await uploader.manifest();
  const inventory: Inventory = {
    generatedAt: new Date().toISOString(),
    projects: {},
    assets: {},
  };

  for (const project of projects) {
    const prefix = `${project.category}/${project.project}/`;
    const rel = (file: string) => file.slice(prefix.length);
    inventory.projects[`${project.category}/${project.slug}`] = {
      title: project.title,
      folder: project.project,
      category: project.category,
      files: project.files.map(rel),
      card: {
        ...(project.card.image ? { image: rel(project.card.image) } : {}),
        ...(project.card.video ? { video: rel(project.card.video) } : {}),
      },
    };
    for (const file of project.files) {
      const entry = manifest[file];
      if (!entry) throw new Error(`no manifest entry for ${file}`);
      inventory.assets[`/${file}`] = { url: entry.url, assetId: entry.assetId };
    }
  }

  await writeFile(
    INVENTORY_PATH,
    `${JSON.stringify(inventory, null, 2)}\n`,
    "utf8",
  );
  console.log(
    `  ${Object.keys(inventory.projects).length} projects, ${Object.keys(inventory.assets).length} assets -> ${INVENTORY_PATH}`,
  );
}

/* ---------------------------------------------------------------- */

async function main() {
  console.log(`Migrating Sanity project ${projectId} / ${dataset}`);

  const projects = listPublicProjectFiles();
  const totalFiles = projects.reduce(
    (sum, project) => sum + project.files.length,
    0,
  );
  console.log(
    `${projects.length} project folders, ${totalFiles} media files discovered`,
  );

  await convertLegacyProjects();
  await uploadProjectMedia(projects);
  const categories = await loadCategories();
  await upsertFolderProjects(projects, categories);
  await linkCategoryProjects(projects, categories);
  await writeInventory(projects);

  console.log("\nMigration complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
