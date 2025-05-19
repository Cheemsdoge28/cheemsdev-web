"use client";

import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import { useState } from "react";

// import only the components you need
import GridCard from "../grid/grid-card";
import PricingCard from "../grid/pricing-card";
import GridPost from "../grid/grid-post";
import ProductCard from "../product-card";

interface TabSectionProps {
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
  gridColumns: "grid-cols-2" | "grid-cols-3" | "grid-cols-4";
  columns: Sanity.Block[];
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  "grid-card": GridCard,
  "pricing-card": PricingCard,
  "grid-post": GridPost,
  product: ProductCard,
};

export default function TabSection({
  padding,
  colorVariant,
  columns,
}: Readonly<Partial<TabSectionProps>>) {
  const color = stegaClean(colorVariant);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(id);
    }
  };

  return (
    <SectionContainer color={color} padding={padding}>
      {columns && columns.length > 0 && (
        <div key={`grid-row-1-${columns.map((col) => col._key).join("-") || "default-1"}`} className="mb-6 flex flex-wrap gap-2 border-b border-muted pb-2">
          {columns.map((block) => {
            const label = block._type || "Tab";
            const id = `section-${block._type}-${columns.map((col) => col._key).join("-") || "default-section-1"}`;
            return (
              <button
                key={`tab-${id}`}
                onClick={() => scrollTo(id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all",
                  activeTab === id
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {label.replace("-", " ")}
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-12">
        {columns?.map((block) => {
          const Component = componentMap[block._type];
          if (!Component) {
        return (
          <div
            id={`section-${block._key}`}
            key={block._key}
            className="text-red-500"
          >
            Unknown component: {block._type}
          </div>
        );
          }
          return (
        <div id={`section-${block._key}`} key={block._key}>
          <Component {...block} color={color} />
        </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
