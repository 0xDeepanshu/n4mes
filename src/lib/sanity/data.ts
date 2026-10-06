import {
  getProject as getLocalProject,
  projects as localProjects,
} from "@/data/projects";
import type {
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
  allClientsQuery,
  allJournalPostsQuery,
  allProjectSlugsQuery,
  allProjectsQuery,
  homePageQuery,
  projectBySlugQuery,
  siteSettingsQuery,
} from "./queries";

async function fetchSanity<T>(
  query: string,
  params?: Record<string, string>,
): Promise<T | null> {
  if (!hasSanity()) return null;
  try {
    return await sanityClient().fetch<T>(query, params ?? {}, {
      next: { revalidate: 60 },
    });
  } catch {
    return null;
  }
}

/* ================================================================
    Global getters
   ================================================================ */

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchSanity<SiteSettings>(siteSettingsQuery);
}

export async function getHomePage(): Promise<HomePageDoc | null> {
  return fetchSanity<HomePageDoc>(homePageQuery);
}

export async function getAllProjects(): Promise<ProjectDoc[]> {
  return (await fetchSanity<ProjectDoc[]>(allProjectsQuery)) ?? [];
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDoc | null> {
  return fetchSanity<ProjectDoc>(projectBySlugQuery, { slug });
}

export async function getAllJournalPosts(): Promise<JournalPostDoc[]> {
  return (await fetchSanity<JournalPostDoc[]>(allJournalPostsQuery)) ?? [];
}

export async function getAllClients(): Promise<ClientDoc[]> {
  return (await fetchSanity<ClientDoc[]>(allClientsQuery)) ?? [];
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

/** Resolved media for one fixed project slot (Sanity CDN or local /public). */
export interface ProjectMediaView {
  image?: string;
  video?: string;
  alt: string;
}

/** Fixed tuple: the React-controlled 2×2 card grid. */
export type ProjectCards = [
  ProjectMediaView,
  ProjectMediaView,
  ProjectMediaView,
  ProjectMediaView,
];

export interface ProjectDetailView {
  slug: string;
  title: string;
  category: string;
  description: string;
  hero: string;
  heroAlt: string;
  heroVideo?: string;
  cards: ProjectCards;
  closingBanner: ProjectMediaView;
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: string;
}

/** Fallback card tints — mirrors the values previously hardcoded in the home page JSX. */
const FALLBACK_TINTS: Record<string, string> = {
  brands: "#4d140b",
  music: "#0b3a31",
  people: "#3a2a10",
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
        href: `/projects/${project.slug.current}`,
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
    href: `/projects/${project.slug}`,
  }));
}

/**
 * Detail view for /projects/[slug].
 * Prefers Sanity, falls back to the local tuple data in `src/data/projects.ts`.
 * Returns null when neither source knows the slug.
 */
export async function getProjectDetailView(
  slug: string,
): Promise<ProjectDetailView | null> {
  const doc = await getProjectBySlug(slug);
  if (doc) return mapSanityProject(doc);

  const local = getLocalProject(slug);
  if (local) return mapLocalProject(local);

  return null;
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

function mapSanityProject(doc: ProjectDoc): ProjectDetailView | null {
  const hero = imgSrc(doc.hero, 2000);
  if (!hero) return null;

  return {
    slug: doc.slug.current,
    title: doc.title,
    category: doc.category,
    description: doc.description,
    hero,
    heroAlt: doc.hero?.alt ?? doc.title,
    heroVideo: doc.heroVideo?.asset?.url,
    cards: [
      mapMediaSlot(doc.card1, doc.title, 1200),
      mapMediaSlot(doc.card2, doc.title, 1200),
      mapMediaSlot(doc.card3, doc.title, 1200),
      mapMediaSlot(doc.card4, doc.title, 1200),
    ],
    closingBanner: mapMediaSlot(doc.closingBanner, doc.title, 2000),
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
    // Existing local project media, mapped into the fixed slots:
    // cards = 3 row images + first full-width feature, closing = second feature.
    cards: [
      media(row1Image),
      media(row2Image),
      media(row3Image),
      media(feature1),
    ],
    closingBanner: media(feature2),
  };
}

/** Union of CMS + local slugs so static generation works before migration. */
export async function getAllProjectSlugs(): Promise<string[]> {
  const fromCms =
    (await fetchSanity<{ slug: string }[]>(allProjectSlugsQuery))?.map(
      (entry) => entry.slug,
    ) ?? [];
  const fromLocal = localProjects.map((project) => project.slug);
  return Array.from(new Set([...fromCms, ...fromLocal]));
}
