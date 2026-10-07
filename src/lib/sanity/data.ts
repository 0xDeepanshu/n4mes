import {
  getCategory as getLocalCategory,
  categories as localCategories,
} from "@/data/categories";
import {
  getProject as getLocalProject,
  projects as localProjects,
} from "@/data/projects";
import {
  getPublicCategory,
  getPublicProject,
  listPublicCategories,
  listPublicProjectParams,
  type PublicCategory,
  type PublicProject,
  toCopyKey,
  toFolderSlug,
} from "@/lib/content/public-content";
import type {
  CategoryDoc,
  ClientDoc,
  HomePageDoc,
  JournalPostDoc,
  ProjectDoc,
  ProjectMediaSlot,
  SiteSettings,
} from "@/types/sanity";
import { hasSanity, sanityClient } from "./client";
import { imgSrc } from "./image";
import {
  allCategoriesQuery,
  allCategorySlugsQuery,
  allClientsQuery,
  allJournalPostsQuery,
  allProjectSlugsQuery,
  allProjectsQuery,
  categoryBySlugQuery,
  homePageQuery,
  legacyProjectSlugsQuery,
  projectByCategoryAndSlugQuery,
  projectBySlugQuery,
  siteSettingsQuery,
} from "./queries";

/**
 * Sanity is the source of truth once configured; every getter below logs
 * a DISTINCT failure mode instead of silently returning null:
 *   [sanity] not configured      → no project id in the environment (warn once)
 *   [sanity] fetch failed        → network/API error (console.error, per call)
 *   [sanity] no … document       → dataset drift / missing doc (warn, per call)
 *   [content] no … source        → CMS + local fallbacks all missed (warn)
 */
let notConfiguredWarned = false;

function logNotConfigured(label: string): void {
  if (notConfiguredWarned) return;
  notConfiguredWarned = true;
  console.warn(
    `[sanity] not configured (NEXT_PUBLIC_SANITY_PROJECT_ID / dataset) — serving local content for "${label}"`,
  );
}

async function fetchSanity<T>(
  query: string,
  params?: Record<string, string>,
  tags: string[] = ["sanity"],
  label = "query",
): Promise<T | null> {
  if (!hasSanity()) {
    logNotConfigured(label);
    return null;
  }
  const request = {
    next: { revalidate: 60, tags: Array.from(new Set(["sanity", ...tags])) },
  } as const;
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await sanityClient().fetch<T>(query, params ?? {}, request);
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 300));
      }
    }
  }
  console.error(
    `[sanity] fetch failed for "${label}" — falling back to local content:`,
    lastError,
  );
  return null;
}

/* ================================================================
    Global getters
   ================================================================ */

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchSanity<SiteSettings>(
    siteSettingsQuery,
    undefined,
    ["sanity"],
    "siteSettings",
  );
}

export async function getHomePage(): Promise<HomePageDoc | null> {
  return fetchSanity<HomePageDoc>(
    homePageQuery,
    undefined,
    ["sanity"],
    "homePage",
  );
}

export async function getAllProjects(): Promise<ProjectDoc[]> {
  return (
    (await fetchSanity<ProjectDoc[]>(
      allProjectsQuery,
      undefined,
      ["sanity"],
      "projects",
    )) ?? []
  );
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDoc | null> {
  return fetchSanity<ProjectDoc>(
    projectBySlugQuery,
    { slug },
    ["sanity"],
    `project:${slug}`,
  );
}

export async function getAllJournalPosts(): Promise<JournalPostDoc[]> {
  return (
    (await fetchSanity<JournalPostDoc[]>(
      allJournalPostsQuery,
      undefined,
      ["sanity"],
      "journal",
    )) ?? []
  );
}

export async function getAllClients(): Promise<ClientDoc[]> {
  return (
    (await fetchSanity<ClientDoc[]>(
      allClientsQuery,
      undefined,
      ["sanity"],
      "clients",
    )) ?? []
  );
}

/* ================================================================
    View models consumed by the existing components
   ================================================================ */

export interface HomeProjectCard {
  category: string;
  title: string[];
  image: string;
  alt: string;
  tint: string;
  href: string;
  video?: string;
}

/** Resolved media for one project slot (Sanity CDN or local /public). */
export interface ProjectMediaView {
  image?: string;
  video?: string;
  alt: string;
}

/**
 * Category / listing page view — /project/[category].
 * The hero content and the project cards below it are CMS-controlled;
 * the layout (hero + 2×2 project card grid) is fixed in React.
 */
export interface CategoryView {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tint?: string;
  hero: string;
  heroAlt: string;
  heroVideo?: string;
  card: ProjectMediaView;
  order: number;
  /** Ordered projects belonging to this category, resolved for the grid. */
  projects: CategoryProject[];
}

/** One project resolved for the listing card grid, ready for ProjectCard. */
export interface CategoryProject {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  tint: string;
  video?: string;
}

/** One section of the repeating detail layout below the hero. */
export type ProjectDetailSection =
  | { kind: "full"; media: ProjectMediaView }
  | { kind: "grid"; media: ProjectMediaView[] };

export interface ProjectDetailView {
  slug: string;
  title: string;
  category: string;
  description: string;
  hero: string;
  heroAlt: string;
  heroVideo?: string;
  /** Fallback tint behind the hero container when no media exists yet.
   *  Invisible whenever media fills the (fixed) hero. */
  tint?: string;
  /** Media below the hero: alternating grid(≤4) / full(1) sections. */
  sections: ProjectDetailSection[];
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: string;
}

/** Fallback card tints — mirrors the values previously hardcoded in the home page JSX. */
const FALLBACK_TINTS: Record<string, string> = {
  brands: "#4d140b",
  music: "#0b3a31",
  people: "#3a2a10",
  corporate: "#1f2328",
  corporte: "#1f2328",
  built: "#1f2328",
  motion: "#1f2328",
};

/**
 * Project cards for the home page grid.
 * Reads the ordered references from the Home Page document, falling back
 * to `src/data/projects.ts` while the CMS is not connected.
 */
export async function getHomeProjectCards(): Promise<HomeProjectCard[]> {
  const home = await getHomePage();
  const referenced = home?.projectCards;

  if (referenced?.length) {
    const cards: HomeProjectCard[] = [];
    for (const project of referenced) {
      if (!project?.slug?.current) continue;
      const image = imgSrc(project.hero, 1600);
      if (!image) continue;
      cards.push({
        category: project.category,
        title: [project.title],
        image,
        alt: project.hero?.alt ?? project.title,
        tint: project.tint ?? "transparent",
        href: `/project/${toFolderSlug(project.slug.current)}`,
        video: project.heroVideo?.asset?.url,
      });
    }
    if (cards.length > 0) return cards;
  }

  return localProjects.map((project) => ({
    category: project.category,
    title: [project.title],
    image: project.hero.src,
    alt: project.hero.alt,
    tint: FALLBACK_TINTS[project.slug] ?? "transparent",
    href: `/project/${toFolderSlug(project.slug)}`,
  }));
}

/* ================================================================
    Category / listing page views — /project/[category]
   ================================================================ */

/**
 * All active categories (in `order`).
 * Sanity is the source of truth; /public folders and `src/data` are the
 * local fallback while the dataset is empty.
 */
export async function getAllCategoryViews(): Promise<CategoryView[]> {
  const docs = await fetchSanity<CategoryDoc[]>(
    allCategoriesQuery,
    undefined,
    ["sanity"],
    "categories",
  );
  if (docs?.length) {
    const views = docs
      .map(mapSanityCategory)
      .filter((view): view is CategoryView => view !== null);
    if (views.length > 0) return views;
    if (docs.length > 0) {
      console.warn(
        "[sanity] category documents exist but none could be mapped (missing hero) — trying local sources",
      );
    }
  }

  const fromPublic = listPublicCategories().flatMap((category) => {
    const view = mapPublicCategory(getPublicCategory(category.slug));
    return view ? [view] : [];
  });
  if (fromPublic.length > 0) return fromPublic;

  return localCategories.map(mapLocalCategory);
}

/** Hero content for one category page. Null when neither source knows it. */
export async function getCategoryView(
  slug: string,
): Promise<CategoryView | null> {
  // Sanity first — the dataset owns the six-category structure. Local
  // sources only kick in when the dataset has no usable document.
  const canonical = toFolderSlug(slug);
  if (hasSanity()) {
    const doc = await fetchSanity<CategoryDoc>(
      categoryBySlugQuery,
      { slug: canonical },
      ["sanity"],
      `category:${canonical}`,
    );
    if (doc) {
      const view = mapSanityCategory(doc);
      if (view) return view;
      console.warn(
        `[sanity] category "${canonical}" exists but could not be mapped (missing hero) — trying local sources`,
      );
    } else {
      console.warn(
        `[sanity] no category document for "${canonical}" — trying local sources`,
      );
    }
  } else {
    logNotConfigured(`category:${canonical}`);
  }

  const fromPublic = mapPublicCategory(getPublicCategory(slug));
  if (fromPublic) return fromPublic;

  const local = getLocalCategory(slug);
  if (local) return mapLocalCategory(local);

  console.warn(`[content] no source for category "/project/${slug}"`);
  return null;
}

/**
 * Category view backed by an actual /public folder.
 * Hero + copy come from the existing local category copy (nothing
 * invented); the project list and all card media come from the folder.
 */
function mapPublicCategory(
  category: PublicCategory | null,
): CategoryView | null {
  if (!category) return null;

  const copy = getLocalCategory(toCopyKey(category.slug));
  const title = copy?.title ?? category.slug.toUpperCase();
  const subtitle = copy?.subtitle ?? "";
  const hero = copy?.hero.src ?? "";

  const projects: CategoryProject[] = category.projects.map((project) => ({
    slug: project.slug,
    title: project.name,
    subtitle,
    image: project.card.image,
    alt: project.name,
    tint: copy?.tint ?? "transparent",
    video: project.card.video,
  }));

  return {
    slug: category.slug,
    title,
    subtitle,
    description: copy?.description ?? "",
    tint: copy?.tint,
    hero,
    heroAlt: copy?.hero.alt ?? title,
    card: { image: hero, alt: copy?.hero.alt ?? title },
    order: copy?.order ?? 999,
    projects,
  };
}

/**
 * Project cards for one listing page: the ordered projects that belong
 * to `/project/[category]`. Each card navigates to the existing detail
 * template at `/project/[category]/[project]`.
 */
export async function getCategoryProjectCards(
  categorySlug: string,
): Promise<HomeProjectCard[]> {
  const view = await getCategoryView(categorySlug);
  if (!view) return [];

  return view.projects.map((project) => ({
    category: project.subtitle,
    title: [project.title],
    image: project.image,
    alt: project.alt,
    tint: project.tint,
    video: project.video,
    href: `/project/${view.slug}/${project.slug}`,
  }));
}

/** Union of /public folders + CMS + local category slugs so static generation works offline. */
export async function getAllCategorySlugs(): Promise<string[]> {
  const fromPublic = listPublicCategories().map((category) => category.slug);
  const fromCms =
    (await fetchSanity<{ slug: string }[]>(allCategorySlugsQuery))?.map(
      (entry) => entry.slug,
    ) ?? [];
  const fromLocal = localCategories.map((category) => category.slug);
  return Array.from(new Set([...fromPublic, ...fromCms, ...fromLocal]));
}

/**
 * Listing card media for one project — the exact filesystem rule:
 * first video in path order, else first image; a card video's poster is
 * the first image. The hero slot + ordered `media[]` mirror the folder's
 * path order, so scanning them reproduces the old folder behaviour.
 */
function deriveListingCard(
  project: Pick<ProjectDoc, "title" | "hero" | "heroVideo" | "media">,
): { image?: string; video?: string; alt: string } {
  const alt = project.hero?.alt ?? project.title;
  const slots: ProjectMediaSlot[] = [
    ...(project.hero || project.heroVideo
      ? [{ image: project.hero, video: project.heroVideo }]
      : []),
    ...(project.media ?? []),
  ];

  let image: string | undefined;
  let video: string | undefined;
  for (const slot of slots) {
    if (!image && slot.image) {
      const url = imgSrc(slot.image, 1600);
      if (url) image = url;
    }
    if (!video && slot.video?.asset?.url) {
      video = slot.video.asset.url;
    }
    if (image && video) break;
  }
  return { image, video, alt };
}

function mapSanityCategory(doc: CategoryDoc): CategoryView | null {
  const hero = imgSrc(doc.hero, 2000);
  if (!hero) return null;

  const cardImage = imgSrc(doc.cardMedia?.image, 1600);
  const projects: CategoryProject[] = (doc.projects ?? []).flatMap(
    (project) => {
      if (!project?.slug?.current) return [];
      // Empty projects keep their card (the design's fallback container)
      // — exactly like the old folder-driven listing.
      const card = deriveListingCard(project);
      return [
        {
          slug: project.slug.current,
          title: project.title,
          subtitle: project.category,
          image: card.image ?? "",
          alt: card.alt,
          tint: project.tint ?? "transparent",
          video: card.video,
        },
      ];
    },
  );

  return {
    slug: doc.slug.current,
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    tint: doc.tint,
    hero,
    heroAlt: doc.hero?.alt ?? doc.title,
    heroVideo: doc.heroVideo?.asset?.url,
    card: {
      image: cardImage ?? hero,
      video: doc.cardMedia?.video?.asset?.url,
      alt: doc.cardMedia?.image?.alt ?? doc.title,
    },
    order: doc.order ?? 999,
    projects,
  };
}

function mapLocalCategory(
  local: NonNullable<ReturnType<typeof getLocalCategory>>,
): CategoryView {
  const projects: CategoryProject[] = local.projects.flatMap((slug) => {
    const project = getLocalProject(slug);
    if (!project) return [];
    return [
      {
        slug: project.slug,
        title: project.title,
        subtitle: project.category,
        image: project.hero.src,
        alt: project.hero.alt,
        tint: FALLBACK_TINTS[project.slug] ?? "transparent",
      },
    ];
  });

  return {
    slug: local.slug,
    title: local.title,
    subtitle: local.subtitle,
    description: local.description,
    tint: local.tint,
    hero: local.hero.src,
    heroAlt: local.hero.alt,
    card: { image: local.hero.src, alt: local.hero.alt },
    order: local.order,
    projects,
  };
}

/**
 * Unscoped project lookup (legacy self-projects without a `categoryRef`)
 * — used by /projects/[slug] so per-folder projects stay out of that route.
 * Tries the canonical slug first, then the raw request slug.
 */
async function resolveUnscopedProjectDoc(
  slug: string,
): Promise<ProjectDoc | null> {
  const normalizedSlug = slug === "corporte" ? "corporate" : slug;
  const doc = await fetchSanity<ProjectDoc>(
    projectBySlugQuery,
    { slug: normalizedSlug },
    ["sanity"],
    `project:${normalizedSlug}`,
  );
  if (doc) return doc;
  if (normalizedSlug !== slug) {
    return fetchSanity<ProjectDoc>(
      projectBySlugQuery,
      { slug },
      ["sanity"],
      `project:${slug}`,
    );
  }
  return null;
}

/**
 * Detail view for /projects/[slug].
 * Prefers Sanity (unscoped legacy documents only), falls back to the
 * local tuple data in `src/data/projects.ts`.
 * Returns null when neither source knows the slug.
 */
export async function getProjectDetailView(
  slug: string,
): Promise<ProjectDetailView | null> {
  const doc = await resolveUnscopedProjectDoc(slug);
  if (doc) return mapSanityProject(doc);

  const normalizedSlug = slug === "corporte" ? "corporate" : slug;
  const local = getLocalProject(normalizedSlug) ?? getLocalProject(slug);
  if (local) return mapLocalProject(local);

  console.warn(`[content] no source for project "/projects/${slug}"`);
  return null;
}

/**
 * Detail view for the nested route /project/[category]/[slug].
 * Sanity first: the project linked to this category (`categoryRef`),
 * then unscoped legacy self-projects; only then the local /public folder
 * and the local tuple data (offline / not-configured fallbacks).
 */
export async function getNestedProjectDetailView(
  categorySlug: string,
  projectSlug: string,
): Promise<ProjectDetailView | null> {
  const category = toFolderSlug(categorySlug);
  const canonicalProject = toFolderSlug(projectSlug);

  const doc =
    (await fetchSanity<ProjectDoc>(
      projectByCategoryAndSlugQuery,
      { category, slug: canonicalProject },
      ["sanity"],
      `project:${category}/${canonicalProject}`,
    )) ??
    (canonicalProject !== projectSlug
      ? await fetchSanity<ProjectDoc>(
          projectByCategoryAndSlugQuery,
          { category, slug: projectSlug },
          ["sanity"],
          `project:${category}/${projectSlug}`,
        )
      : null);

  if (doc) return mapSanityProject(doc);
  if (hasSanity()) {
    console.warn(
      `[sanity] no project document for "${category}/${canonicalProject}" — trying local sources`,
    );
  }

  const project = getPublicProject(categorySlug, projectSlug);
  if (project) return mapPublicProject(categorySlug, project);

  const local =
    getLocalProject(canonicalProject) ?? getLocalProject(projectSlug);
  if (local) return mapLocalProject(local);

  console.warn(
    `[content] no source for project "/project/${categorySlug}/${projectSlug}"`,
  );
  return null;
}

/**
 * The fixed empty state: 4 card containers + 1 full banner with no media
 * yet (existing empty-project behaviour — containers keep their size and
 * show the design's fallback; no assets are invented).
 */
function emptyDetailSections(alt: string): ProjectDetailSection[] {
  const empty: ProjectMediaView = { image: "", alt };
  return [
    { kind: "grid", media: [empty, empty, empty, empty] },
    { kind: "full", media: empty },
  ];
}

/**
 * Repeating detail layout for the media below the hero:
 *   grid(≤4) → full(1) → grid(≤4) → full(1) → …
 * Every item is consumed exactly once, in order; the final grid may hold
 * 1–4 items (a partial grid is allowed — nothing is reused to fill it).
 */
function buildDetailSections(
  afterHero: ProjectMediaView[],
): ProjectDetailSection[] {
  const sections: ProjectDetailSection[] = [];
  let index = 0;
  let grid = true;
  while (index < afterHero.length) {
    if (grid) {
      sections.push({ kind: "grid", media: afterHero.slice(index, index + 4) });
      index += 4;
    } else {
      sections.push({ kind: "full", media: afterHero[index] });
      index += 1;
    }
    grid = !grid;
  }
  return sections;
}

/**
 * Detail view backed by an actual /public project folder.
 * Copy: existing category description/subtitle (never invented);
 * title: the folder name; media: every file in the folder, path-ordered.
 */
function mapPublicProject(
  categorySlug: string,
  project: PublicProject,
): ProjectDetailView {
  const copy = getLocalCategory(toCopyKey(toFolderSlug(categorySlug)));
  const alt = project.name;

  const items: ProjectMediaView[] = project.media.map((item) => ({
    image: item.kind === "image" ? item.url : item.poster,
    video: item.kind === "video" ? item.url : undefined,
    alt,
  }));

  return {
    slug: project.slug,
    title: project.name,
    category: copy?.subtitle ?? "",
    description: copy?.description ?? "",
    hero: items[0]?.image ?? "",
    heroAlt: alt,
    heroVideo: items[0]?.video,
    tint: copy?.tint,
    sections:
      items.length === 0
        ? emptyDetailSections(alt)
        : buildDetailSections(items.slice(1)),
  };
}

/**
 * All /project/[category]/[slug] pairs for static generation:
 * category-linked projects (Sanity) ∪ legacy self pairs ∪ /public folders
 * (offline fallback — empty after the media migration).
 */
export async function getAllNestedProjectParams(): Promise<
  { category: string; slug: string }[]
> {
  const fromViews = (await getAllCategoryViews()).flatMap((category) =>
    category.projects.map((project) => ({
      category: category.slug,
      slug: project.slug,
    })),
  );

  const legacySlugs =
    (await fetchSanity<{ slug: string }[]>(
      legacyProjectSlugsQuery,
      undefined,
      ["sanity"],
      "legacy-project-slugs",
    )) ?? [];
  const fromLegacy = legacySlugs.map((entry) => ({
    category: entry.slug,
    slug: entry.slug,
  }));

  const unique = new Map<string, { category: string; slug: string }>();
  for (const pair of [
    ...listPublicProjectParams(),
    ...fromViews,
    ...fromLegacy,
  ]) {
    unique.set(`${pair.category}/${pair.slug}`, pair);
  }
  return Array.from(unique.values());
}

/** Resolve one fixed media slot (Sanity image/video) to renderable URLs. */
function mapMediaSlot(
  slot: ProjectMediaSlot | undefined,
  fallbackAlt: string,
  width: number,
): ProjectMediaView {
  return {
    image: imgSrc(slot?.image, width),
    video: slot?.video?.asset?.url,
    alt: slot?.image?.alt ?? fallbackAlt,
  };
}

function mapSanityProject(doc: ProjectDoc): ProjectDetailView {
  const hero = imgSrc(doc.hero, 2000) ?? "";
  const heroVideo = doc.heroVideo?.asset?.url;
  const hasHeroMedia = Boolean(hero || heroVideo);

  // Width per section role (mirrors the old fixed slots):
  // hero/full = 2000, grid cards = 1200. After-hero positions alternate
  // grid(4) → full(1), so position % 5 === 4 is a full-width banner.
  const afterHero: ProjectMediaView[] = (doc.media ?? []).map((slot, index) =>
    mapMediaSlot(slot, doc.title, index % 5 === 4 ? 2000 : 1200),
  );

  return {
    slug: doc.slug.current,
    title: doc.title,
    category: doc.category,
    description: doc.description,
    hero,
    heroAlt: doc.hero?.alt ?? doc.title,
    heroVideo,
    tint: doc.categoryTint ?? undefined,
    sections:
      !hasHeroMedia && afterHero.length === 0
        ? emptyDetailSections(doc.title)
        : buildDetailSections(afterHero),
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    seoOgImage: imgSrc(doc.seoOgImage, 1200),
  };
}

function mapLocalProject(
  local: NonNullable<ReturnType<typeof getLocalProject>>,
): ProjectDetailView {
  const [row1Image, row2Image, row3Image] = local.rowImages;
  const [feature1, feature2] = local.features;

  const media = (image: { src: string; alt: string }): ProjectMediaView => ({
    image: image.src,
    alt: image.alt,
  });

  return {
    slug: local.slug,
    title: local.title,
    category: local.category,
    description: local.description,
    hero: local.hero.src,
    heroAlt: local.hero.alt,
    // Existing local project media, mapped into the fixed sections:
    // grid = 3 row images + first full-width feature, full = second feature.
    sections: buildDetailSections([
      media(row1Image),
      media(row2Image),
      media(row3Image),
      media(feature1),
      media(feature2),
    ]),
  };
}

/** Union of CMS + local slugs so static generation works before migration. */
export async function getAllProjectSlugs(): Promise<string[]> {
  const fromCms =
    (await fetchSanity<{ slug: string }[]>(allProjectSlugsQuery))?.map(
      (entry) => entry.slug,
    ) ?? [];
  const fromLocal = localProjects.map((project) => project.slug);
  return Array.from(new Set([...fromCms, ...fromLocal, "corporte"]));
}
