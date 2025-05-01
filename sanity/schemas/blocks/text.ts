import { TextQuote } from "lucide-react";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "textBlock",
  type: "object",
  title: "Text Block",
  icon: TextQuote,
  fields: [
    defineField({
      name: "body",
      type: "block-content",
    }),
  ],
  preview: {
    select: {
      title: "body",
    },
  },
});
