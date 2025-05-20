import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: "grid-card-2",
  type: "object",
  icon: LayoutGrid,
  title: "Bento Card",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Optional override for title (can be extracted from image alt)",
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description: "Short summary or description for this card.",
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Image with alt text format",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Image description for screen readers and SEO.",
        },
      ],
    }),
    defineField({
      name: "link",
      type: "object",
      fields: [
        { name: "href", type: "string", title: "URL" },
        { name: "target", type: "boolean", title: "Open in new tab", initialValue: false }
      ],
    }),
    defineField({
      name: "colorVariant",
      title: "Color Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "background" },
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Card", value: "card" },
          { title: "Accent", value: "accent" },
        ],
      },
      initialValue: "background",
    }),
    defineField({
      name: "sizeVariant",
      title: "Size Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Small (Tech Stack)", value: "small" },
        ],
      },
      initialValue: "default",
      description: "Choose 'small' for tech stack style (small image left, text right)",
    }),
    defineField({
      name: "bentoColSpan",
      type: "number",
      title: "Bento Column Span",
      description: "How many columns should this card span? (1-4)",
      options: { list: [1, 2, 3, 4] },
      initialValue: 1,
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: "bentoRowSpan",
      type: "number",
      title: "Bento Row Span",
      description: "How many rows should this card span? (1-4)",
      options: { list: [1, 2, 3, 4] },
      initialValue: 1,
      validation: (Rule) => Rule.min(1).max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: "Image Card",
        subtitle: [title, subtitle].filter(Boolean).join(": ") || "No title",
        media,
      };
    },
  },
});