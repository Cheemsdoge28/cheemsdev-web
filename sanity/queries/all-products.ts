import { groq } from "next-sanity";

export const allProductsQuery = groq`
  _type == "all-products" => {
    _type,
    padding,
    colorVariant,
  },
`;
