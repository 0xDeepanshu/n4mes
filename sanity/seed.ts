/**
 * Seeds the N4MES Sanity dataset with the exact content currently
 * hardcoded in the website (no copy is rewritten or invented).
 *
 * Usage:  npm run sanity:seed
 * Needs:  NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { projects } from "../src/data/projects";
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

interface ImageStub {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  alt?: string;
}

function uploadImage(path: string, alt?: string): Promise<ImageStub> {
  return uploader.imageStub(path, alt);
}

async function upsert(
  doc: { _id: string; _type: string } & Record<string, unknown>,
) {
  const { _id, _type, ...rest } = doc;
  await client.createOrReplace({ _id, _type, ...rest });
  console.log(`  upserted ${_id}`);
}

function ref(_ref: string) {
  return { _type: "reference", _ref };
}

const PROJECT_TINTS: Record<string, string> = {
  brands: "#4d140b",
  music: "#0b3a31",
  people: "#3a2a10",
  corporate: "#1f2328",
  corporte: "#1f2328",
  built: "#1f2328",
  motion: "#1f2328",
};

async function seedProjects() {
  for (const project of projects) {
    // Detail layout below the hero (React-controlled): ordered media[]
    // alternates grid(≤4) → full → grid … . Existing content mapped
    // without inventing: 3 row images + 2 features → first 4 items form
    // the 2×2 grid, the 5th becomes the full-width closing banner —
    // the exact layout the old card1..card4 + closingBanner produced.
    const slots = [...project.rowImages, ...project.features];

    const media: Record<string, unknown>[] = [];
    for (const [index, item] of slots.entries()) {
      media.push({
        _key: `m-${index}`,
        _type: "projectMedia",
        image: await uploadImage(item.src.replace(/^\//, ""), item.alt),
      });
    }

    await upsert({
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      category: project.category,
      description: project.description,
      tint: PROJECT_TINTS[project.slug],
      hero: await uploadImage(
        project.hero.src.replace(/^\//, ""),
        project.hero.alt,
      ),
      media,
    });
  }
}

/**
 * Category / listing pages — /project/[category] (one per home card).
 * Content is copied from the same-slug project document (nothing is
 * invented): title, subtitle, description, and hero media; the ordered
 * `projects` reference points at that same project.
 * Stable ids `category-<slug>` + createOrReplace => re-running never
 * duplicates documents and never touches project documents.
 */
const CATEGORY_SLUGS = [
  "brands",
  "music",
  "people",
  "corporate",
  "built",
  "motion",
];

async function seedCategories() {
  for (const [index, slug] of CATEGORY_SLUGS.entries()) {
    const project = await client.fetch<{
      _id: string;
      title: string;
      category: string;
      description: string;
      tint?: string;
      hero?: Record<string, unknown>;
      heroVideo?: Record<string, unknown>;
    } | null>(
      `*[_type == "project" && slug.current == $slug][0]{
        _id, title, category, description, tint, hero, heroVideo
      }`,
      { slug },
    );

    if (!project?.hero) {
      console.warn(`  skipped category-${slug}: project/hero not found`);
      continue;
    }

    // Never clobber an ordered project list that already exists (the
    // migration links real per-folder projects here); only fall back to
    // the legacy self reference on first seed.
    const existing = await client.fetch<{
      projects: { _ref: string }[];
    } | null>(
      `*[_type == "category" && slug.current == $slug][0]{ "projects": projects[]{_ref} }`,
      { slug },
    );
    const projectsRefs = existing?.projects?.length
      ? existing.projects.map((entry, index) => ({
          _key: `category-project-${slug}-${index}`,
          _type: "reference" as const,
          _ref: entry._ref,
        }))
      : [
          {
            _key: `category-project-${slug}`,
            _type: "reference" as const,
            _ref: project._id,
          },
        ];

    await upsert({
      _id: `category-${slug}`,
      _type: "category",
      title: project.title,
      slug: { _type: "slug", current: slug },
      subtitle: project.category,
      description: project.description,
      tint: project.tint,
      order: index + 1,
      active: true,
      hero: project.hero,
      heroVideo: project.heroVideo,
      cardMedia: {
        _type: "projectMedia",
        image: project.hero,
        video: project.heroVideo,
      },
      projects: projectsRefs,
    });
  }
}

async function seedJournal() {
  const posts = [
    {
      id: "journal-ai-transforming-design",
      title: "How AI Is Transforming Design in 2025",
      slug: "how-ai-is-transforming-design-in-2025",
      category: "AI DESIGN",
      image: "project-1.jpg",
      alt: "AI Transforming Design",
    },
    {
      id: "journal-right-palette",
      title: "How to Choose the Right Palette for Your Brand",
      slug: "how-to-choose-the-right-palette-for-your-brand",
      category: "VISUAL DESIGN",
      image: "project-2.jpg",
      alt: "Choosing the Right Palette",
    },
    {
      id: "journal-web-design-trends",
      title: "10 Web Design Trends That Will Dominate This Year",
      slug: "10-web-design-trends-that-will-dominate-this-year",
      category: "TRENDS",
      image: "project-3.jpg",
      alt: "Web Design Trends",
    },
  ];

  for (const post of posts) {
    await upsert({
      _id: post.id,
      _type: "journalPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      category: post.category,
      image: await uploadImage(post.image, post.alt),
      featured: false,
    });
  }
}

async function seedClients() {
  interface SeedClient {
    id: string;
    name: string;
    logoMode: "preset" | "image";
    logoPreset?: string;
    image?: string;
    alt?: string;
    invert?: boolean;
  }

  const clients: SeedClient[] = [
    {
      id: "client-google",
      name: "Google",
      logoMode: "preset",
      logoPreset: "google",
    },
    {
      id: "client-n4mes",
      name: "N4MES",
      logoMode: "image",
      invert: true,
      image: "logo-transparent.png",
      alt: "N4MES Logo",
    },
    {
      id: "client-swiggy",
      name: "Swiggy",
      logoMode: "preset",
      logoPreset: "swiggy",
    },
    {
      id: "client-hzy",
      name: "HZY",
      logoMode: "preset",
      logoPreset: "hzy",
    },
    {
      id: "client-sg",
      name: "SG",
      logoMode: "preset",
      logoPreset: "sg",
    },
    {
      id: "client-jagermister",
      name: "JAGERMISTER",
      logoMode: "image",
      image: "jagermeister.svg",
      alt: "Jagermeister",
    },
    {
      id: "client-fnb",
      name: "F&B",
      logoMode: "preset",
      logoPreset: "fnb",
    },
  ];

  for (const entry of clients) {
    await upsert({
      _id: entry.id,
      _type: "client",
      name: entry.name,
      logoMode: entry.logoMode,
      ...(entry.logoPreset ? { logoPreset: entry.logoPreset } : {}),
      ...(entry.image
        ? { logoImage: await uploadImage(entry.image, entry.alt) }
        : {}),
      ...(entry.invert !== undefined ? { invert: entry.invert } : {}),
    });
  }
}

async function seedSiteSettings() {
  await upsert({
    _id: "siteSettings",
    _type: "siteSettings",
    logo: await uploadImage("logo-transparent.png", "N4MES Logo"),
    navAvatar: await uploadImage("nav-avatar.jpg", "Nav Avatar"),
    navItems: [
      { _key: "nav-1", _type: "navItem", label: "HOME", href: "#home" },
      { _key: "nav-2", _type: "navItem", label: "ABOUT", href: "#about" },
      { _key: "nav-3", _type: "navItem", label: "PROJECTS", href: "#projects" },
      { _key: "nav-4", _type: "navItem", label: "JOURNAL", href: "#journal" },
    ],
    navCta: { _type: "navCta", label: "CONTACT +", href: "#contact" },
    contactHeading: "GET IN TOUCH",
    contactDescription:
      "Have a project in mind? Whether you're launching a brand, designing a product, or elevating your digital presence, we're here to bring your vision to life.",
    contactBackground: await uploadImage(
      "contact-bg.jpg",
      "Contact background",
    ),
    contactFormLabel: "CONTACT US.25",
    contactFormFields: [
      {
        _key: "field-1",
        _type: "formField",
        label: "First name",
        placeholder: "Jane",
        inputType: "text",
      },
      {
        _key: "field-2",
        _type: "formField",
        label: "Last name",
        placeholder: "Smith",
        inputType: "text",
      },
      {
        _key: "field-3",
        _type: "formField",
        label: "Email",
        placeholder: "jane@framer.com",
        inputType: "email",
      },
      {
        _key: "field-4",
        _type: "formField",
        label: "Phone no.",
        placeholder: "(347) 000 0000",
        inputType: "tel",
      },
    ],
    contactSubmitLabel: "SUBMIT",
    footerEmail: "hi@n4mes.com",
    footerDescription:
      "At N4MES, we make it mean something. Turning bold ideas into experiences that captivate, inspire, and endure.",
    footerCredit: {
      _type: "footerCredit",
      before: "Made with ",
      highlighted: "Love",
      after: " by ",
      linkText: "FTC Studio",
      linkUrl: "",
    },
    footerNav: [
      {
        _key: "footer-1",
        _type: "footerNavItem",
        label: "Home",
        href: "#home",
      },
      {
        _key: "footer-2",
        _type: "footerNavItem",
        label: "About",
        href: "#about",
      },
      {
        _key: "footer-3",
        _type: "footerNavItem",
        label: "Projects",
        href: "#projects",
        badge: "06",
      },
      {
        _key: "footer-4",
        _type: "footerNavItem",
        label: "Journal",
        href: "#journal",
        badge: "04",
      },
      {
        _key: "footer-5",
        _type: "footerNavItem",
        label: "Contact us",
        href: "#contact",
      },
    ],
    footerSocial: [
      {
        _key: "social-1",
        _type: "socialLink",
        label: "Dribbble",
        href: "#",
        icon: "◉",
      },
      {
        _key: "social-2",
        _type: "socialLink",
        label: "Instagram",
        href: "#",
        icon: "◻",
      },
      {
        _key: "social-3",
        _type: "socialLink",
        label: "LinkedIn",
        href: "#",
        icon: "▣",
      },
      {
        _key: "social-4",
        _type: "socialLink",
        label: "YouTube",
        href: "#",
        icon: "▶",
      },
    ],
    footerWordmark: "N4MES",
    footerCopyright: "©2025 N4MES. All rights reserved.",
    seoTitle: "N4MES — MAKE IT MEAN SOMETHING.",
    seoDescription: "N4MES — MAKE IT MEAN SOMETHING.",
  });
}

async function seedHomePage() {
  await upsert({
    _id: "homePage",
    _type: "homePage",
    heroHeading: "N4MES",
    heroTagline: "MAKE IT MEAN SOMETHING.",
    heroDescription:
      "At N4MES, we make it mean something. Turning bold ideas into experiences that captivate, inspire, and endure.",
    heroLogo: await uploadImage("logo-transparent.png", "N4MES Logo"),
    heroBackground: await uploadImage("hero/herobg.png", "Hero background"),
    projectCards: projects.map((project) => ref(`project-${project.slug}`)),
    aboutParagraph:
      "At N4MES, we make it mean something. We believe design must carry purpose, turning bold ideas into experiences that captivate, engage, and endure.",
    aboutImage: await uploadImage("hero-portrait.jpg", "About N4MES"),
    clientsHeading: "CLIENTS",
    clientsDescription:
      "At N4MES, we collaborate with forward-thinking brands, startups, and leaders who dare to challenge the norm and make it mean something.",
    clientCards: [
      ref("client-google"),
      ref("client-n4mes"),
      ref("client-swiggy"),
      ref("client-hzy"),
      ref("client-sg"),
      ref("client-jagermister"),
      ref("client-fnb"),
    ],
    servicesTitle: "MUSIC",
    servicesPill: "04 UI/UX",
    servicesDescription:
      "we believe every experience should be built on substance and purpose. Our craft blends strategic intuition with timeless execution, making sure every project means something lasting.",
    servicesCards: [
      {
        _key: "service-card-1",
        _type: "serviceCard",
        image: await uploadImage("project-2.jpg", "UI/UX Design"),
        tint: "#0b3a31",
      },
      {
        _key: "service-card-2",
        _type: "serviceCard",
        image: await uploadImage("project-3.jpg", "Brand Identity"),
        tint: "#3a2a10",
      },
      {
        _key: "service-card-3",
        _type: "serviceCard",
        image: await uploadImage("project-4.jpg", "Art Direction"),
        tint: "#1f2328",
      },
    ],
    milestonesHeading: "PHILOSOPHY",
    milestones: [
      {
        _key: "milestone-1",
        _type: "milestoneItem",
        value: "IDEA FIRST",
        label: "Concept Drives Form",
      },
      {
        _key: "milestone-2",
        _type: "milestoneItem",
        value: "MEANING",
        label: "Make It Mean Something",
      },
    ],
    journalHeading: "JOURNAL",
    journalDescription:
      "Our journal is where design meets thought leadership. From industry trends to creative breakthroughs, we share insights that inspire, challenge, and push the boundaries of design.",
    journalPosts: [
      ref("journal-ai-transforming-design"),
      ref("journal-right-palette"),
      ref("journal-web-design-trends"),
    ],
  });
}

async function main() {
  console.log(`Seeding Sanity project ${projectId} / ${dataset}`);
  await seedProjects();
  await seedCategories();
  await seedJournal();
  await seedClients();
  await seedSiteSettings();
  await seedHomePage();
  await uploader.flush();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
