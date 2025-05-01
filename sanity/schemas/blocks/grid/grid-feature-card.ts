import { defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "grid-feature-card",
  type: "object",
  icon: Sparkles,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      type: "string",
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
      name: "description",
      type: "text",
    }),
    defineField({
      name: "link",
      type: "link",
    }),
    defineField({
      name: "highlight",
      type: "boolean",
      title: "Highlight Card",
      description: "Apply a highlight style or animation.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
      badge: "badge",
    },
    prepare({ title, subtitle, media, badge }) {
      return {
        title: badge ? `[${badge}] ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
