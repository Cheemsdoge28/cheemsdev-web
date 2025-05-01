"use client";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import SectionContainer from "@/components/ui/section-container";

type ButtonVariant =
  | "default"
  | "secondary"
  | "link"
  | "destructive"
  | "outline"
  | "ghost";

type Size = "default" | "small" | "medium" | "large";

export default function Hero4({
  tagLine,
  title,
  body,
  image,
  links,
  tags,
  padding = { top: true, bottom: true },
  colorVariant = "background",
  useGlobalTagStyle,
  globalTagVariant,
  globalTagSizeVariant,
}: Readonly<Partial<{
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
  tagLine: string;
  title: string;
  body: any;
  image: Sanity.Image;
  links: {
    title?: string;
    href?: string;
    target?: boolean;
    buttonVariant: ButtonVariant | null | undefined;
  }[];
  tags: {
    title?: string;
    href?: string;
    target?: boolean;
    buttonVariant: ButtonVariant | null | undefined;
    sizeVariant: Size | null | undefined;
  }[];
  useGlobalTagStyle?: boolean;
  globalTagVariant?: ButtonVariant;
  globalTagSizeVariant?: Size;
}>>) {
  const color = stegaClean(colorVariant);
  return (
    <SectionContainer color={color} padding={padding}>
      <div className="container dark:bg-background py-20 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            {tagLine && (
              <h1 className="leading-[0] font-sans">
                <span className="text-base font-semibold">{tagLine}</span>
              </h1>
            )}
            {title && <h2 className="mt-6 font-bold leading-[1.1]">{title}</h2>}
            {body && (
              <div className="text-lg mt-6">
                <PortableTextRenderer value={body} />
              </div>
            )}
            {tags?.length ? (
              <div className="mt-10 flex flex-wrap gap-4">
                {tags.map((tag) => {
                  const variant = stegaClean(
                    useGlobalTagStyle ? globalTagVariant ?? tag.buttonVariant : tag.buttonVariant
                  );
                  const size = stegaClean(globalTagSizeVariant ?? tag.sizeVariant);

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
              <div className="mt-10 flex flex-wrap gap-4">
                {links.map((link) => (
                  <Button
                    key={link.title ?? ""}
                    variant={stegaClean(link.buttonVariant)}
                    asChild
                  >
                    <Link
                      href={link.href ?? ""}
                      target={link.target ? "_blank" : undefined}
                      rel={link.target ? "noopener" : undefined}
                    >
                      {link.title}
                    </Link>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col justify-center">
            {image?.asset?._id && (
              <Image
                className="rounded-xl"
                src={urlFor(image.asset).url()}
                alt={image.alt ?? ""}
                width={image.asset.metadata?.dimensions?.width ?? 800}
                height={image.asset.metadata?.dimensions?.height ?? 800}
                placeholder={image.asset.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image.asset.metadata?.lqip || ""}
                quality={100}
              />
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
