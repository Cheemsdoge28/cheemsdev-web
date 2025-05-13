"use client";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ButtonLink } from "@/components/ui/link";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import SectionContainer from "../section-container";
import { BackgroundBeams1, BackgroundBeams2 } from "../background-beams";

type ButtonVariant =
  | "default"
  | "secondary"
  | "link"
  | "destructive"
  | "outline"
  | "ghost";

type Size = "default" | "small" | "medium" | "large";

export default function Hero5({
  tagLine,
  renderedTitle,
  body,
  image,
  links,
  tags,
  padding = { top: true, bottom: true },
  colorVariant = "background",
  textAlign = "left",
  heightVariant = "default",
  decoration = "none",
  useGlobalTagStyle,
  globalTagVariant,
  globalTagSizeVariant,
}: Readonly<{
  padding?: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant?:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  heightVariant: "default" | "screen" | "small";
  textAlign?:
    | "left"
    | "center"
    | "right"
    | "topleft"
    | "topright"
    | "bottomleft"
    | "bottomright";
  decoration?: "none" | "background-beams-1" | "background-beams-2";
  tagLine?: string;
  renderedTitle?: any; 
  body?: any;
  image?: Sanity.Image;
  links?: {
    title?: string;
    href?: string;
    target?: boolean;
    buttonVariant: ButtonVariant | null | undefined;
    
  }[];
  tags?: {
    title?: string;
    href?: string;
    target?: boolean;
    buttonVariant: ButtonVariant | null | undefined;
    sizeVariant: Size | null | undefined;
  }[];
  useGlobalTagStyle?: boolean;
  globalTagVariant?: ButtonVariant;
  globalTagSizeVariant?: Size;
}>) {
  const imageUrl = image?.asset?._id ? urlFor(image.asset).url() : null;
  const color = stegaClean(colorVariant);
  const textBlockAlign = stegaClean(textAlign);

  const heightVariants = {
    default: "h-[80vh]",
    small: "h-[40vh]",
    screen: "h-screen",
  };
  
  const height = heightVariants[stegaClean(heightVariant) || "default"];

  const alignmentClasses = {
    left: "items-center justify-start text-left",
    center: "items-center justify-center text-center",
    right: "items-center justify-end text-right",
    topleft: "items-start justify-start text-left",
    topright: "items-start justify-end text-right",
    bottomleft: "items-end justify-start text-left",
    bottomright: "items-end justify-end text-right",
  };

  const gradientDirections = {
    left: "bg-gradient-to-r from-background/90 via-background/75 to-transparent",
    center: "bg-gradient-to-t from-background/95 via-background/80 to-background/70",
    right: "bg-gradient-to-l from-background/90 via-background/75 to-transparent",
    topleft: "bg-gradient-to-br from-background/90 via-background/80 to-transparent",
    topright: "bg-gradient-to-bl from-background/90 via-background/80 to-transparent",
    bottomleft: "bg-gradient-to-tr from-background/90 via-background/80 to-transparent",
    bottomright: "bg-gradient-to-tl from-background/90 via-background/80 to-transparent",
  };

  const alignment = alignmentClasses[textBlockAlign] ?? alignmentClasses.left;
  const gradient =
    gradientDirections[textBlockAlign] ?? gradientDirections.left;

  const decorationType = stegaClean(decoration);

  return (
    <SectionContainer className="px-0" isContainer={false} color={color} padding={padding}>
      <div className={`relative w-full ${height} overflow-hidden`}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={image?.alt ?? ""}
            fill
            className="object-cover"
            placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image?.asset?.metadata?.lqip ?? ""}
            quality={100}
            priority
          />
        )}

        <div className={`absolute inset-0 z-10 ${gradient}`} />

        <div className={`relative z-20 flex h-full px-4 md:px-16 lg:px-24 ${alignment}`}>
          <div className="text-primary max-w-4xl flex flex-col gap-y-6 animate-fade-up">
            {tagLine && (
              <h3 className="text-xl font-sans font-semibold">
                {tagLine}
              </h3>
            )}

            {renderedTitle && (
              <h1 className="font-bold leading-[1.1]">
                <PortableTextRenderer value={renderedTitle} />
              </h1>
            )}

            <div className="text-lg">
              <PortableTextRenderer value={body} />
            </div>

            {tags?.length ? (
              <div className={`flex flex-wrap gap-4 ${alignment}`}>
                {tags.map((tag) => {
                  const variant = stegaClean(
                    useGlobalTagStyle
                      ? (globalTagVariant ?? tag.buttonVariant)
                      : tag.buttonVariant
                  );
                  const size = stegaClean(
                    globalTagSizeVariant ?? tag.sizeVariant
                  );

                  return tag.href ? (
                    <Tag
                      key={tag.title ?? ""}
                      variant={variant}
                      size={size}
                      asChild
                    >
                      <Link
                        href={tag.href}
                        target={tag.target ? "_blank" : undefined}
                        rel={tag.target ? "noopener" : undefined}
                      >
                        {tag.title}
                      </Link>
                    </Tag>
                  ) : (
                    <Tag 
                      key={tag.title ?? ""} 
                      variant={variant} 
                      size={size}
                    >
                      {tag.title}
                    </Tag>
                  );
                })}
              </div>
            ) : null}

            {links?.length ? (
              <div className={`flex flex-wrap gap-4 ${alignment}`}>
                {links.map((link) => (
                  <ButtonLink
                    key={link.title ?? ""}
                    href={link.href ?? ""}
                    variant={stegaClean(link.buttonVariant)}
                    size="lg"
                    target={link.target ? "_blank" : undefined}
                    rel={link.target ? "noopener" : undefined}
                  >
                    {link.title}
                  </ButtonLink>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {decorationType === "background-beams-1" && <BackgroundBeams1 />}
        {decorationType === "background-beams-2" && <BackgroundBeams2 />}
      </div>
    </SectionContainer>
  );
}
