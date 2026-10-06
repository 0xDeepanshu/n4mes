import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
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
      options: { accept: "video/*" },
      description:
        "Plays in the hero and on the home page card when set. The image stays as the poster/fallback.",
    }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      description:
        "Body of the project page. Drag to reorder, add Text + Image rows or Full-Width Images.",
      of: [{ type: "textImageBlock" }, { type: "fullWidthImageBlock" }],
      validation: (rule) =>
        rule.min(1).error("A project needs at least one section."),
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
