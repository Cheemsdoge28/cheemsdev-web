"use server";
import { PAGE_QUERY, PAGES_SLUGS_QUERY, SERVICES_PAGES_SLUGS_QUERY, FOOTER_CONTENT_QUERY, DEFAULT_FOOTER_CONTENT_QUERY, PAGE_HAS_CUSTOM_FOOTER_QUERY } from "@/sanity/queries/page";
import { sanityFetch } from "@/sanity/lib/live";
import { ANNOUNCEMENT_QUERY } from "@/sanity/queries/announcement";

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Sanity.Page> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPagesStaticParams = async (): Promise<
  Sanity.Page[]
> => {
  const { data } = await sanityFetch({
    query: PAGES_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data;
};

export const fetchAnnouncement = async (): Promise<Sanity.Announcement> => {
  const { data } = await sanityFetch({
    query: ANNOUNCEMENT_QUERY,
  });

  return data;
};

export const fetchServicesPages = async (): Promise<{ title: string, slug: string }[]> => {
  const { data } = await sanityFetch({
    query: SERVICES_PAGES_SLUGS_QUERY
  });
  

  
  return data.map((service: { title: string, slug: { current: string } }) => ({
    title: service.title,
    slug: service.slug.current
  }));
};

export const fetchFooterContentBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Sanity.FooterContent> => {
  const { data } = await sanityFetch({
    query: FOOTER_CONTENT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchDefaultFooterContent = async (): Promise<Sanity.FooterContent> => {
  const { data } = await sanityFetch({
    query: DEFAULT_FOOTER_CONTENT_QUERY,
  });

  return data;
};

export const checkPageHasCustomFooter = async ({
  slug,
}: {
  slug: string;
}): Promise<{ hasCustomFooter: boolean; title: string; slug: { current: string } }> => {
  const { data } = await sanityFetch({
    query: PAGE_HAS_CUSTOM_FOOTER_QUERY,
    params: { slug },
  });

  return data;
};

