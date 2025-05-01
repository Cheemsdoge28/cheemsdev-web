
import { groq } from "next-sanity";

export const hero4Query = groq`
  _type == "hero-4" => {
    _type,
    tagLine,
    title,
    padding,
    colorVariant,
    body[]{
      ...,
      _type == "image" => {
        ...,
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
        }
      }
    },
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
    links,
    tags,
    useGlobalTagStyle,
    globalTagVariant,
    globalTagSizeVariant
  },
`;
