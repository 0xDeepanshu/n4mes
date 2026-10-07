import { defineField, defineType } from "sanity";

/**
 * CATEGORY / LISTING page — /project/[category] (one doc per home card).
 * Layout is fixed and React-controlled:
 *   HERO (full-width banner + title/subtitle/description overlay)
 *   → 2×2 grid of this category's PROJECT cards (each card links to
 *     /project/[category]/[project] → existing ProjectDetailPage)
 * Sanity only provides the content + which media fills each slot.
 */
export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "HERO — top full-width banner",
      options: { columns: 1 },
    },
    {
      name: "card",
      title: "CATEGORY CARD — 2×2 grid artwork",
      options: { columns: 1 },
    },
  ],
  initialValue: { active: true },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Large heading shown on the hero and the card, e.g. BRANDS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      description: "Web address: /project/your-slug",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description:
        "Small uppercase line under the hero title and above the card title, e.g. campaigns, content, advertising",
      validation: (rule) => rule.required(),
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
      description: "Fallback color behind the card artwork, e.g. #4d140b",
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
      description: "Full-width artwork at the top of the category page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video (optional)",
      type: "file",
      fieldset: "hero",
      options: { accept: "video/*" },
      description:
        "Plays in the hero when set. The image stays as the poster/fallback.",
    }),
    defineField({
      name: "cardMedia",
      title: "Card Image / Video",
      type: "projectMedia",
      fieldset: "card",
      description:
        "Artwork for this category when the category itself is shown as a card (e.g. in a category grid). The listing grid shows this category's project cards.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Sort position in the category grid (1, 2, 3, …).",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Uncheck to hide the category page and its card.",
      initialValue: true,
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      description:
        "Projects that belong to this category (ordered references).",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "hero" },
  },
});
