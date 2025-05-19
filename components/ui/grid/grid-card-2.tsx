"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { stegaClean } from "next-sanity"

interface GridCard2Props {
  readonly color?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent"
  readonly title?: string
  readonly excerpt?: string
  readonly image: Sanity.Image
  readonly link?: {
    readonly href?: string
    readonly target?: boolean
  }
  readonly sizeVariant?: "default" | "small"
  readonly bentoVariant?: "none" | "bento-3" | "bento-2" | "bento-1"
}

export default function GridCard2({
  color = "background",
  title,
  excerpt,
  image,
  link,
  sizeVariant = "default",
  bentoVariant = "none",
}: Readonly<GridCard2Props>) {
  const safeBentoVariant = stegaClean(bentoVariant)
  const safeSizeVariant = stegaClean(sizeVariant)

  // Extract title from image alt if not provided explicitly
  const extractedTitle = title ?? image?.alt
  const displayTitle = extractedTitle?.includes(":") ? extractedTitle.split(":", 2)[1]?.trim() : extractedTitle

  const getImageUrl = () => {
    if (image?.asset?._id) {
      return urlFor(image.asset).url()
    }
    return ""
  }

  const imageUrl = getImageUrl()
  const blurDataURL = image?.asset?.metadata?.lqip

  const isClickable = Boolean(link?.href)

  // Determine bento col-span class
  let bentoColSpan: string | undefined = undefined
  if (safeBentoVariant === "bento-3") {
    bentoColSpan = "md:col-span-3"
  } else if (safeBentoVariant === "bento-2") {
    bentoColSpan = "md:col-span-2"
  } else if (safeBentoVariant === "bento-1") {
    bentoColSpan = "md:col-span-1"
  }

  const CardContent = () => {
    if (safeSizeVariant === "small") {
      const isBento = safeBentoVariant !== "none"
      // Premium hover: clickable gets full effect, non-clickable gets subtle effect
      const baseClasses =
        "group relative flex h-16 w-full flex-row items-center overflow-hidden rounded-[2rem] bg-card shadow-md border border-border/90 px-4 pl-0 transition-all duration-300"
      const clickableHover =
        "hover:shadow-xl hover:scale-[1.04] hover:border-accent/60 hover:bg-gradient-to-r hover:from-accent/10 hover:to-background/80 active:scale-100"
      const nonClickableHover = "hover:shadow-lg hover:bg-muted/40"
      return (
        <div
          className={cn(
            baseClasses,
            !isBento && "max-w-xs",
            isClickable ? clickableHover : nonClickableHover,
            bentoColSpan,
            "flex gap-1"
          )}
        >
          {imageUrl && (
            <div
              className={cn(
                "relative flex-shrink-0 h-16 w-16 rounded-[2rem] overflow-hidden bg-muted transition-transform duration-300",
                isClickable ? "group-hover:scale-110 group-hover:shadow-accent/20" : "group-hover:scale-105",
              )}
            >
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={image.alt ?? ""}
                fill
                className="object-contain"
                placeholder={blurDataURL ? "blur" : undefined}
                blurDataURL={blurDataURL ?? ""}
                quality={90}
                sizes="48px"
              />
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col items-center gap-1">
            {displayTitle && (
              <p
                className={cn(
                  "text-xl font-bold leading-tight text-primary truncate text-center w-full transition-colors duration-300",
                  isClickable ? "group-hover:text-accent-foreground" : undefined,
                )}
              >
                {displayTitle}
              </p>
            )}
            {excerpt && (
              <p className="text-muted-foreground text-xs w-full truncate text-center">{excerpt}</p>
            )}
          </div>
        </div>
      )
    }

    // Default size variant
    const isBento = safeBentoVariant !== "none"
    const isBentoMultiCol = safeBentoVariant === "bento-2" || safeBentoVariant === "bento-3"

    // For bento-2 and bento-3, use flex row layout
    if (isBentoMultiCol) {
      return (
        <div
          className={cn(
            "group relative flex h-80 overflow-hidden rounded-[2rem] bg-card shadow-md transition-all hover:shadow-lg border border-border/90 hover:border-border flex-row gap-4 p-4",
            bentoColSpan,
          )}
        >
          {/* Image */}
          {imageUrl && (
            <div className="relative h-full w-1/2 overflow-hidden rounded-xl flex-shrink-0">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={image.alt ?? ""}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder={blurDataURL ? "blur" : undefined}
                blurDataURL={blurDataURL ?? ""}
                quality={90}
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center gap-1">
            <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px] flex flex-col items-center gap-1">
              {displayTitle && (
                <p className="text-lg text-center font-bold leading-tight text-primary md:text-xl">{displayTitle}</p>
              )}
              {excerpt && (
                <p className="text-muted-foreground text-sm text-center">{excerpt}</p>
              )}
              <p className="text-muted-foreground text-sm">
                {image?.alt && !displayTitle?.includes(image.alt) ? image.alt : ""}
              </p>
            </div>
          </div>
        </div>
      )
    }

    // Original layout for non-bento or bento-1
    return (
      <div
        className={cn(
          "group relative flex h-80 flex-col items-center overflow-hidden rounded-[2rem] bg-card shadow-md transition-all hover:shadow-lg md:h-80 border border-border/90 hover:border-border",
          !isBento && "w-60 md:w-72",
          bentoColSpan,
        )}
      >
        {/* Gradient overlay (outside image) */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-background/20" />
        {/* Image */}
        {imageUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={image.alt ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder={blurDataURL ? "blur" : undefined}
              blurDataURL={blurDataURL ?? ""}
              quality={90}
              sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
            />
          </div>
        )}
        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col justify-end p-4 gap-1">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px] w-full text-center flex flex-col items-center gap-1">
            {displayTitle && <p className="text-lg font-bold leading-tight text-primary md:text-xl">{displayTitle}</p>}
            {excerpt && <p className="text-muted-foreground text-sm">{excerpt}</p>}
          </div>
        </div>
      </div>
    )
  }

  if (link?.href) {
    return (
      <Link
        href={link.href}
        target={link.target ? "_blank" : undefined}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}
