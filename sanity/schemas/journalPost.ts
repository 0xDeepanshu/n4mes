import { defineField, defineType } from "sanity";

export default defineType({
  name: "journalPost",
  title: "Journal Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      description: "Web address of the entry.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. AI DESIGN",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "DD MMM YYYY" },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      description: "Body copy for the entry.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Mark important entries as featured.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      date: "date",
    },
    prepare({ title, subtitle, media, date }) {
      return {
        title,
        subtitle: [subtitle, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
