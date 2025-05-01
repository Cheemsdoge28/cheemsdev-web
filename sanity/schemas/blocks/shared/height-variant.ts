import { defineType } from "sanity";

export const HEIGHT_VARIANTS = [
    { title: "Default", value: "default" },
    { title: "Small", value: "small" },
    {title: "Screen", value: "screen"},
];

export const heightVariant = defineType({
    name: "height-variant",
    title: "Height Variant",
    type: "string",
    options: {
        list: HEIGHT_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
    },
    initialValue: "default",
});
