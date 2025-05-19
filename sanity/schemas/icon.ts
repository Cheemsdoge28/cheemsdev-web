import { defineField, defineType } from "sanity";

export default defineType({
  name: "icon",
  type: "object",
  title: "Lucide Icon",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Icon Name",
      description: "Enter the Lucide icon name (e.g. 'Activity', 'Home', 'User'). See https://lucide.dev/icons for all options.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      return {
        title: name ? `Lucide: ${name}` : 'Lucide Icon',
      };
    },
  },
});
