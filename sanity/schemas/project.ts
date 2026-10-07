import { defineField, defineType } from "sanity";

/**
 * FIXED project detail structure — the layout is controlled by React:
 *   HERO (full-width banner + title/category/description overlay)
 *   → repeating media sections below the hero: grid (≤4) → full → grid …
 * The client only chooses the media and its order; the first entry of
 * `media` follows the hero in the first grid row.
 */
export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "HERO — top full-width banner",
      options: { columns: 1 },
    },
    {
      name: "media",
      title: "MEDIA BELOW HERO — ordered (grid ≤4 → full → grid …)",
      options: { columns: 1 },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Large heading shown on the hero, e.g. BRANDS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      description: "Web address: /projects/your-slug",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Small uppercase line under the title, e.g. campaigns, content, advertising",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoryRef",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Category that this project belongs to.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      description: "Paragraph on the right side of the hero (desktop only).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tint",
      title: "Card Background Color",
      type: "string",
      description:
        "Fallback color behind the artwork on the home page card, e.g. #4d140b",
      validation: (rule) =>
        rule.regex(/^#[0-9a-fA-F]{6}$/, {
          name: "hex color",
          invert: false,
        }),
    }),
    defineField({
      name: "hero",
      title: "Hero Image",
      type: "image",
      fieldset: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      description:
        "Full-width artwork at the top of the project page and on the home page card. Leave empty for video-only projects (set the Hero Video instead).",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video (optional)",
      type: "file",
      fieldset: "hero",
      options: { accept: "video/*" },
      description:
        "Plays in the hero and on the home page card when set. The image stays as the poster/fallback.",
    }),
    defineField({
      name: "media",
      title: "Media below the hero",
      type: "array",
      fieldset: "media",
      of: [{ type: "projectMedia" }],
      description:
        "Every media item below the hero, in display order. The layout alternates automatically: first 4 items form a 2×2 grid, the next one is a full-width banner, then 4 again, and so on. The listing card automatically uses the first image and first video found in this list (plus the hero).",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Browser tab title. Defaults to the project title.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Search description. Defaults to the project description.",
    }),
    defineField({
      name: "seoOgImage",
      title: "SEO Share Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Image shown when the project is shared on social media. Defaults to the hero.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "hero" },
  },
});
