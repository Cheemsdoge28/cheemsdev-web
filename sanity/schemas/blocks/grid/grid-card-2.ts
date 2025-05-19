import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";
import { bentoVariant } from "../shared/bento-variant";

export default defineType({
  name: "grid-card-2",
  type: "object",
  icon: LayoutGrid,
  title: "Image Card",
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
      description: "Image with alt text format 'Category: Title' for automatic extraction",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Format as 'Category: Title' for automatic extraction",
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
      name: "bentoVariant",
      type: "bento-variant",
      title: "Bento Variant",
      description: "Choose how many columns this card should span in a bento grid.",
      initialValue: "none",
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