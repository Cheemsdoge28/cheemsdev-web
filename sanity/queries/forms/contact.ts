import { groq } from "next-sanity";

export const formContactQuery = groq`
  _type == "form-contact" => {
    _type,
    tagLine,
    title,
    description,
    padding,
    colorVariant,
    stackAlign,
    consentText,
    buttonText,
    buttonVariant,
    successMessage,
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
  },
`;
