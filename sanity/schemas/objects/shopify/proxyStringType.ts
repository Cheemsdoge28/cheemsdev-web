import ProxyString from "@/components/inputs/ProxyString";
import { defineField } from "sanity";

export const proxyStringType = defineField({
  name: "proxyString",
  title: "Title",
  type: "string",
  components: {
    input: ProxyString,
  },
});
