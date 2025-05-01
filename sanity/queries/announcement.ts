import { groq } from "next-sanity";

export const ANNOUNCEMENT_QUERY = groq`
*[_type == "announcement"][0]{
    isActive,
    body,
    CTA
  }
`;
