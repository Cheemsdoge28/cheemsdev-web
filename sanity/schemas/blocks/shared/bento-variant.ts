import { defineType } from "sanity";

export const BENTO_COL_SPANS = [
  { title: "1 Column", value: 1 },
  { title: "2 Columns", value: 2 },
  { title: "3 Columns", value: 3 },
  { title: "4 Columns", value: 4 }
];

export const BENTO_ROW_SPANS = [
  { title: "1 Row", value: 1 },
  { title: "2 Rows", value: 2 },
  { title: "3 Rows", value: 3 },
  { title: "4 Rows", value: 4 }
];

export const bentoColSpan = defineType({
  name: "bento-col-span",
  title: "Bento Column Span",
  type: "number",
  options: {
    list: BENTO_COL_SPANS,
    layout: "radio"
  },
  initialValue: 1
});

export const bentoRowSpan = defineType({
  name: "bento-row-span",
  title: "Bento Row Span",
  type: "number",
  options: {
    list: BENTO_ROW_SPANS,
    layout: "radio"
  },
  initialValue: 1
});
