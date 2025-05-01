import { FileInput, PartyPopper } from "lucide-react";
import { defineType, defineField } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "announcement",
  type: "document",
  title: "Announcements",
  icon: FileInput,
  fields: [
    defineField({
      name: "body",
      type: "block-content",
      title: "Announcement Text",
    }),
    defineField({
      name: "CTA",
      type: "link",
      title: "Call To Action",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Active",
    }),
    orderRankField({ type: "announcement" }),
  ],
  preview: {
    select: {
      title: "body",
    },
  },
});
