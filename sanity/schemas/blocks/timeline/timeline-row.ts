import { defineType, defineField } from "sanity";
import { ArrowDownNarrowWide } from "lucide-react";

export default defineType({
  name: "timeline-row",
  type: "object",
  title: "Timeline Row",
  description: "Row of Timeline Sections",
  icon: ArrowDownNarrowWide,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "isAcronym",
      type: "boolean",
      title: "Acronym",
      description: "Highlight the first letter of each timeline title",
      initialValue: false,
    }),
    defineField({
      name: "timelines",
      type: "array",
      of: [{ type: "timelines-1" }],
    }),
  ],
  preview: {
    select: {
      subtitle: "timelines.0.title",
    },
    prepare({ subtitle }) {
      return {
        title: "Timelines Row",
        subtitle,
      };
    },
  },
});
