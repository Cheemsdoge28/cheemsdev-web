import { defineType } from "sanity";

export const TEXT_ALIGN_OPTIONS = [
    { title: "Left", value: "left" },
    { title: "Right", value: "right" },
    { title: "Center", value: "center" },
    { title: "Top Left", value: "topleft" },
    { title: "Top Right", value: "topright" },
    { title: "Bottom Left", value: "bottomleft" },
    { title: "Bottom Right", value: "bottomright" },
];

export const textAlign = defineType({
    name: "text-align",
    title: "Text Align",
    type: "string",
    options: {
        list: TEXT_ALIGN_OPTIONS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
    },
    initialValue: "left",
});
