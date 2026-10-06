import { defineField, defineType } from "sanity";

export const textImageBlock = defineType({
  name: "textImageBlock",
  title: "Text + Image Row",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
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
      name: "video",
      title: "Video (optional)",
      type: "file",
      options: { accept: "video/*" },
      description:
        "Plays in place of the image when set. The image stays as the poster/fallback.",
    }),
    defineField({
      name: "side",
      title: "Layout",
      type: "string",
      description: "Which side the text card sits on in this row.",
      options: {
        layout: "radio",
        list: [
          { title: "Text left, image right", value: "textLeft" },
          { title: "Image left, text right", value: "textRight" },
        ],
      },
      initialValue: "textLeft",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "text", media: "image", subtitle: "side" },
    prepare({ title, media, subtitle }) {
      return {
        title: title ? title.slice(0, 70) : "Text + Image Row",
        subtitle:
          subtitle === "textRight"
            ? "Image left, text right"
            : "Text left, image right",
        media,
      };
    },
  },
});

export const fullWidthImageBlock = defineType({
  name: "fullWidthImageBlock",
  title: "Full-Width Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video (optional)",
      type: "file",
      options: { accept: "video/*" },
      description:
        "Plays in place of the image when set. The image stays as the poster/fallback.",
    }),
  ],
  preview: {
    select: { media: "image", title: "image.alt" },
    prepare({ title, media }) {
      return { title: title || "Full-Width Image", media };
    },
  },
});
