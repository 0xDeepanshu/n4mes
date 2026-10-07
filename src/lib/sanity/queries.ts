import { defineQuery } from "next-sanity";

const projectCardFields = `
  _id,
  title,
  slug,
  category,
  description,
  tint,
  hero,
  heroVideo{asset->{url, originalFilename}},
  media[]{image, video{asset->{url, originalFilename}}}
`;

const clientFields = `
  _id,
  name,
  logoMode,
  logoPreset,
  logoImage,
  invert,
  link
`;

const journalPostFields = `
  _id,
  title,
  slug,
  category,
  date,
  image,
  description,
  featured
`;

/** Fixed media slot projection: image (with alt) + optional video. */
const mediaSlotProjection = `
  image,
  video{asset->{url, originalFilename}}
`;

/**
 * Project detail media below the hero — layout is React-controlled:
 * ordered `media[]` items alternate grid(≤4) → full → grid(≤4) … .
 * The listing card media is derived at read time from hero + media[].
 */
const projectMediaProjection = `
  media[]{${mediaSlotProjection}}
`;

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  _id,
  logo,
  navAvatar,
  navItems[]{ label, href },
  navCta{ label, href },
  contactHeading,
  contactDescription,
  contactBackground,
  contactBackgroundVideo{asset->{url, originalFilename}},
  contactFormLabel,
  contactFormFields[]{ label, placeholder, inputType },
  contactSubmitLabel,
  footerLogo,
  footerEmail,
  footerDescription,
  footerCredit{ before, highlighted, after, linkText, linkUrl },
  footerNav[]{ label, href, badge },
  footerSocial[]{ label, href, icon },
  footerWordmark,
  footerCopyright,
  seoTitle,
  seoDescription,
  seoOgImage
}`);

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  _id,
  heroHeading,
  heroTagline,
  heroDescription,
  heroLogo,
  heroBackground,
  heroBackgroundVideo{asset->{url, originalFilename}},
  projectsHeading,
  projectCards[]->{
    ${projectCardFields}
  },
  aboutParagraph,
  aboutImage,
  clientsHeading,
  clientsDescription,
  clientCards[]->{
    ${clientFields}
  },
  servicesTitle,
  servicesPill,
  servicesDescription,
  servicesCards[]{
    image,
    video{asset->{url, originalFilename}},
    tint
  },
  milestonesHeading,
  milestones[]{ value, label },
  journalHeading,
  journalDescription,
  journalPosts[]->{
    ${journalPostFields}
  }
}`);

export const allProjectsQuery =
  defineQuery(`*[_type == "project"] | order(title asc){
  ${projectCardFields},
  seoTitle,
  seoDescription,
  seoOgImage,
  ${projectMediaProjection}
}`);

export const projectBySlugQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug && !defined(categoryRef)][0]{
  ${projectCardFields},
  seoTitle,
  seoDescription,
  seoOgImage,
  ${projectMediaProjection}
}`,
);

/**
 * Scoped detail lookup for /project/[category]/[slug]:
 * prefers the project explicitly linked to the requested category
 * (`categoryRef`), then falls back to unscoped legacy projects
 * (self-projects like /project/brands/brands).
 */
export const projectByCategoryAndSlugQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug && (
    categoryRef->slug.current == $category || !defined(categoryRef)
  )] | order(defined(categoryRef) desc)[0]{
  ${projectCardFields},
  seoTitle,
  seoDescription,
  seoOgImage,
  "categoryTint": categoryRef->tint,
  ${projectMediaProjection}
}`,
);

export const allProjectSlugsQuery = defineQuery(
  `*[_type == "project" && defined(slug.current) && !defined(categoryRef)]{ "slug": slug.current }`,
);

/** Unscoped legacy project slugs (self-projects, no category link). */
export const legacyProjectSlugsQuery = defineQuery(
  `*[_type == "project" && defined(slug.current) && !defined(categoryRef)]{ "slug": slug.current }`,
);

/** Category / listing page fields — /project/[category]. */
const categoryFields = `
  _id,
  title,
  slug,
  subtitle,
  description,
  tint,
  hero,
  heroVideo{asset->{url, originalFilename}},
  cardMedia{${mediaSlotProjection}},
  order,
  active,
  "projects": projects[]->{${projectCardFields}}
`;

export const allCategoriesQuery = defineQuery(
  `*[_type == "category" && active != false] | order(coalesce(order, 999) asc, title asc){
  ${categoryFields}
}`,
);

export const categoryBySlugQuery = defineQuery(
  `*[_type == "category" && slug.current == $slug && active != false][0]{
  ${categoryFields}
}`,
);

export const allCategorySlugsQuery = defineQuery(
  `*[_type == "category" && active != false && defined(slug.current)]{ "slug": slug.current }`,
);

export const allJournalPostsQuery = defineQuery(
  `*[_type == "journalPost"] | order(date desc){
  ${journalPostFields}
}`,
);

export const allClientsQuery = defineQuery(
  `*[_type == "client"] | order(name asc){
  ${clientFields}
}`,
);
