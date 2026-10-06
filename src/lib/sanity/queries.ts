import { defineQuery } from "next-sanity";

const projectCardFields = `
  _id,
  title,
  slug,
  category,
  description,
  tint,
  hero,
  heroVideo{asset->{url, originalFilename}}
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

const sectionProjection = `
  sections[]{
    _key,
    _type == "textImageBlock" => {
      _type,
      text,
      image,
      video{asset->{url, originalFilename}},
      side
    },
    _type == "fullWidthImageBlock" => {
      _type,
      image,
      video{asset->{url, originalFilename}}
    }
  }
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
  ${sectionProjection}
}`);

export const projectBySlugQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
  ${projectCardFields},
  seoTitle,
  seoDescription,
  seoOgImage,
  ${sectionProjection}
}`,
);

export const allProjectSlugsQuery = defineQuery(
  `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`,
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
