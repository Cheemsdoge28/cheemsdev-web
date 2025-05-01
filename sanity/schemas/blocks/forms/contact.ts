import { defineField, defineType } from "sanity";
import { Mails } from "lucide-react";
import { STACK_ALIGN } from "../shared/layout-variants";

export default defineType({
  name: "form-contact",
  type: "object",
  title: "Form: Contact",
  description:
    "A contact form ideal for collecting user inquiries and feedback.",
  icon: Mails,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "stackAlign",
      type: "string",
      title: "Stack Layout Alignment",
      options: {
        list: STACK_ALIGN.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
          name: "tagLine",
          type: "string",
        }),
        defineField({
          name: "title",
          type: "string",
        }),
        defineField({
              name: "description",
              type: "text",
            }),
    defineField({
      name: "consentText",
      type: "text",
      initialValue:
        "By subscribing, you agree to receive emails from us. You can unsubscribe at any time.",
    }),
    defineField({
      name: "buttonText",
      type: "string",
      initialValue: "Contact Us",
    }),
    defineField({
          name: "buttonVariant",
          type: "button-variant",
          title: "Button Variant",
          description: "Select a button color variant",
          initialValue: "default",
        }),
    defineField({
      name: "successMessage",
      type: "text",
      initialValue: "Thank you for submitting! We will get back to you soon.",
    }),
    defineField({
        name: "image",
        title: "Image",
        type: "image",
        fields: [
          {
            name: "alt",
            type: "string",
            title: "Alternative Text",
          },
          defineField({
            type: "text",
            name: "imagePrompt",
            title: "Image prompt",
            rows: 2,
          }),
        ],
        options: {
          aiAssist: {
            imageInstructionField: "imagePrompt",
          },
        },
      }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Form",
      };
    },
  },
});

