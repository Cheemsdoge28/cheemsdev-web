"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import SectionContainer from "../section-container";
import { stegaClean } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

const CAROUSEL_SIZES = {
  one: "basis-full",
  two: "basis-full md:basis-1/2",
  three: "basis-full md:basis-1/2 lg:basis-1/3",
} as const;

type CarouselSize = keyof typeof CAROUSEL_SIZES;

interface CarouselProps {
  readonly images?: readonly {
    readonly src?: string;
    readonly alt?: string;
    readonly description?: string;
    readonly asset?: { 
      readonly _id: string;
      readonly url?: string;
      readonly metadata?: {
        readonly lqip?: string;
      };
    };
  }[];
  readonly stackAlign?: "left" | "center";
  readonly sectionWidth?: "default" | "narrow";
  readonly colorVariant?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent";
  readonly size?: CarouselSize;
  readonly padding?: {
    readonly top: boolean;
    readonly bottom: boolean;
  };
}

export default function Carousel3({
  images,
  size = "one",
  stackAlign = "left",
  sectionWidth = "default",
  colorVariant = "background",
  padding = { top: true, bottom: true },
}: Readonly<CarouselProps>) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [images]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);
  const isNarrow = stegaClean(sectionWidth) === "narrow";
  const stegaSize = stegaClean(size);

  if (!images || images.length === 0) return null;

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          align === "center" ? "max-w-[48rem] text-center mx-auto" : undefined,
          isNarrow ? "max-w-[48rem] mx-auto" : undefined
        )}
      >
        <div className="relative">
          <div
            className="flex overflow-x-scroll scroll-smooth py-8 [scrollbar-width:none]"
            ref={carouselRef}
            onScroll={checkScrollability}
          >
            <div className="flex gap-4">
              {images.map((image, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.1 * index,
                      ease: "easeOut",
                    },
                  }}
                  key={`card-${index}`}
                  className={CAROUSEL_SIZES[stegaSize]}
                >
                  <CarouselCard 
                    image={image} 
                    index={index} 
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className={cn(
            "mt-4 flex gap-2",
            align === "center" ? "justify-center" : "justify-end"
          )}>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-[2rem] bg-secondary disabled:opacity-50"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-5 w-5 text-secondary-foreground" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-[2rem] bg-secondary disabled:opacity-50"
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ArrowRight className="h-5 w-5 text-secondary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

interface CarouselCardProps {
  image: {
    src?: string;
    alt?: string;
    description?: string;
    asset?: { 
      _id: string;
      url?: string;
      metadata?: {
        lqip?: string;
      };
    };
  };
  index: number;
}

const CarouselCard = React.memo(({ image, index }: Readonly<CarouselCardProps>) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => setOpen(false));

  const getImageUrl = () => {
    if (image?.asset?._id) {
      return urlFor(image.asset).url();
    }
    if (image?.asset?.url) {
      return image.asset.url;
    }
    if (image?.src) {
      return image.src;
    }
    return "";
  };

  const imageUrl = getImageUrl();
  const blurDataURL = image?.asset?.metadata?.lqip;
  const altText = image?.alt ?? "Carousel image";
  
  const [category, title] = image?.alt?.includes(":")
    ? image.alt.split(":", 2)
    : [null, image?.alt];

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-md"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              ref={containerRef}
              layoutId={`card-${index}`}
              className="relative z-[10000] m-4 max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-card shadow-xl"
            >
              <div className="flex items-center justify-between p-4 md:px-6">
                {category && (
                  <motion.p
                    layoutId={`category-${index}`}
                    className="text-base font-medium text-foreground"
                  >
                    {category}
                  </motion.p>
                )}
                <button
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-[2rem] bg-primary hover:bg-primary/90 transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-primary-foreground" />
                </button>
              </div>

              <motion.h2
                layoutId={`title-${index}`}
                className="px-4 md:px-16 lg:px-24 text-2xl font-semibold md:text-3xl text-card-foreground"
              >
                {title}
              </motion.h2>

              <div className="overflow-y-auto p-4 md:px-16 lg:px-24">
                {imageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] mt-4">
                    <Image
                      src={imageUrl}
                      alt={altText}
                      fill
                      className="object-cover"
                      placeholder={blurDataURL ? "blur" : undefined}
                      blurDataURL={blurDataURL ?? ""}
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                )}
                
                {image.description && (
                  <div className="mt-6 text-base text-card-foreground/90 leading-relaxed">
                    <p>{image.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={`card-${index}`}
        onClick={() => setOpen(true)}
        className="group relative flex h-80 w-60 flex-col items-start overflow-hidden rounded-[2rem] bg-card shadow-md transition-all hover:shadow-lg md:h-80 md:w-72 border border-border/90 hover:border-border"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-background/20" />

        <div className="relative z-10 flex h-full w-full flex-col justify-end p-4">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            {category && (
              <motion.p
                layoutId={`category-${index}`}
                className="mb-1 text-sm font-medium text-primary/90"
              >
                {category}
              </motion.p>
            )}
            <motion.p
              layoutId={`title-${index}`}
              className="text-lg font-bold leading-tight text-primary md:text-xl"
            >
              {title}
            </motion.p>
          </div>
        </div>

        {imageUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder={blurDataURL ? "blur" : undefined}
              blurDataURL={blurDataURL ?? ""}
              quality={90}
              sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
            />
          </div>
        )}
      </motion.button>
    </>
  );
});

CarouselCard.displayName = "CarouselCard";
