import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { stegaClean } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface GridFeatureCardProps {
  color:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  title: string;
  subtitle?: string;
  image?: Sanity.Image;

  description?: string;
  link?: {
    title: string;
    href: string;
    target?: boolean;
    buttonVariant?:
      | "default"
      | "secondary"
      | "link"
      | "destructive"
      | "outline"
      | "ghost"
      | null
      | undefined;
  };
  highlight?: boolean;
}

export default function GridFeatureCard({
  color,
  title,
  subtitle,
  image,

  description,
  link,
  highlight,
}: GridFeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col h-full overflow-hidden transition-all duration-300",
        "bg-background dark:bg-card border border-border/40 hover:border-primary/20",
        "rounded-xl shadow-sm hover:shadow-md",
        highlight ? "translate-y-[-4px]" : "",
        color === "primary" ? "bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20" : ""
      )}
    >
      {/* Image section with gradient overlay */}
      {image && image.asset?._id && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={urlFor(image.asset).url()}
            alt={image.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            quality={90}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 dark:from-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          

        </div>
      )}
      
      {/* Content section */}
      <div className="flex flex-col p-5 flex-grow">
        {title && (
          <h3 className="font-semibold text-xl tracking-tight mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        )}
        
        {subtitle && (
          <div className="text-muted-foreground text-sm mb-3">
            {subtitle}
          </div>
        )}
        
        {description && (
          <p className="text-foreground/80 mb-4 flex-grow">
            {description}
          </p>
        )}
        
        {/* Button aligned to bottom */}
        {link?.href && (
          <div className="mt-auto pt-3">
            <Button
              className="w-full justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              size="default"
              variant={stegaClean(link.buttonVariant) ?? "secondary"}
              asChild
            >
              <Link 
                href={link.href} 
                target={link.target ? "_blank" : undefined}
                className="flex items-center gap-2"
              >
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
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
