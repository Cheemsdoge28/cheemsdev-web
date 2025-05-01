import { defineType } from "sanity";

export const SIZE_VARIANTS = [
    { title: "Default", value: "default" },
    { title: "Small", value: "small" },
    { title: "Medium", value: "medium" },
    { title: "Large", value: "large" },
];

export const sizeVariant = defineType({
    name: "size-variant",
    title: "Size Variant",
    type: "string",
    options: {
        list: SIZE_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
    },
    initialValue: "default",
});
