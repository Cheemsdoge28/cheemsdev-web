
import { groq } from "next-sanity";

export const hero5Query = groq`
  _type == "hero-5" => {
    _type,
    tagLine,
    title,
    padding,
    colorVariant,
    heightVariant,
    textAlign,
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
