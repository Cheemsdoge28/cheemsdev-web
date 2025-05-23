import { groq } from "next-sanity";
import { gridCardQuery } from "@/sanity/queries/grid/grid-card";
import { gridCard2Query } from "./grid-card-2";
import { pricingCardQuery } from "@/sanity/queries/grid/pricing-card";
import { gridPostQuery } from "@/sanity/queries/grid/grid-post";
import { gridFeatureCardQuery } from "@/sanity/queries/grid/grid-feature-card";
import { productRefQuery } from "../products";

export const gridRowQuery = groq`
  _type == "grid-row" => {
    _type,
    padding,
    colorVariant,
    gridColumns,
    columns[]{
      ${gridCardQuery}
      ${gridCard2Query}
      ${pricingCardQuery}
      ${gridPostQuery}
      ${gridFeatureCardQuery}
      ${productRefQuery}
    },
  },
`;
