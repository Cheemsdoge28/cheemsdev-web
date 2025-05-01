import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  type: "object",
  title: "Tag",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "href",
      title: "href",
      type: "string",
    }),
    defineField({
      name: "target",
      type: "boolean",
      title: "Open in new tab",
    }),
    defineField({
      name: "buttonVariant",
      type: "button-variant",
      title: "Button Variant",
    }),
    defineField({
      name: "sizeVariant",
      type: "size-variant",
      title: "Size Variant",
    }),
  ],
});
