/**
 * Hand-written types matching the GROQ projections in
 * `src/lib/sanity/queries.ts` (kept in sync with `sanity/schemas/`).
 */

export interface SanityImage {
  _type?: "image";
  asset: { _ref?: string; _type?: string; url?: string };
  alt?: string;
  hotspot?: { x: number; y: number; _type?: string };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    _type?: string;
  };
}

/** Projected as `video{asset->{url, originalFilename}}`. */
export interface SanityVideo {
  asset: { url: string; originalFilename?: string };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NavCta {
  label: string;
  href: string;
}

export interface FormField {
  label: string;
  placeholder?: string;
  inputType?: "text" | "email" | "tel";
}

export interface FooterNavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface SocialLink {
  label: string;
  href?: string;
  icon?: string;
}

export interface FooterCredit {
  before?: string;
  highlighted?: string;
  after?: string;
  linkText?: string;
  linkUrl?: string;
}

export interface ServiceCard {
  image?: SanityImage;
  video?: SanityVideo;
  tint?: string;
}

export interface MilestoneItem {
  value: string;
  label?: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  logo?: SanityImage;
  navAvatar?: SanityImage;
  navItems?: NavItem[];
  navCta?: NavCta;
  contactHeading?: string;
  contactDescription?: string;
  contactBackground?: SanityImage;
  contactBackgroundVideo?: SanityVideo;
  contactFormLabel?: string;
  contactFormFields?: FormField[];
  contactSubmitLabel?: string;
  footerLogo?: SanityImage;
  footerEmail?: string;
  footerDescription?: string;
  footerCredit?: FooterCredit;
  footerNav?: FooterNavItem[];
  footerSocial?: SocialLink[];
  footerWordmark?: string;
  footerCopyright?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: SanityImage;
}

export interface TextImageSection {
  _type: "textImageBlock";
  _key?: string;
  text: string;
  image?: SanityImage;
  video?: SanityVideo;
  side?: "textLeft" | "textRight";
}

export interface FullWidthImageSection {
  _type: "fullWidthImageBlock";
  _key?: string;
  image?: SanityImage;
  video?: SanityVideo;
}

export type ProjectSection = TextImageSection | FullWidthImageSection;

export interface ProjectDoc {
  _id: string;
  _type: "project";
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  tint?: string;
  hero?: SanityImage;
  heroVideo?: SanityVideo;
  sections?: ProjectSection[];
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: SanityImage;
}

export interface JournalPostDoc {
  _id: string;
  _type: "journalPost";
  title: string;
  slug: { current: string };
  category?: string;
  date?: string;
  image?: SanityImage;
  description?: string;
  featured?: boolean;
}

export type ClientLogoPreset = "google" | "swiggy" | "sg" | "hzy" | "fnb";

export interface ClientDoc {
  _id: string;
  _type: "client";
  name: string;
  logoMode?: "preset" | "image";
  logoPreset?: ClientLogoPreset;
  logoImage?: SanityImage;
  invert?: boolean;
  link?: string;
}

export interface HomePageDoc {
  _id: string;
  _type: "homePage";
  heroHeading?: string;
  heroTagline?: string;
  heroDescription?: string;
  heroLogo?: SanityImage;
  heroBackground?: SanityImage;
  heroBackgroundVideo?: SanityVideo;
  projectsHeading?: string;
  projectCards?: ProjectDoc[];
  aboutParagraph?: string;
  aboutImage?: SanityImage;
  clientsHeading?: string;
  clientsDescription?: string;
  clientCards?: ClientDoc[];
  servicesTitle?: string;
  servicesPill?: string;
  servicesDescription?: string;
  servicesCards?: ServiceCard[];
  milestonesHeading?: string;
  milestones?: MilestoneItem[];
  journalHeading?: string;
  journalDescription?: string;
  journalPosts?: JournalPostDoc[];
}
