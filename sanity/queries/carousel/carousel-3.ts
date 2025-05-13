import { groq } from "next-sanity";

export const carousel3Query = groq`
  _type == "carousel-3" => {
    _type,
    padding,
    colorVariant,
    size,
    indicators,
    images[]{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      description
    },
  },
`;