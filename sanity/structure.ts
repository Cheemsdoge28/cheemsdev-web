import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Files,
  User,
  ListCollapse,
  Quote,
  PartyPopper,
  Text,
} from "lucide-react";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: Files,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "footerContent",
        title: "Footer Content",
        icon: Text,
        S,
        context,
      }),
      S.divider(),
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Post")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]) // Default ordering
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "announcement",
        title: "Announcement Bar",
        icon: PartyPopper,
        S,
        context,
      }),
      S.divider(),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Authors",
        icon: User,
        S,
        context,
      }),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "faq",
        title: "FAQs",
        icon: ListCollapse,
        S,
        context,
      }),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",        icon: Quote,
        S,
        context,
      }),
    ]);
