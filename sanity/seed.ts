/**
 * Seeds the N4MES Sanity dataset with the exact content currently
 * hardcoded in the website (no copy is rewritten or invented).
 *
 * Usage:  npm run sanity:seed
 * Needs:  NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN in .env.local
 */

import { createReadStream } from "node:fs";
import { basename, join, resolve } from "node:path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { projects } from "../src/data/projects";

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

const PUBLIC_DIR = resolve(process.cwd(), "public");

interface ImageStub {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  alt?: string;
}

const uploaded = new Map<string, Promise<ImageStub>>();

function uploadImage(path: string, alt?: string): Promise<ImageStub> {
  const cached = uploaded.get(path);
  if (cached) {
    return cached.then((stub) => (alt ? { ...stub, alt } : stub));
  }

  const promise = client.assets
    .upload("image", createReadStream(join(PUBLIC_DIR, path)), {
      filename: basename(path),
    })
    .then((asset) => {
      console.log(`  uploaded ${path}`);
      return {
        _type: "image" as const,
        asset: { _type: "reference" as const, _ref: asset._id },
      };
    });

  uploaded.set(path, promise);
  return promise.then((stub) => (alt ? { ...stub, alt } : stub));
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
  corporte: "#1f2328",
  built: "#1f2328",
  motion: "#1f2328",
};

async function seedProjects() {
  for (const project of projects) {
    const [row1Image, row2Image, row3Image] = project.rowImages;
    const [feature1, feature2] = project.features;

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
      sections: [
        {
          _type: "textImageBlock",
          _key: "section-1",
          text: project.textBlocks[0],
          image: await uploadImage(
            row1Image.src.replace(/^\//, ""),
            row1Image.alt,
          ),
          side: "textLeft",
        },
        {
          _type: "fullWidthImageBlock",
          _key: "section-2",
          image: await uploadImage(
            feature1.src.replace(/^\//, ""),
            feature1.alt,
          ),
        },
        {
          _type: "textImageBlock",
          _key: "section-3",
          text: project.textBlocks[1],
          image: await uploadImage(
            row2Image.src.replace(/^\//, ""),
            row2Image.alt,
          ),
          side: "textRight",
        },
        {
          _type: "fullWidthImageBlock",
          _key: "section-4",
          image: await uploadImage(
            feature2.src.replace(/^\//, ""),
            feature2.alt,
          ),
        },
        {
          _type: "textImageBlock",
          _key: "section-5",
          text: project.textBlocks[2],
          image: await uploadImage(
            row3Image.src.replace(/^\//, ""),
            row3Image.alt,
          ),
          side: "textLeft",
        },
      ],
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
  await seedJournal();
  await seedClients();
  await seedSiteSettings();
  await seedHomePage();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
