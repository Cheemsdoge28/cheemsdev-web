import { generatePageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import {
  fetchSanityProductsStaticParams,
  fetchSanityProductBySlug,
} from "../../blog/actions";
import { BreadcrumbLink } from "@/types";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ProductHero from "@/components/ui/product/hero";

export async function generateStaticParams() {
  const products = await fetchSanityProductsStaticParams();

  return products.map((product) => ({
    slug: product.store.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const product = await fetchSanityProductBySlug({ slug: params.slug });

  if (!product) {
    notFound();
  }

  return generatePageMetadata({
    page: product,
    slug: `/product/${params.slug}`,
  });
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const product = await fetchSanityProductBySlug({ slug: params.slug });

  if (!product) {
    notFound();
  }

  const links: BreadcrumbLink[] = product
    ? [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Products",
          href: "/products",
        },
        {
          label: product.store.title,
          href: "#",
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="max-w-6xl mx-auto">
          <Breadcrumbs links={links} />
          <ProductHero
            body={product.body}
            title={product.store.title ?? product.titleProxy}
            image={product.store.previewImageUrl}
            variants={product.store.options[0].values}
            key={product.store.slug.current ?? product.slugProxy}
            slug={product.store.slug.current ?? product.slugProxy}
            price={product.store.priceRange.minVariantPrice}
          />
        </article>
      </div>
    </section>
  );
}
