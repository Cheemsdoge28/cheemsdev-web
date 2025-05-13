import { groq } from "next-sanity";
import { hero1Query } from "./hero/hero-1";
import { hero2Query } from "./hero/hero-2";
import { hero4Query } from "./hero/hero-4";
import {hero5Query} from "./hero/hero-5";
import { sectionHeaderQuery } from "./section-header";
import { splitRowQuery } from "./split/split-row";
import { gridRowQuery } from "./grid/grid-row";
import { carousel1Query } from "./carousel/carousel-1";
import { carousel2Query } from "./carousel/carousel-2";
import { carousel3Query } from "./carousel/carousel-3";
import { timelineQuery } from "./timeline";
import { cta1Query } from "./cta/cta-1";
import { logoCloud1Query } from "./logo-cloud/logo-cloud-1";
import { faqsQuery } from "./faqs";
import { formNewsletterQuery } from "./forms/newsletter";
import { formContactQuery } from "./forms/contact";
import { allPostsQuery } from "./all-posts";
import { allProductsQuery } from "./all-products";
import { textQuery } from "./text";
import { tabSectionQuery } from "./tab-section/tab-section";
export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${hero1Query}
      ${hero2Query}
      ${hero4Query}
      ${hero5Query}
      ${sectionHeaderQuery}
      ${splitRowQuery}
      ${gridRowQuery}
      ${tabSectionQuery}
      ${carousel1Query}
      ${carousel2Query}
      ${carousel3Query}
      ${timelineQuery}
      ${cta1Query}
      ${logoCloud1Query}
      ${faqsQuery}
      ${formNewsletterQuery}
      ${formContactQuery}
      ${allPostsQuery}
      ${allProductsQuery}
      ${textQuery}
    },
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
  }
`;

export const FOOTER_CONTENT_QUERY = groq`
  *[_type == "footerContent" && slug.current == $slug][0]{
    title,
    blocks[]{
      ${hero1Query}
      ${hero2Query}
      ${hero4Query}
      ${hero5Query}
      ${sectionHeaderQuery}
      ${splitRowQuery}
      ${gridRowQuery}
      ${tabSectionQuery}
      ${carousel1Query}
      ${carousel2Query}
      ${timelineQuery}
      ${cta1Query}
      ${logoCloud1Query}
      ${faqsQuery}
      ${formNewsletterQuery}
      ${formContactQuery}
      ${allPostsQuery}
      ${textQuery}
    }
  }
`;

export const DEFAULT_FOOTER_CONTENT_QUERY = groq`
  *[_type == "footerContent" && slug.current == "default"][0]{
    title,
    blocks[]{
      ${hero1Query}
      ${hero2Query}
      ${hero4Query}
      ${hero5Query}
      ${sectionHeaderQuery}
      ${splitRowQuery}
      ${gridRowQuery}
      ${tabSectionQuery}
      ${carousel1Query}
      ${carousel2Query}
      ${timelineQuery}
      ${cta1Query}
      ${logoCloud1Query}
      ${faqsQuery}
      ${formNewsletterQuery}
      ${formContactQuery}
      ${allPostsQuery}
      ${textQuery}
    }
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;

export const SERVICES_PAGES_SLUGS_QUERY = groq`*[_type == "page" && isServicesPage == true && defined(slug)]{
  title,
  slug
}`;

export const PAGE_HAS_CUSTOM_FOOTER_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    hasCustomFooter,
    title,
    slug
  }
`;