"use client";
import Image from "next/image";
import { Button } from "../button";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { useState } from "react";

export default function ProductHero({
  title,
  body,
  variants,
  slug,
  image,
  price,
}: Partial<{
  title: string;
  body: any;
  variants: string[];
  slug: string;
  image: string;
  price: number;
}>) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const handleVariantClick = (variant: string) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 md:px-16 lg:px-24 mx-auto py-6">
      <div className="grid md:grid-cols-5 gap-3 items-start">
        <div className="md:col-span-4">
          <Image
            src={image || ""}
            alt={title || ""}
            width={600}
            height={900}
            className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
          />
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{title}</h1>
          <div className="text-4xl font-bold">${price}</div>
          <div className="block">
            <PortableTextRenderer value={body} />
          </div>
        </div>
        <div className="grid gap-4 md:gap-10">
          {variants && variants.length > 1 && (
            <div className="flex flex-wrap gap-4">
              {variants.map((variant, index) => (
                <Button
                  key={index}
                  variant={selectedVariant === variant ? "default" : "outline"}
                  onClick={() => handleVariantClick(variant)}
                  className="min-w-[100px]"
                >
                  {variant}
                </Button>
              ))}
            </div>
          )}
          <Button
            size={"lg"}
            disabled={!selectedVariant}
            onClick={() => {
              alert("Added to cart");
            }}
            className="w-full"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
