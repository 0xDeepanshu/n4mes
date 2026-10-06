import { defineField, defineType } from "sanity";

export default defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logoMode",
      title: "Logo Style",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Preset logo", value: "preset" },
          { title: "Uploaded image", value: "image" },
        ],
      },
      initialValue: "image",
      description: "Use one of the built-in logos, or upload your own image.",
    }),
    defineField({
      name: "logoPreset",
      title: "Preset Logo",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Google", value: "google" },
          { title: "Swiggy", value: "swiggy" },
          { title: "SG Cricket", value: "sg" },
          { title: "HZY Clothing", value: "hzy" },
          { title: "F & B Hospitality", value: "fnb" },
        ],
      },
      description: "Shown when Logo Style is “Preset logo”.",
      hidden: ({ parent }) => parent?.logoMode !== "preset",
    }),
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      description: "Shown when Logo Style is “Uploaded image”.",
      hidden: ({ parent }) => parent?.logoMode !== "image",
    }),
    defineField({
      name: "invert",
      title: "Invert Logo Colors",
      type: "boolean",
      initialValue: false,
      description:
        "Turn on for dark logos that need to appear light on the dark card.",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
      description: "Optional URL to the client's website.",
    }),
  ],
  preview: {
    select: { title: "name", media: "logoImage", subtitle: "logoMode" },
    prepare({ title, media, subtitle }) {
      return {
        title,
        subtitle: subtitle === "preset" ? "Preset logo" : undefined,
        media,
      };
    },
  },
});
