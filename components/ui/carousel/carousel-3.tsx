"use client";

import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// You'll need to add these icons to your project or use alternatives
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";

const CAROUSEL_SIZES = {
  one: "basis-full",
  two: "basis-full md:basis-1/2",
  three: "basis-full md:basis-1/2 lg:basis-1/3",
} as const;

const IMAGE_SIZES = {
  one: "h-[30rem] sm:h-[40rem] lg:h-[31.25rem] xl:h-[35rem]",
  two: "h-[30rem] md:h-[22rem] lg:h-[30rem] xl:h-[35rem]",
  three: "h-[30rem] md:h-[20rem] xl:h-[25rem]",
} as const;

type CarouselSize = keyof typeof CAROUSEL_SIZES;

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

interface Carousel1Props {
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
  size: CarouselSize;
  indicators: "none" | "dots" | "count";
  images?: Sanity.Image[];
}

export default function Carousel1({
  padding,
  colorVariant,
  size = "one",
  indicators = "none",
  images,
}: Partial<Carousel1Props>) {
  const color = stegaClean(colorVariant);
  const stegaSize = stegaClean(size);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    checkScrollability();
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

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      setCurrentIndex(index);
    }
  };

  if (!images || images.length === 0) return null;

  const carouselItems = images.map((image, index) => (
    <CarouselCard 
      key={`card-${index}`} 
      image={image} 
      index={index} 
      size={stegaSize}
    />
  ));
  return (
    <SectionContainer color={color} padding={padding}>
      <CarouselContext.Provider
        value={{ onCardClose: handleCardClose, currentIndex }}
      >
        <div className="relative w-full">
          <div
            className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
            ref={carouselRef}
            onScroll={checkScrollability}
          >
            <div
              className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            ></div>

            <div className="flex flex-row justify-start gap-4 pl-4 mx-auto max-w-7xl">
              {images.map((image, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                    },
                  }}
                  key={`card-${index}-${image.alt}`}
                  className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
                >
                  <CarouselCard 
                    image={image} 
                    index={index}
                    size={stegaSize}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mr-10 flex justify-end gap-2">
            <button
              className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 disabled:opacity-50 transition-all"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button
              className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 disabled:opacity-50 transition-all"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </CarouselContext.Provider>
    </SectionContainer>
  );
}

interface CarouselCardProps {
  image: Sanity.Image;
  index: number;
  size: CarouselSize;
}

const CarouselCard = ({ image, index, size }: CarouselCardProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
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

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const cardWidth = size === "one" ? "w-full max-w-[60rem]" : 
                   size === "two" ? "w-56 md:w-96" : 
                   "w-56 md:w-80";

  const imageUrl = image?.asset?._id ? urlFor(image.asset).url() : "";
  const altText = image?.alt ?? "Carousel image";

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={`card-${index}`}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-card p-4 font-sans md:p-10"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary"
                onClick={handleClose}
              >
                <X className="h-6 w-6 text-primary-foreground" />
              </button>
              
              <div className="py-10">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className="object-cover"
                    placeholder={
                      image?.asset?.metadata?.lqip ? "blur" : undefined
                    }
                    blurDataURL={image.asset?.metadata?.lqip || ""}
                    quality={100}
                  />
                </div>
                {image.alt && (
                  <p className="mt-4 text-xl font-semibold text-foreground">{image.alt}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <motion.button
        layoutId={`card-${index}`}
        onClick={handleOpen}
        className={cn(
          "relative z-10 overflow-hidden rounded-3xl bg-card",
          cardWidth,
          IMAGE_SIZES[size]
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full w-50 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        
        {image.alt && (
          <div className="relative z-40 p-8">
            <motion.p
              layoutId={`title-${index}`}
              className="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-white md:text-3xl"
            >
              {image.alt}
            </motion.p>
          </div>
        )}
        
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="absolute inset-0 z-10 object-cover transition duration-300"
          placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
          blurDataURL={image.asset?.metadata?.lqip || ""}
          quality={90}
        />
      </motion.button>
    </>
  );
};