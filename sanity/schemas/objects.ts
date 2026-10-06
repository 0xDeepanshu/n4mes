import { defineField, defineType } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Menu Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Anchor or page link, e.g. #home or /#contact",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

export const navCta = defineType({
  name: "navCta",
  title: "Menu Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "e.g. #contact",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

export const formField = defineType({
  name: "formField",
  title: "Form Field",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Shown above the field, e.g. First name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
      description: "Hint shown inside the empty field, e.g. Jane",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "placeholder" },
  },
});

export const footerNavItem = defineType({
  name: "footerNavItem",
  title: "Footer Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "e.g. #home or /#projects",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Number Badge",
      type: "string",
      description:
        "Small superscript number shown next to the label, e.g. 06. Leave empty for none.",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g. Instagram",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Profile URL. Leave as # if not set up yet.",
    }),
    defineField({
      name: "icon",
      title: "Icon Character",
      type: "string",
      description: "Single symbol shown before the label, e.g. ▶",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

export const footerCredit = defineType({
  name: "footerCredit",
  title: "Credit Line",
  type: "object",
  fields: [
    defineField({
      name: "before",
      title: "Text Before Highlight",
      type: "string",
      description: "e.g. Made with ",
    }),
    defineField({
      name: "highlighted",
      title: "Highlighted Word",
      type: "string",
      description: "e.g. Love",
    }),
    defineField({
      name: "after",
      title: "Text After Highlight",
      type: "string",
      description: "e.g.  by ",
    }),
    defineField({
      name: "linkText",
      title: "Link Text",
      type: "string",
      description: "e.g. FTC Studio",
    }),
    defineField({
      name: "linkUrl",
      title: "Link URL",
      type: "string",
      description: "Leave empty to show plain text without a link.",
    }),
  ],
  preview: {
    select: { title: "before", subtitle: "linkText" },
  },
});

export const serviceCard = defineType({
  name: "serviceCard",
  title: "Service Card",
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
    defineField({
      name: "tint",
      title: "Background Color",
      type: "string",
      description: "Fallback color behind the artwork, e.g. #0b3a31",
      validation: (rule) =>
        rule.regex(/^#[0-9a-fA-F]{6}$/, {
          name: "hex color",
          invert: false,
        }),
    }),
  ],
  preview: {
    select: { title: "image.alt", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Service card", media };
    },
  },
});

export const milestoneItem = defineType({
  name: "milestoneItem",
  title: "Milestone",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value / Heading",
      type: "string",
      description: "Large headline, e.g. IDEA FIRST",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Small italic line below, e.g. Concept Drives Form",
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
