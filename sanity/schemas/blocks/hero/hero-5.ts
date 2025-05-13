import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
  name: "hero-5",
  title: "Hero 5",
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
      name: "heightVariant",
      type: "height-variant",
      title: "Height Variant",
      description: "Select a height variant",
    }),
    defineField({
      name: "textAlign",
      type: "text-align",
      title: "Text Align",
      description: "Select a text align variant",
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
      name: "renderedTitle",
      type: "block-content",
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
    defineField({
      name: "decoration",
      type: "string",
      title: "Background Decoration",
      description: "Choose a background decoration effect",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Background Beams 1", value: "background-beams-1" },
          { title: "Background Beams 2", value: "background-beams-2" },
        ],
      },
      initialValue: "none",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero 5",
        subtitle: title,
      };
    },
  },
});
