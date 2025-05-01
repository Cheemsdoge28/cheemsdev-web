import { groq } from "next-sanity";

export const PRODUCTS_QUERY = groq`*[_type == "product" && store.status == "active" && !store.isDeleted] | order(store.title asc) {
  _id,
  _type,
  titleProxy,
  slugProxy,
  body,
  excerpt,
  colorTheme->{
    _id,
    title
  },
  store {
    title,
    slug {
      current
    },
    priceRange {
      minVariantPrice,
      maxVariantPrice
    },
    previewImageUrl,
    variants[] {
      _key,
      title,
      price
    },
    options[] {
      _key,
      name,
      values
    }
  },
  seo {
    metaTitle,
    metaDescription
  }
}`;

export const PRODUCT_QUERY = groq`*[_type == "product" && store.slug.current == $slug][0] {
  _id,
  _type,
  titleProxy,
  slugProxy,
  body,
  colorTheme->{
    _id,
    title
  },
  store {
    title,
    slug {
      current
    },
    priceRange {
      minVariantPrice,
      maxVariantPrice
    },
    previewImageUrl,
    variants[] {
      _key,
      title,
      price,
      availableForSale
    },
    options[] {
      _key,
      name,
      values
    }
  },
  seo {
    metaTitle,
    metaDescription
  }
}`;

export const PRODUCT_BLOCK_QUERY = groq`*[_type == "product" && _id == $productId][0]{
  _id,
  _type,
  titleProxy,
  slugProxy,
  body,
  excerpt,
  colorTheme->{
    _id,
    title
  },
  store {
    title,
    slug {
      current
    },
    priceRange {
      minVariantPrice,
      maxVariantPrice
    },
    previewImageUrl,
    variants[] {
      _key,
      title,
      price,
      availableForSale
    },
    options[] {
      _key,
      name,
      values
    }
  },
  seo {
    metaTitle,
    metaDescription
  }
}`;

export const productRefQuery = groq`
  _type == "reference" => @->{
    _type,
    _id,
    titleProxy,
    excerpt,
    "title": store.title,
    "slug": store.slug.current,
    "price": store.priceRange.minVariantPrice,
    "image": store.previewImageUrl,
  },
`;
