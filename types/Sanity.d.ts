import type {
  SanityImageObject,
  SanityImageDimensions,
} from "@sanity/image-url/lib/types/types";
import type { SanityDocument } from "next-sanity";

declare global {
  namespace Sanity {
    // pages
    type PageBase = SanityDocument<{
      title?: string;
      slug: { current: string };
      meta_title: string;
      meta_description: string;
      ogImage?: Image;
      noindex: boolean;
    }>;

    type Announcement = SanityDocument<{
      body: any;
      isActive: boolean;
      CTA: Cta;
    }>;

    type Page = PageBase & {
      readonly _type: "page";
      blocks?: Block[];
    };

    type FooterContent = SanityDocument<{
      readonly _type: "footerContent";
      title?: string;
      slug: { current: string };
      blocks?: Block[];
    }>;

    type Post = PageBase &
      SanityDocument<{
        readonly _type: "post";
        excerpt?: string;
        author?: Author;
        categories?: Category[];
        body: any;
        image?: Image;
      }>;

    type Product = PageBase &
      SanityDocument<{
        readonly _type: "product";
        titleProxy?: string;
        slugProxy?: string;
        body?: any;
        excerpt?: string;
        colorTheme?: {
          _id: string;
          title: string;
        };
        store: {
          title: string;
          slug: {
            current: string;
          };
          priceRange: {
            minVariantPrice: number;
            maxVariantPrice: number;
          };
          previewImageUrl?: string;
          variants: Array<{
            _key: string;
            title: string;
            price: number;
            availableForSale?: boolean;
          }>;
          options: Array<{
            _key: string;
            name: string;
            values: string[];
          }>;
        };
        seo?: {
          metaTitle?: string;
          metaDescription?: string;
        };
      }>;

    type Author = SanityDocument<{
      name: string;
      slug: { current: string };
      image?: Image;
    }>;

    type Category = SanityDocument<{
      title: string;
    }>;

    type Image = SanityImageObject &
      Partial<{
        alt: string;
        asset: {
          _id: string;
          mimeType?: string;
          metadata: {
            dimensions: SanityImageDimensions;
            lqip: string;
          };
        };
      }>;

    // objects
    type Block<T = string> = {
      _type: T;
      _key: string;
      uid?: string;
    };
  }
}

export {};
