import { defineField, defineType } from "sanity";

export default defineType({
  name: "carousel-3",
  title: "Animated Card Carousel",
  type: "object",
  fields: [
    defineField({
      name: "padding",
      title: "Section Padding",
      type: "object",
      options: {
        columns: 2,
      },
      fields: [
        {
          name: "top",
          title: "Top",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "bottom",
          title: "Bottom",
          type: "boolean",
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: "colorVariant",
      title: "Color Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Card", value: "card" },
          { title: "Accent", value: "accent" },
          { title: "Destructive", value: "destructive" },
          { title: "Background", value: "background" },
          { title: "Transparent", value: "transparent" },
        ],
      },
      initialValue: "background",
    }),
    defineField({
      name: "size",
      title: "Card Size",
      type: "string",
      options: {
        list: [
          { title: "One per row", value: "one" },
          { title: "Two per row", value: "two" },
          { title: "Three per row", value: "three" },
        ],
      },
      initialValue: "one",
    }),
    defineField({
      name: "indicators",
      title: "Navigation Indicators",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Dots", value: "dots" },
          { title: "Count", value: "count" },
        ],
      },
      initialValue: "none",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text / Caption",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              description: "Optional extended description shown in the modal view",
            }
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      images: "images",
    },
    prepare({ images }) {
      return {
        title: "Animated Card Carousel",
        subtitle: `${images?.length ?? 0} images`,
        media: images?.[0],
      };
    },
  },
});