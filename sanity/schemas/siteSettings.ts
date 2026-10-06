import { defineField, defineType } from "sanity";

const brandFieldset = {
  name: "brand",
  title: "Brand",
  options: { collapsible: true },
};
const navFieldset = {
  name: "navigation",
  title: "Navigation Bar",
  options: { collapsible: true },
};
const contactFieldset = {
  name: "contact",
  title: "Contact Section",
  options: { collapsible: true },
};
const footerFieldset = {
  name: "footer",
  title: "Footer",
  options: { collapsible: true },
};
const seoFieldset = {
  name: "seo",
  title: "SEO",
  options: { collapsible: true },
};

export default defineType({
  name: "siteSettings",
  title: "Website Settings",
  type: "document",
  fieldsets: [
    brandFieldset,
    navFieldset,
    contactFieldset,
    footerFieldset,
    seoFieldset,
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: { hotspot: true },
      fieldset: "brand",
      description: "Logo shown in the hero and the footer.",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "navAvatar",
      title: "Menu Avatar",
      type: "image",
      options: { hotspot: true },
      fieldset: "brand",
      description: "Small squircle image at the left of the floating menu.",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "navItems",
      title: "Menu Links",
      type: "array",
      fieldset: "navigation",
      of: [{ type: "navItem" }],
      description: "Links shown in the floating menu. Drag to reorder.",
    }),
    defineField({
      name: "navCta",
      title: "Menu Button",
      type: "navCta",
      fieldset: "navigation",
      description: "The white button on the right of the floating menu.",
    }),
    defineField({
      name: "contactHeading",
      title: "Heading",
      type: "string",
      fieldset: "contact",
      description: "e.g. GET IN TOUCH",
    }),
    defineField({
      name: "contactDescription",
      title: "Description",
      type: "text",
      rows: 4,
      fieldset: "contact",
    }),
    defineField({
      name: "contactBackground",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "contact",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "contactBackgroundVideo",
      title: "Background Video (optional)",
      type: "file",
      options: { accept: "video/*" },
      fieldset: "contact",
      description:
        "Plays behind the section when set. The image stays as the poster/fallback.",
    }),
    defineField({
      name: "contactFormLabel",
      title: "Form Label",
      type: "string",
      fieldset: "contact",
      description: "e.g. CONTACT US.25",
    }),
    defineField({
      name: "contactFormFields",
      title: "Form Fields",
      type: "array",
      fieldset: "contact",
      of: [{ type: "formField" }],
      description:
        "Labels and placeholders of the contact form. Drag to reorder.",
    }),
    defineField({
      name: "contactSubmitLabel",
      title: "Submit Button Label",
      type: "string",
      fieldset: "contact",
      description: "e.g. SUBMIT",
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      options: { hotspot: true },
      fieldset: "footer",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      description: "Defaults to the site logo when empty.",
    }),
    defineField({
      name: "footerEmail",
      title: "Email",
      type: "string",
      fieldset: "footer",
      description: "e.g. hi@n4mes.com",
    }),
    defineField({
      name: "footerDescription",
      title: "Description",
      type: "text",
      rows: 4,
      fieldset: "footer",
    }),
    defineField({
      name: "footerCredit",
      title: "Credit Line",
      type: "footerCredit",
      fieldset: "footer",
      description: "The small line under the footer description.",
    }),
    defineField({
      name: "footerNav",
      title: "Footer Links",
      type: "array",
      fieldset: "footer",
      of: [{ type: "footerNavItem" }],
      description: "Middle column links. Drag to reorder.",
    }),
    defineField({
      name: "footerSocial",
      title: "Social Links",
      type: "array",
      fieldset: "footer",
      of: [{ type: "socialLink" }],
      description: "Right column links. Drag to reorder.",
    }),
    defineField({
      name: "footerWordmark",
      title: "Wordmark",
      type: "string",
      fieldset: "footer",
      description: "Large italic name at the bottom of the footer, e.g. N4MES",
    }),
    defineField({
      name: "footerCopyright",
      title: "Copyright",
      type: "string",
      fieldset: "footer",
      description: "e.g. ©2025 N4MES. All rights reserved.",
    }),
    defineField({
      name: "seoTitle",
      title: "Page Title",
      type: "string",
      fieldset: "seo",
      description: "Browser tab title for the home page.",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      fieldset: "seo",
      description: "Search engine and social description.",
    }),
    defineField({
      name: "seoOgImage",
      title: "Social Share Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "seo",
      description: "Image shown when the site is shared on social media.",
    }),
  ],
  preview: {
    select: { media: "logo" },
    prepare() {
      return { title: "Website Settings" };
    },
  },
});
