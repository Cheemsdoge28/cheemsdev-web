import { defineField, defineType } from "sanity";
import { Text } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "footerContent",
  type: "document",
  title: "Footer Content",
  icon: Text,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      type: "array",
      group: "content",
      of: [
        { type: "hero-1" },
        { type: "hero-2" },
        { type: "hero-4" },
        { type: "hero-5" },
        { type: "section-header" },
        { type: "split-row" },
        { type: "grid-row" },
        { type: "tab-section" },
        { type: "carousel-1" },
        { type: "carousel-2" },
        { type: "timeline-row" },
        { type: "cta-1" },
        { type: "logo-cloud-1" },
        { type: "faqs" }, 
        { type: "form-newsletter" },
        { type: "form-contact"},
        { type: "all-posts" },
        { type: "textBlock" },
      ],
    }),
    orderRankField({ type: "footerContent" }),
  ],
});