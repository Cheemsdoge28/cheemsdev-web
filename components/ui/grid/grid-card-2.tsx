"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { stegaClean } from "next-sanity"
import { urlFor } from "@/sanity/lib/image";

interface GridCard2Props {
  readonly color?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent"
  readonly title?: string
  readonly excerpt?: string
  readonly image: Sanity.Image
  readonly link?: { href?: string; target?: boolean }
  readonly sizeVariant?: "default" | "small"
  readonly bentoColSpan?: 1 | 2 | 3 | 4
  readonly bentoRowSpan?: 1 | 2 | 3 | 4
}

export default function GridCard2({
  color = "background",
  title,
  excerpt,
  image,
  link,
  sizeVariant = "default",
  bentoColSpan = 1,
  bentoRowSpan = 1,
}: Readonly<GridCard2Props>) {  // --- Normalize inputs ---
  const safeSize = stegaClean(sizeVariant)
  const isSmall = safeSize === "small"
  const safeColSpan = stegaClean(bentoColSpan)
  const safeRowSpan = stegaClean(bentoRowSpan)
  // Remove references to the old colSpan/rowSpan tailwind classes
  // These are now handled by the parent GridRow component
  const isSquare = safeColSpan === safeRowSpan && safeColSpan > 1
  const isRect = !isSquare && (safeColSpan > 1 || safeRowSpan > 1)
  const isBento = safeColSpan > 1 || safeRowSpan > 1
  const extractedTitle = title ?? image?.alt ?? ""
  const displayTitle = extractedTitle?.includes(":") ? extractedTitle.split(":", 2)[1]?.trim() : extractedTitle
  const imageUrl = image?.asset?._id ? urlFor(image.asset).url() : ""
  const blurDataURL = image?.asset?.metadata?.lqip
  const isClickable = Boolean(link?.href)

  // Only use Link when href is defined, otherwise use div
  const Wrapper = isClickable && link?.href ? Link : "div"
  const wrapperProps =
    isClickable && link?.href && typeof link.href === "string"
      ? { href: link.href, target: link.target ? "_blank" : "_self" }
      : {}
  // --- Reusable rendering components ---  
  const ImageBlock = () =>
    imageUrl && (
      <div className={cn(
        "relative overflow-hidden flex-shrink-0 rounded-[1.5rem]",
        isSmall && "h-16 w-16 rounded-[2rem]",
        isRect && safeColSpan > safeRowSpan && "w-1/2",
        isRect && safeRowSpan > safeColSpan && "w-full aspect-[3/2]",
        !isRect && !isSmall && "w-full aspect-[4/3]",
        "h-full" // Ensure image block fills parent height
      )}>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={image.alt ?? ""}
          fill
          className={isSmall ? "object-contain" : "object-cover transition-transform duration-500 group-hover:scale-105"}
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL ?? ""}
          quality={90}
          sizes={
            isSmall 
              ? "48px" 
              : isBento
                ? `(max-width: 640px) 100vw, (min-width: 641px) ${safeColSpan * 25}vw`
                : "(max-width: 640px) 100vw, (min-width: 641px) 25vw"
          }
        />
      </div>
    )

  const ContentBlock = () => (
    <div className={cn(
      "flex flex-col",
      isSmall 
        ? "flex-1 min-w-0 items-center text-center px-2 gap-1" 
        : "justify-end w-full h-full gap-2"
    )}>
      {displayTitle && (
        <p className={cn(
          isSmall
            ? "text-xl font-bold leading-tight text-primary text-center truncate w-full transition-colors duration-300" 
            : "text-lg font-bold leading-tight text-primary text-center  md:text-xl",
          isClickable && isSmall && "group-hover:text-accent-foreground"
        )}>
          {displayTitle}
        </p>
      )}
      {excerpt && (
        <p className={cn(
          isSmall ? "text-xs text-center w-full truncate" : "text-sm text-center",
          "text-muted-foreground"
        )}>
          {excerpt}
        </p>
      )}
    </div>
  )

  if (isSmall) {    
    if (isClickable && link?.href) {
      return (
        <Link
          href={link.href}
          target={link.target ? "_blank" : "_self"}
          className={cn(
            "group relative flex flex-row items-center overflow-hidden rounded-[2rem]   shadow-md border border-border/90 px-4 pl-0 transition-all duration-300",
            !isBento && "max-w-xs",
            "hover:shadow-xl hover:scale-[1.04] hover:border-accent/60 hover:bg-gradient-to-r hover:from-accent/10 hover:to-background/80 active:scale-100",
            "h-full w-full", // Ensure it fills the entire grid cell
            "gap-4",
            color === "primary" && "bg-primary text-primary-foreground",
            color === "secondary" && "bg-secondary text-secondary-foreground",
            color === "accent" && "bg-accent text-accent-foreground",
            color === "destructive" && "bg-destructive text-destructive-foreground",
            color === "transparent" && "bg-transparent border-transparent shadow-none",
            color === "background" && "bg-background text-foreground",
          )}
        >
          <div
            className={cn(
              "relative h-16 w-16 rounded-[2rem] overflow-hidden bg-muted transition-transform duration-300",
              "group-hover:scale-110 group-hover:shadow-accent/20",
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
          <div className="flex-1 min-w-0 flex flex-col items-center gap-1">
            {displayTitle && (
              <p
                className={cn(
                  "text-xl font-bold leading-tight text-primary truncate text-center w-full transition-colors duration-300",
                  "group-hover:text-accent-foreground",
                )}
              >
                {displayTitle}
              </p>
            )}
            {excerpt && <p className="text-muted-foreground text-xs w-full truncate text-center">{excerpt}</p>}
          </div>
        </Link>
      )
    } else {
      return (
        <div
          className={cn(
            "group relative flex h-16 flex-row items-center overflow-hidden rounded-[2rem]   shadow-md border border-border/90 px-4 pl-0 transition-all duration-300",
            !isBento && "max-w-xs",            
            "hover:shadow-lg hover:bg-muted/40",
            "gap-4",
            color === "primary" && "bg-primary text-primary-foreground",
            color === "secondary" && "bg-secondary text-secondary-foreground",
            color === "accent" && "bg-accent text-accent-foreground",
            color === "destructive" && "bg-destructive text-destructive-foreground",
            color === "transparent" && "bg-transparent border-transparent shadow-none",
            color === "background" && "bg-background text-foreground",
          )}
        >
          <div
            className={cn(
              "relative h-16 w-16 rounded-[2rem] overflow-hidden bg-muted transition-transform duration-300",
              "group-hover:scale-105",
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
          <div className="flex-1 min-w-0 flex flex-col items-center gap-1">
            {displayTitle && (
              <p
                className={cn(
                  "text-xl font-bold leading-tight text-primary truncate text-center w-full transition-colors duration-300",
                )}
              >
                {displayTitle}
              </p>
            )}
            {excerpt && <p className="text-muted-foreground text-xs w-full truncate text-center">{excerpt}</p>}
          </div>
        </div>
      )
    }
  }

  if (isSquare) {
    if (isClickable && link?.href) {
      return (        
        <Link
          href={link.href}
          target={link.target ? "_blank" : "_self"}
          className={cn(
            "group relative flex flex-col gap-4 items-center justify-center overflow-hidden rounded-[2rem]   shadow-md transition-all hover:shadow-lg border border-border/90 hover:border-border",
            "h-full w-full",
            "aspect-square",
            color === "primary" && "bg-primary text-primary-foreground",
            color === "secondary" && "bg-secondary text-secondary-foreground",
            color === "accent" && "bg-accent text-accent-foreground",
            color === "destructive" && "bg-destructive text-destructive-foreground",
            color === "transparent" && "bg-transparent border-transparent shadow-none",
            color === "background" && "bg-background text-foreground",
            isClickable && "hover:scale-[1.02] hover:border-accent/40",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-background/20 z-0" />
          <div className="absolute inset-0 overflow-hidden z-0">
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
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 gap-2">
            {ContentBlock()}
          </div>
        </Link>
      )
    } else {      
      return (
        <div
          className={cn(
            "group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem]   shadow-md transition-all hover:shadow-lg border border-border/90 hover:border-border",
            "h-full w-full",
            "aspect-square",
            color === "primary" && "bg-primary text-primary-foreground",
            color === "secondary" && "bg-secondary text-secondary-foreground",
            color === "accent" && "bg-accent text-accent-foreground",
            color === "destructive" && "bg-destructive text-destructive-foreground",
            color === "transparent" && "bg-transparent border-transparent shadow-none",
            color === "background" && "bg-background text-foreground",
            isClickable && "hover:scale-[1.02] hover:border-accent/40",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-background/20 z-0" />
          <div className="absolute inset-0 overflow-hidden z-0">
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
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 gap-2">
            {ContentBlock()}
          </div>
        </div>
      )
    }
  }  
  if (isRect) {
    return (
      <>
        {Wrapper === Link ? (
          <Link            
            {...(wrapperProps as { href: string; target: string })}
            className={cn(
              "group relative overflow-hidden rounded-[2rem] border border-border shadow-md transition-all duration-300",
              "h-full w-full",
              "flex p-4 gap-4",
              safeColSpan > safeRowSpan ? "flex-row" : "flex-col",
              safeColSpan !== safeRowSpan && "aspect-[4/3]", // Use aspect ratio instead of fixed dimensions
              color === "primary" && "bg-primary text-primary-foreground",
              color === "secondary" && "bg-secondary text-secondary-foreground",
              color === "accent" && "bg-accent text-accent-foreground",
              color === "destructive" && "bg-destructive text-destructive-foreground",
              color === "transparent" && "bg-transparent border-none shadow-none",
              color === "background" && "bg-background text-foreground",
              isClickable
                ? "hover:shadow-xl hover:scale-[1.04] hover:border-accent/60 hover:bg-gradient-to-r hover:from-accent/10 hover:to-background/80"
                : "hover:shadow-lg hover:bg-muted/40",
            )}
          >
            <div className="flex-1 h-full">{ImageBlock()}</div>
            <div className="flex-1 h-full">{ContentBlock()}</div>
          </Link>
        ) : (
          <div            
            className={cn(
              "group relative overflow-hidden rounded-[2rem] border border-border shadow-md transition-all duration-300",
              "h-full w-full",
              "flex p-4 gap-4",
              safeColSpan > safeRowSpan ? "flex-row" : "flex-col",
              safeColSpan !== safeRowSpan && "aspect-[4/3]", // Use aspect ratio instead of fixed dimensions
              color === "primary" && "bg-primary text-primary-foreground",
              color === "secondary" && "bg-secondary text-secondary-foreground",
              color === "accent" && "bg-accent text-accent-foreground",
              color === "destructive" && "bg-destructive text-destructive-foreground",
              color === "transparent" && "bg-transparent border-none shadow-none",
              color === "background" && "bg-background text-foreground",
              isClickable
                ? "hover:shadow-xl hover:scale-[1.04] hover:border-accent/60 hover:bg-gradient-to-r hover:from-accent/10 hover:to-background/80"
                : "hover:shadow-lg hover:bg-muted/40",
            )}
          >
            <div className="flex-1 h-full">{ImageBlock()}</div>
            <div className="flex-1 h-full">{ContentBlock()}</div>
          </div>
        )}
      </>
    )
  }
  // 1x1 default (not small, not bento)
  if (!isSmall && !isBento && safeColSpan === 1 && safeRowSpan === 1) {
    return (
      <div
        className={cn(
          "group p-4 gap-4 relative flex flex-col items-center justify-end rounded-[2rem]   shadow-md transition-all hover:shadow-lg border border-border/90 hover:border-border",
          "h-80 w-60 md:w-72 md:h-80"
        )}
      >
        {/* Image (flex, not absolute) */}
        {imageUrl && (
          <div className="flex-shrink-0 overflow-visible w-full h-2/3 relative">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={image.alt ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-[2rem]"
              placeholder={blurDataURL ? "blur" : undefined}
              blurDataURL={blurDataURL ?? ""}
              quality={90}
              sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
              style={{ zIndex: 0 }}
            />
          </div>
        )}
        {/* Content (flex, not absolute) */}
        <div className="flex flex-col items-center justify-end w-full h-1/3 gap-1 z-10 bg-gradient-to-t from-background/80 to-background/10">
          <div className="w-full text-center flex flex-col items-center gap-1">
            {displayTitle && <p className="text-lg font-bold leading-tight text-primary md:text-xl">{displayTitle}</p>}
            {excerpt && <p className="text-muted-foreground text-sm">{excerpt}</p>}
          </div>
        </div>
      </div>
    )
  }
  // Default  
  return isClickable && link?.href ? (
    <Link
      href={link.href}
      target={link.target ? "_blank" : "_self"}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border shadow-md transition-all duration-300",
        "h-full w-full",
        "flex flex-col items-center justify-center p-4 gap-2",
        !isBento && "aspect-[3/4]",
        color === "primary" && "bg-primary text-primary-foreground",
        color === "secondary" && "bg-secondary text-secondary-foreground",
        color === "accent" && "bg-accent text-accent-foreground",
        color === "destructive" && "bg-destructive text-destructive-foreground",
        color === "transparent" && "bg-transparent border-none shadow-none",
        color === "background" && "bg-background text-foreground",
        isClickable
          ? "hover:shadow-xl hover:scale-[1.04] hover:border-accent/60 hover:bg-gradient-to-r hover:from-accent/10 hover:to-background/80"
          : "hover:shadow-lg hover:bg-muted/40",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/30 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {ImageBlock()}
        {ContentBlock()}
      </div>
    </Link>
  ) : (    
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border shadow-md transition-all duration-300",
        "h-full w-full",
        "flex flex-col items-center justify-center p-4 gap-2",
        !isBento && "aspect-[3/4]",
        color === "primary" && "bg-primary text-primary-foreground",
        color === "secondary" && "bg-secondary text-secondary-foreground",
        color === "accent" && "bg-accent text-accent-foreground",
        color === "destructive" && "bg-destructive text-destructive-foreground",
        color === "transparent" && "bg-transparent border-none shadow-none",
        color === "background" && "bg-background text-foreground",
        isClickable
          ? "hover:shadow-xl hover:scale-[1.04] hover:border-accent/60 hover:bg-gradient-to-r hover:from-accent/10 hover:to-background/80"
          : "hover:shadow-lg hover:bg-muted/40",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/30 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {ImageBlock()}
        {ContentBlock()}
      </div>
    </div>
  )
}
