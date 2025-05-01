import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
  name: "hero-4",
  title: "Hero 4",
  type: "object",
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    
    defineField({
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
        defineField({
          type: "text",
          name: "imagePrompt",
          title: "Image prompt",
          rows: 2,
        }),
      ],
      options: {
        aiAssist: {
          imageInstructionField: "imagePrompt",
        },
      },
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "tag" }],
    }),
    defineField({
      name: "useGlobalTagStyle",
      type: "boolean",
      title: "Apply same style to all tags?",
      initialValue: false,
    }),
    defineField({
      name: "globalTagVariant",
      type: "button-variant",
      title: "Global Tag Variant",
      hidden: ({ parent }) => !parent?.useGlobalTagStyle,
    }),
    defineField({
      name: "globalTagSizeVariant",
      type: "size-variant",
      title: "Global Tag Size Variant",
      hidden: ({ parent }) => !parent?.useGlobalTagStyle,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero 4",
        subtitle: title,
      };
    },
  },
});
