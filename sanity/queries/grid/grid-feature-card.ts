import { groq } from "next-sanity";

export const gridFeatureCardQuery = groq`
  _type == "grid-feature-card" => {
    _type,
    title,
    subtitle,
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
      alt,
      imagePrompt
    },

    description,
    link,
    highlight,
  },
`;
