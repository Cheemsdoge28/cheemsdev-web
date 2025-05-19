import { defineType } from "sanity";

export const BENTO_VARIANTS = [
    { title: "None", value: "none" },
    { title: "Bento 1 (1/3)", value: "bento-1" },
    { title: "Bento 2 (2/3)", value: "bento-2" },
    { title: "Bento 3 (full)", value: "bento-3" },
];

export const bentoVariant = defineType({
    name: "bento-variant",
    title: "Bento Variant",
    type: "string",
    options: {
        list: BENTO_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
    },
    initialValue: "none",
});
