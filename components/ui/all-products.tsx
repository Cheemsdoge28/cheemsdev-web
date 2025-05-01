import { stegaClean } from "next-sanity";
import SectionContainer from "./section-container";
import { fetchSanityProducts } from "@/app/(main)/blog/actions";
import Link from "next/link";
import ProductCard from "./product-card";

interface AllProductsProps {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
}

export default async function AllProducts({
  padding,
  colorVariant,
}: Partial<AllProductsProps>) {
  const color = stegaClean(colorVariant);
  const products = await fetchSanityProducts();

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <div
              key={product.store.slug.current ?? product.slugProxy}
              className="flex w-full rounded-3xl"
            >
              <ProductCard
                title={product.store.title}
                image={product.store.previewImageUrl}
                excerpt={product.excerpt}
                minVariantPrice={product.store.priceRange.minVariantPrice}
                maxVariantPrice={product.store.priceRange.maxVariantPrice}
                variants={product.store.options[0].values}
                slug={product.store.slug.current ?? product.slugProxy}
              />
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
