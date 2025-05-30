import { groq } from "next-sanity";

export const gridCard2Query = groq`
  _type == "grid-card-2" => {
    _type,
    title,
    excerpt,
    colorVariant,
    sizeVariant,
    bentoColSpan,
    bentoRowSpan,
    image{
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
      alt
    },
    link{
      href,
      target
    },
  },
`;