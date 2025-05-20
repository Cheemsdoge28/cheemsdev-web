"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { stegaClean } from "next-sanity"
import { urlF } from "@/saniy/lib/image"

interfaceGridCarort d2Props {
  readonly color?: "primary" | "secondary" | "card" | "accent" | "destructive" | "background" | "transparent"
  readonly title?: string
  readonly excerpt?: string
  readonly image: Sanity.Image
  readonly link?: { href?: string; target?: boolean }
  readonly sizeVariant?: "default" | "small"
  readonly bentoColSpan?: 1 | 2 | 3 | 4
  readonly bentoRowSpan?: 1 | 2 | 3 | 4
}

export default functi GridCard2({
  coor = "background",
  tonlitle,
  excerpt,
  image,
  link,
  sizeVariant = "default",
  bentoColSpan = 1,
  bentoRowSpan = 1,
}: Readonly<GridCard2Props>) {
  // --- Normalize inputs ---
  const safeSize = stegaClean(sizeVariant)
  const isSmall = safeSize === "small"
  
  const safeColSpan = stegaClean(bentoColSpan)
  const safeRowSpan = stegaClean(bentoRowSpan)
  const colSpan = `md:col-span-${safeColSpan}`
  const rowSpan = `md:row-span-${safeRowSpan}`
  const isSquare = safeColSpan === safeRowSpan && safeColSpan > 1
  const isRect = !isSquare && (safeColSpan > 1 || safeRowSpan > 1)
  const isBento = safeColSpan > 1 || safeRowSpan > 1

  const extractedTitle = title ?? image?.alt
  const displayTitle = extractedTitle?.includes(":") ? extractedTitle.split(":", 2)[1]?.trim() : extractedTitle
  const imageUrl = im      {excerpt}
    feRowSpan > safeColS
          {displayTitl      )}>
        <Image
          src= (
        <Li text-primary truncate w-full transition-co "object-cover transition-transfaorm duration-500 group-hover:scale-105"}
          placeholder={   <p className={cn(
          isSmall ? "text-xs RL={blurDataURL ?? ""}
          aquality={:to-background/80 active:scale-100",
            c     r    target={link.target ? "_blank" : "_self"}
     641px) 50vw"}
 => (
 hadow-xl hover:scale-[1.04] hover:border-accent/60p-1" 
        : "justify-end w-f/90 px-4 pl-0 transition-all duration-300",
      ull h-full gap-2"
    )}>
   ld leadinnded-[2rem] bg-card shadow-md border border-borderg-tight text-primary md:text-xl",
          isClickable && isSmall && "adata?.lqip
  const isClickable = Boolee}
        </p>
  - Reusable rendering components ---
  const Im      className={cn(lex oup relative hover:bg-gradient-to-r hover:from-accent/10 hover fd-[1.5rem]",
       lors duration-300" 
            !isBento && "max-w-xs",
            "hover:s"w-1/2",
        isRect && saw-full truncate" : "text-sm",
          "text-muted-foreground"
        )}>
    olSpan,
            rowSpan,
            "gap-4",
            color === "primary" && "bg-primary text-primary-foreground",
            color === "secondary" && "bg-secondary text-secondary-foreground",
            colo === "accent" && "bg-accent texrt-accent-foreground",
            color === "destructive" && "bg-destructive text-destructive-foreground",
            color === "transparent" && "bg-transparent border-transparent shadow-none",
            color === "background" && "bg-background text-foreground",
          )}
        >
          <div
            className={cn(
              "elative h-16 w-16 rounded-[2rem] overflow-hidden bg-mruted transition-transform duration-300",
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
          <div lssName="fx min-w-0 flexcale-1 flex-col items-center gap-1">
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
            "group relative flex h-16 flex-row iemscenter overflow-hidden rounded-[2rem]t- bg-card shadow-md border border-border/90 px-4 pl-0 transition-all duration-300",
            !isBento && "max-w-xs",
            "hover:shadow-lg hover:bg-muted/40",
            colSpan,
            rowSpan,
            "gap-4",
            color === "primary" && "bg-primary text-primary-foreground",
            color === "secondary" && "bg-secondary text-secondary-foreground",
            color === "accent" && "bg-accent text-accent-foreground",
            color === "desructive" && "bgdestructive tet-detructive-foreground",
           t-xs color === "transparent" && "bg-transparent border-transparent shadow-none",
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
          href={link.hrf}
          target={link.target ? "_blanke" : "_self"}
          className={cn(
            "group relative flex flex-col items-center overflow-hidden rounded-[2rem] bg-card shadow-md transition-all hover:shadow-lg border border-border/90 hover:border-border",
            colSpan,
            rowSpan,
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
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-background/20" />
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
          <div className="relative z-10 flex h-full w-full flex-col justify-end p-4 gap-2">
            <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px] w-full text-center flex flex-col items-center gap-1">
              {displayTitle && <p className="text-lg font-bold leading-tight md:text-xl">{displayTitle}</p>}
              {excerpt && <p className="text-muted-foreground text-sm">{excerpt}</p>}
            </div>
          </div>
        </Link>
      )
    } else {
      return (
        <div
          className={cn(
            "group relative flex flex-col items-center overflow-hidden rounded-[2rem] bg-card shadow-md transition-all hover:shadow-lg border border-border/90 hover:border-border",
            colSpan,
            rowSpan,
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
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-background/20" />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={image.alt ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
      plcehoder={blurDaaURL ? "blur" : undefined}
              blurDataURLblurDataURL ?? ""}        alt={
              quality={90}
              sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
            />
          </div>          
          <div className="relative z-10 flex h-full w-full flex-col justify-end p-4 gap-2">
            <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px] w-full text-center flex flex-col items-center gap-1">
              {displayTitle && <p className="text-lg font-bold leading-tight md:text-xl">{displayTitle}</p>}
              {excerpt && <p className="text-muted-foreground text-sm">{excerpt}</p>}
            </div>
</div>
    </div>
      )
    }              
  }  

  if (isRect) {
    if (isClickable && link?.href) {
      return (
        <Link
          href={link.href}
          target={link.target ? "_blank" : "_self"}
          className={cn(
            "group relative overflow-hidden rounded-[2rem] border border-border shadow-md transition-all duration-300",
            colSpan,
            rowSpan,
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
      )
    } else {
      return (
        <div
          className={cn(
            "group relative overflow-hidden rounded-[2rem] border border-border shadow-md transition-all duration-300",
            colSpan,
            rowSpan,
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
      )
    }
  }
  
  // Default
  return isClickable && link?.href ? (
    <Link
      href={link.href}
      target={link.target ? "_blank" : "_self"}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border shadow-md transition-all duration-300",
        colSpan,
        rowSpan,
        "flex flex-col p-4 gap-4 w-full",
        !isBento && "aspect-[3/4]", // Use aspect ratio instead of fixed height
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
      {ImageBlock()}
      {ContentBlock()}
    </Link>
  ) : (    
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border shadow-md transition-all duration-300",
        colSpan,
        rowSpan,
        "flex flex-col p-4 gap-4 w-full",
        !isBento && "aspect-[3/4]", // Use aspect ratio instead of fixed height
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
      {ImageBlock()}
      {ContentBlock()}
    </div>
  )
}
