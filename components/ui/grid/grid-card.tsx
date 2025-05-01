import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface GridCardProps {
  readonly color:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  readonly title: string;
  readonly excerpt: string;
  readonly image: Sanity.Image;
  readonly link: {
    readonly title: string;
    readonly href: string | null | undefined;
    readonly target?: boolean;
    readonly buttonVariant:
      | "default"
      | "secondary"
      | "link"
      | "destructive"
      | "outline"
      | "ghost"
      | null
      | undefined;
  };
}

export default function GridCard({
  color,
  title,
  excerpt,
  image,
  link,
}: GridCardProps) {
  if (!link?.href) {
    return (
      <div
        className={cn(
          "group relative flex h-full flex-col justify-between overflow-hidden",
          "bg-background dark:bg-card border border-border/40 hover:border-primary/20",
          "rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
          color === "primary" ? "bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20" : ""
        )}
      >
        <div className="flex flex-col h-full">
          {image && image.asset?._id && (
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={urlFor(image.asset).url()}
                alt={image.alt ?? ""}
                placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image?.asset?.metadata?.lqip ?? ""}
                fill
                sizes="(min-width: 1024px) 100vw, (min-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 dark:from-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}
          <div className="flex flex-col p-5 flex-grow">
            {title && (
              <h3 className="font-semibold text-xl tracking-tight mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
            )}
            {excerpt && <p className="text-foreground/80 mb-4 flex-grow">{excerpt}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      key={title}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      href={link.href ?? "#"}
      target={link.target ? "_blank" : undefined}
    >
      <div
        className={cn(
          "relative flex h-full flex-col justify-between overflow-hidden",
          "bg-background dark:bg-card border border-border/40 hover:border-primary/20",
          "rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
          "hover:translate-y-[-4px]",
          color === "primary" ? "bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20" : ""
        )}
      >
        <div className="flex flex-col h-full">
          {image && image.asset?._id && (
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={urlFor(image.asset).url()}
                alt={image.alt ?? ""}
                placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || ""}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 dark:from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}
          <div className="flex flex-col p-5 flex-grow">
            {title && (
              <h3 className="font-semibold text-xl tracking-tight mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
            )}
            {excerpt && <p className="text-foreground/80 mb-4 flex-grow">{excerpt}</p>}

            <div className="mt-auto pt-3">
              <Button
                className="w-full justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                size="default"
                variant={stegaClean(link.buttonVariant)}
                asChild
              >
                <div className="flex items-center gap-2">
                  <span>{link.title}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
