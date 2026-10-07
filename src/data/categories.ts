import { getProject } from "./projects";

/**
 * Local (no-CMS) fallback for the category / listing pages —
 * /project/[category].
 *
 * Content is derived from the existing project copy in `projects.ts`
 * (nothing is invented): title, subtitle, description, and hero artwork
 * come from the representative project of each category.
 */
export interface Category {
  /** Stable route segment: /project/[slug] */
  slug: string;
  /** Hero + card headline (pixel font) */
  title: string;
  /** Hero eyebrow under the title / small line above the card title */
  subtitle: string;
  /** Hero right-hand paragraph */
  description: string;
  /** Fallback color behind the card artwork */
  tint: string;
  /** Full-bleed hero artwork (also used as the card artwork) */
  hero: { src: string; alt: string };
  /** Sort position in the 2×2 category grid */
  order: number;
  /** Disabled categories are hidden from routing and the grid */
  active: boolean;
  /** Slugs of the projects that belong to this category */
  projects: string[];
}

/** Card tints — mirrors the fallback values used for the home page cards. */
const TINTS: Record<string, string> = {
  brands: "#4d140b",
  music: "#0b3a31",
  people: "#3a2a10",
  corporate: "#1f2328",
  corporte: "#1f2328",
  built: "#1f2328",
  motion: "#1f2328",
};

/** One entry per home card, in home order: the six listing pages. */
const ORDER = [
  "brands",
  "music",
  "people",
  "corporate",
  "built",
  "motion",
] as const;

export const categories: Category[] = ORDER.flatMap((slug, index) => {
  const project = getProject(slug);
  if (!project) return [];

  return [
    {
      slug,
      title: project.title,
      subtitle: project.category,
      description: project.description,
      tint: TINTS[slug] ?? "transparent",
      hero: project.hero,
      order: index + 1,
      active: true,
      projects: [project.slug],
    },
  ];
});

export function getCategory(slug: string): Category | undefined {
  const normalized = slug === "corporte" ? "corporate" : slug;
  return categories.find(
    (category) => category.slug === normalized || category.slug === slug,
  );
}
