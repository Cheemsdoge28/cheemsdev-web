"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOutsideClick } from "@/hooks/use-outside-click"
import SectionContainer from "../section-container"

interface CarouselProps {
  readonly images: readonly {
    readonly src: string
    readonly alt: string
    readonly asset?: { readonly _id: string }
  }[]
  readonly colorVariant?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent"
  readonly size?: "one" | "two" | "three"
  readonly urlFor?: (asset: any) => { readonly url: () => string }
  readonly padding?: {
    readonly top: boolean
    readonly bottom: boolean
  }
}

export default function Carousel3({ 
  images, 
  size = "one", 
  urlFor,
  colorVariant = "background",
  padding = { top: true, bottom: true }
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    checkScrollability()
    window.addEventListener("resize", checkScrollability)
    return () => window.removeEventListener("resize", checkScrollability)
  }, [images])

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  if (!images || images.length === 0) return null

  return (
    <SectionContainer color={colorVariant} padding={padding}>
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
              >
                <CarouselCard image={image} index={index} size={size} urlFor={urlFor} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2 pr-4">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-5 w-5 text-secondary-foreground" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ArrowRight className="h-5 w-5 text-secondary-foreground" />
          </button>
        </div>
      </div>
    </SectionContainer>
  )
}

interface CarouselCardProps {
  image: {
    src: string
    alt: string
    asset?: { _id: string }
  }
  index: number
  size: "one" | "two" | "three"
  urlFor?: (asset: any) => { url: () => string }
}

const CarouselCard = ({ image, index, size, urlFor }: CarouselCardProps) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  useOutsideClick(containerRef, () => setOpen(false))

  const imageUrl = image.asset?._id && urlFor ? urlFor(image.asset).url() : image.src

  const [category, title] = image.alt?.includes(":") ? image.alt.split(":", 2) : [null, image.alt]

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              ref={containerRef}
              layoutId={`card-${index}`}
              className="relative z-50 m-4 max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-xl"
            >
              <div className="flex items-center justify-between p-4">
                {category && (
                  <motion.p layoutId={`category-${index}`} className="text-base font-medium">
                    {category}
                  </motion.p>
                )}
                <button
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-primary-foreground" />
                </button>
              </div>

              <motion.h2 layoutId={`title-${index}`} className="px-4 md:px-16 lg:px-24 text-2xl font-semibold md:text-3xl">
                {title}
              </motion.h2>

              <div className="overflow-y-auto p-4">
                {imageUrl && (
                  <motion.div
                    className="relative aspect-video w-full overflow-hidden rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <BlurImage src={imageUrl} alt={title} fill className="object-cover" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={`card-${index}`}
        onClick={() => setOpen(true)}
        className="group relative flex h-72 w-60 flex-col items-start overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-lg md:h-80 md:w-72"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

        <div className="relative z-10 flex h-full w-full flex-col justify-end p-4">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            {category && (
              <motion.p layoutId={`category-${index}`} className="mb-1 text-sm font-medium text-white/90">
                {category}
              </motion.p>
            )}
            <motion.p layoutId={`title-${index}`} className="text-lg font-bold leading-tight text-white md:text-xl">
              {title}
            </motion.p>
          </div>
        </div>

        {imageUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <BlurImage
              src={imageUrl}
              alt={title}
              fill
              className="scale-100 transform object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </motion.button>
    </>
  )
}

const BlurImage = ({
  src,
  alt,
  className,
  fill,
  ...rest
}: {
  src: string
  alt: string
  className?: string
  fill?: boolean
  [key: string]: any
}) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <>
      {fill ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt || "Image"}
          fill
          className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
          onLoadingComplete={() => setLoading(false)}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          {...rest}
        />
      ) : (
        <img
          src={src || "/placeholder.svg"}
          alt={alt || "Image"}
          className={cn("h-full w-full transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
          onLoad={() => setLoading(false)}
          loading="lazy"
          decoding="async"
          {...rest}
        />
      )}
    </>
  )
}
