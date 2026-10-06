import { defineField, defineType } from "sanity";

/**
 * FIXED project detail structure — the layout is controlled by React:
 *   HERO (full-width banner + title/category/description overlay)
 *   → 4 media cards (2×2 grid)
 *   → CLOSING full-width banner
 * The client only chooses the media inside each slot.
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
      name: "cards",
      title: "4 MEDIA CARDS — fixed 2×2 layout",
      options: { columns: 2 },
    },
    {
      name: "closing",
      title: "CLOSING BANNER — bottom full-width",
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
        "Full-width artwork at the top of the project page and on the home page card.",
      validation: (rule) => rule.required(),
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
      name: "card1",
      title: "Card 1 — top left",
      type: "projectMedia",
      fieldset: "cards",
      description: "Media card in the top-left slot of the 2×2 grid.",
    }),
    defineField({
      name: "card2",
      title: "Card 2 — top right",
      type: "projectMedia",
      fieldset: "cards",
      description: "Media card in the top-right slot of the 2×2 grid.",
    }),
    defineField({
      name: "card3",
      title: "Card 3 — bottom left",
      type: "projectMedia",
      fieldset: "cards",
      description: "Media card in the bottom-left slot of the 2×2 grid.",
    }),
    defineField({
      name: "card4",
      title: "Card 4 — bottom right",
      type: "projectMedia",
      fieldset: "cards",
      description: "Media card in the bottom-right slot of the 2×2 grid.",
    }),
    defineField({
      name: "closingBanner",
      title: "Closing Banner",
      type: "projectMedia",
      fieldset: "closing",
      description:
        "Full-width media banner between the cards and the contact section.",
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
