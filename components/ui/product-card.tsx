import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProductCard({
  className,
  title,
  image,
  minVariantPrice,
  maxVariantPrice,
  titleProxy,
  excerpt,
  variants,
  slug,
  price,
}: Partial<{
  className: string;
  title: string;
  image: string | undefined;
  minVariantPrice: number;
  maxVariantPrice: number;
  titleProxy: string;
  excerpt: string;
  slug: string;
  variants: string[];
  price: string;
}>) {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-between overflow-hidden transition ease-in-out border rounded-3xl p-4",
        className
      )}
    >
      <div>
        {image ? (
          <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={title || titleProxy || ""}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={100}
            />
          </div>
        ) : null}
        {title || titleProxy ? (
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[1.5rem] leading-[1.2]">
              {titleProxy ? titleProxy : title}
            </h3>
          </div>
        ) : null}
        {excerpt ? <p className="line-clamp-2">{excerpt}</p> : null}
        {variants && variants.length > 0 ? (
          <div className="flex w-max justify-between items-center mt-2 gap-1">
            <p className="font-semibold">Variants:</p>
            <p>{variants.join(", ")}</p>
          </div>
        ) : null}
        {minVariantPrice && maxVariantPrice && !price ? (
          <div className="flex w-max justify-between items-center mt-2">
            <p className="text-[1.2rem] font-semibold">${minVariantPrice}</p>
            <p className="text-[1.2rem] font-semibold">-</p>
            <p className="text-[1.2rem] font-semibold">${maxVariantPrice}</p>
          </div>
        ) : price ? (
          <div className="flex w-max justify-between items-center mt-2">
            <p className="text-[1.2rem] font-semibold">${price}</p>
          </div>
        ) : null}
      </div>
      <Link
        href={`/product/${slug}`}
        className="mt-3 xl:mt-6 w-10 h-10 border rounded-full flex items-center justify-center group hover:border-primary"
      >
        <ChevronRight
          className="text-border group-hover:text-primary"
          size={24}
        />
      </Link>
    </div>
  );
}
