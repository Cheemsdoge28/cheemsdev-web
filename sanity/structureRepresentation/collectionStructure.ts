import defineStructure from "@/utils/defineStructure";
import { ListItemBuilder } from "sanity/structure";

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title("Collections")
    .schemaType("collection")
    .child(S.documentTypeList("collection"))
);
