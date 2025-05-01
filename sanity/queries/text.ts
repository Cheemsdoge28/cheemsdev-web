import { groq } from "next-sanity";

export const textQuery = groq`_type == "textBlock" => {
    _type,
    body[],}`;
