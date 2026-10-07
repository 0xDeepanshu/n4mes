import { type Dirent, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Local /public content discovery — the source of truth for the
 * six-category /project/[category] structure.
 *
 *   LOCAL FOLDERS → category + project slugs + ordered detail media
 *       ↓ (consumed by src/lib/sanity/data.ts)
 *   existing view models (CategoryView / ProjectDetailView)
 *       ↓
 *   existing components (CategoryPage / ProjectDetailPage)
 *
 * This module only reads the filesystem and returns plain data.
 * No JSX, no design knowledge, no filesystem paths outside this file.
 */

/* ----------------------------------------------------------------
    Discovery rules
   ---------------------------------------------------------------- */

/** Top-level /public dirs that are asset stores, not categories. */
const NON_CATEGORY_DIRS = new Set(["font", "fonts"]);

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

/** One renderable media slot. `image: ""` = empty container (no asset). */
export interface PublicSlot {
  image: string;
  video?: string;
}

/** One item of the detail page's dynamic media list (deterministic path order). */
export interface PublicMediaItem {
  kind: "image" | "video";
  url: string;
  /** Same-stem sibling image used as the video poster — never an extra item. */
  poster?: string;
}

export interface PublicProject {
  /** URL-safe slug derived from the folder name, e.g. "bestia-brisk". */
  slug: string;
  /** Raw folder name, uppercased for display — the only project copy. */
  name: string;
  /** Listing card media: first video (poster = first image) or image. */
  card: PublicSlot;
  /** Every media file in the folder, path-ordered — drives the detail layout. */
  media: PublicMediaItem[];
}

export interface PublicCategory {
  /** URL segment — the actual /public folder name. */
  slug: string;
  projects: PublicProject[];
}

/**
 * Legacy fallback slug ↔ folder slug aliases.
 * The local copy historically used "corporte"; the real folder is
 * "corporate". Both URLs resolve to the same category view.
 */
const FOLDER_SLUG: Record<string, string> = { corporte: "corporate" };
const COPY_KEY: Record<string, string> = { corporate: "corporte" };

/** Legacy request slug → canonical folder slug (when a folder exists). */
export function toFolderSlug(slug: string): string {
  return FOLDER_SLUG[slug] ?? slug;
}

/** Folder slug → key of the existing local copy (nothing invented). */
export function toCopyKey(slug: string): string {
  return COPY_KEY[slug] ?? slug;
}

/* ----------------------------------------------------------------
    Filesystem scanning
   ---------------------------------------------------------------- */

const PUBLIC_ROOT = path.join(process.cwd(), "public");

function isHidden(name: string): boolean {
  return name.startsWith(".") || name === "__MACOSX";
}

/** URL-safe slug: "Ap Dhillon" → "ap-dhillon", "F&B" → "f-b". */
export function slugify(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sortNames(names: string[]): string[] {
  return [...names].sort((a, a2) =>
    a.localeCompare(a2, "en", { sensitivity: "base", numeric: true }),
  );
}

/** Direct child dirs of a /public folder (hidden skipped, sorted). */
function childDirs(absDir: string): string[] {
  try {
    return sortNames(
      readdirSync(absDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !isHidden(entry.name))
        .map((entry) => entry.name),
    );
  } catch {
    return [];
  }
}

/** All media files under a project folder (relative paths, sorted). */
function mediaFiles(absDir: string, base = ""): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(absDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: string[] = [];
  for (const entry of entries) {
    if (isHidden(entry.name)) continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...mediaFiles(abs, rel));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext)) files.push(rel);
    }
  }
  return files.sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base", numeric: true }),
  );
}

/** Public URL for a file relative to /public — every path segment is
 *  percent-encoded (folder names like "F&B" must not carry raw reserved
 *  characters into the URL). */
function publicUrl(rel: string): string {
  return `/${rel
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function isVideo(rel: string): boolean {
  return VIDEO_EXTS.has(path.extname(rel).toLowerCase());
}

function first(files: string[], video: boolean): string | undefined {
  return files.find((file) => isVideo(file) === video);
}

/**
 * Poster for a video: an image with the same file stem sitting right next
 * to it (same folder). Nothing else is ever used as a poster, and a poster
 * is never appended to the media list as its own item.
 */
function posterPathFor(videoFile: string, files: string[]): string | undefined {
  const dir = path.posix.dirname(videoFile).toLowerCase();
  const stem = path.posix
    .basename(videoFile, path.posix.extname(videoFile))
    .toLowerCase();
  const match = files.find(
    (file) =>
      IMAGE_EXTS.has(path.posix.extname(file).toLowerCase()) &&
      path.posix.dirname(file).toLowerCase() === dir &&
      path.posix.basename(file, path.posix.extname(file)).toLowerCase() ===
        stem,
  );
  return match;
}

function posterFor(videoFile: string, files: string[]): string | undefined {
  const match = posterPathFor(videoFile, files);
  return match ? publicUrl(match) : undefined;
}

/**
 * Resolve a project folder into its listing card + detail media list.
 *
 * Detail ordering: pure path order (case-insensitive, numeric) — every
 * media file exactly once, no cycling, no reuse, no reordering. The page
 * turns this list into the repeating hero/grid/full layout; an empty
 * folder yields an empty list (the page keeps its empty containers).
 */
function buildProject(category: string, name: string): PublicProject {
  const files = mediaFiles(
    path.join(PUBLIC_ROOT, category, name),
    `${category}/${name}`,
  );

  const firstVideo = first(files, true);
  const firstImage = first(files, false);

  const card: PublicSlot = {
    image: firstImage ? publicUrl(firstImage) : "",
    video: firstVideo ? publicUrl(firstVideo) : undefined,
  };

  const media: PublicMediaItem[] = files.map((file) =>
    isVideo(file)
      ? { kind: "video", url: publicUrl(file), poster: posterFor(file, files) }
      : { kind: "image", url: publicUrl(file) },
  );

  return {
    slug: slugify(name),
    name: name.toUpperCase(),
    card,
    media,
  };
}

/** Every category folder in /public, sorted, with its projects. */
export function listPublicCategories(): PublicCategory[] {
  return childDirs(PUBLIC_ROOT)
    .filter((name) => !NON_CATEGORY_DIRS.has(name))
    .flatMap((name) => {
      const projects = childDirs(path.join(PUBLIC_ROOT, name)).map((project) =>
        buildProject(name, project),
      );
      if (projects.length === 0) return [];
      return [{ slug: name, projects }];
    });
}

/** One category by folder slug (legacy aliases resolved). Null when absent. */
export function getPublicCategory(slug: string): PublicCategory | null {
  const folder = toFolderSlug(slug);
  return (
    listPublicCategories().find((category) => category.slug === folder) ?? null
  );
}

/** One project inside a category, looked up by URL slug. Null when absent. */
export function getPublicProject(
  categorySlug: string,
  projectSlug: string,
): PublicProject | null {
  const category = getPublicCategory(categorySlug);
  return (
    category?.projects.find((project) => project.slug === projectSlug) ?? null
  );
}

/** All `/project/[category]/[slug]` pairs for static generation. */
export function listPublicProjectParams(): {
  category: string;
  slug: string;
}[] {
  return listPublicCategories().flatMap((category) =>
    category.projects.map((project) => ({
      category: category.slug,
      slug: project.slug,
    })),
  );
}

/* ----------------------------------------------------------------
    Flat file inventory (migration tooling)
   ---------------------------------------------------------------- */

/** Flat per-project file inventory — raw public-relative paths, no URLs. */
export interface PublicProjectFiles {
  /** /public folder name, e.g. "brands". */
  category: string;
  /** Project folder name, e.g. "F&B". */
  project: string;
  /** URL-safe project slug, e.g. "f-b". */
  slug: string;
  /** Display title — uppercased folder name, the only project copy. */
  title: string;
  /** Every media file, path-ordered (same order the detail page uses). */
  files: string[];
  /** Listing card rule: first video else first image (+ poster image). */
  card: { image?: string; video?: string; poster?: string };
}

/**
 * Every project folder in /public with its raw file paths — the exact
 * upload set for `sanity/migrate.ts`. Same discovery rules as the
 * rendering path (hidden files skipped, media extensions only, deterministic
 * path order), just without URL encoding.
 */
export function listPublicProjectFiles(): PublicProjectFiles[] {
  const out: PublicProjectFiles[] = [];
  for (const category of childDirs(PUBLIC_ROOT).filter(
    (name) => !NON_CATEGORY_DIRS.has(name),
  )) {
    for (const project of childDirs(path.join(PUBLIC_ROOT, category))) {
      const files = mediaFiles(
        path.join(PUBLIC_ROOT, category, project),
        `${category}/${project}`,
      );
      const video = first(files, true);
      const image = first(files, false);
      out.push({
        category,
        project,
        slug: slugify(project),
        title: project.toUpperCase(),
        files,
        card: {
          image,
          video,
          poster: video ? posterPathFor(video, files) : undefined,
        },
      });
    }
  }
  return out;
}
