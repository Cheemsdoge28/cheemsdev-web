// Product-related imports removed
import { HotspotPreview } from "@/components/inputs/HotspotPreview";
import { LayoutTemplate } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero-hotspot",
  title: "Hero Hotspot",
  type: "document",
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: "featured",
      title: "Feature Image",
      type: "image",
    }),
    {
      name: "hotspots",
      title: "Hotspots",
      type: "array",
      of: [
        defineField({
          name: "spot",
          type: "object",
          fieldsets: [{ name: "position", options: { columns: 2 } }],
          fields: [
            // Changed from product to service reference
            { name: "service", type: "reference", to: [{ type: "page" }] },
            {
              name: "x",
              type: "number",
              readOnly: true,
              fieldset: "position",
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
            {
              name: "y",
              type: "number",
              readOnly: true,
              fieldset: "position",
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
          ],
          preview: {
            select: {
              service: "service.title",
              x: "x",
              y: "y",
            },
            prepare({ x, y, service }) {
              return {
                title: service ?? `No service selected`,
                subtitle: x && y ? `${x}% x ${y}%` : `No position set`,
              };
            },
          },
        }),
      ],
      options: {
        imageHotspot: {
          imagePath: `featured`,
          pathRoot: `parent`,
          descriptionPath: "details",
          // Product preview removed
          tooltip: HotspotPreview,
        },
      },
    },
  ],
});
