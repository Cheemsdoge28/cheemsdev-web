"use server";
import { POST_QUERY } from "@/sanity/queries/post";
import { POSTS_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/queries/posts";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PRODUCT_BLOCK_QUERY,
  PRODUCT_QUERY,
  PRODUCTS_QUERY,
} from "@/sanity/queries/products";

export const fetchSanityPosts = async (): Promise<Sanity.Post[]> => {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
  });

  return data;
};

export const fetchSanityProducts = async (): Promise<Sanity.Product[]> => {
  const { data } = await sanityFetch({
    query: PRODUCTS_QUERY,
  });

  return data;
};

export const fetchSanityPostsStaticParams = async (): Promise<
  Sanity.Post[]
> => {
  const { data } = await sanityFetch({
    query: POSTS_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data;
};

export const fetchSanityProductsStaticParams = async (): Promise<
  Sanity.Product[]
> => {
  const { data } = await sanityFetch({
    query: PRODUCTS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Sanity.Post> => {
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityProductBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Sanity.Product> => {
  const { data } = await sanityFetch({
    query: PRODUCT_QUERY,
    params: { slug },
  });
  return data;
};

export const fetchSanityProductByRef = async ({
  productId,
}: {
  productId: string;
}): Promise<Sanity.Product> => {
  const { data } = await sanityFetch({
    query: PRODUCT_BLOCK_QUERY,
    params: { productId },
  });
  return data;
};
