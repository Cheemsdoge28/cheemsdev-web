import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
// import only the components you need
import GridCard from "./grid-card";
import GridCard2 from "./grid-card-2";
import PricingCard from "./pricing-card";
import GridPost from "./grid-post";
import ProductCard from "../product-card";
import GridFeatureCard from "./grid-feature-card";

interface Grid1Props {
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
  columns: Array<
    (Sanity.Block & { bentoVariant?: "none" | "bento-3" | "bento-2" | "bento-1" })
  >;
}

// map all components you need
const componentMap: { [key: string]: React.ComponentType<any> } = {
  "grid-card": GridCard,
  "grid-card-2": GridCard2,
  "pricing-card": PricingCard,
  "grid-post": GridPost,
  "grid-feature-card": GridFeatureCard,
  product: ProductCard,
};

// Type guard for grid-card-2
function isGridCard2(block: any): block is { bentoVariant?: string } {
  return block && block._type === "grid-card-2";
}

export default function GridRow({
  padding,
  colorVariant,
  gridColumns,
  columns,
}: Readonly<Partial<Grid1Props>>) {
  const color = stegaClean(colorVariant);
  return (
    <SectionContainer color={color} padding={padding}>
      {columns && columns?.length > 0 && (
        <div
          key={`grid-row-${columns.map((col) => col._key).join("-")}`}
          className={cn(
            // Use bento-style grid with flexible row heights
            "mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 auto-rows-[minmax(2rem,auto)] md:auto-rows-[minmax(2rem,auto)] md:grid-cols-3"
          )}
        >
          {columns.map((block: Sanity.Block) => {
            const Component = componentMap[block._type];
            if (!Component) {
              // Fallback for unknown block types to debug
              return <div data-type={block._type} key={block._key} />;
            }
            // Pass bentoVariant to grid-card-2 if present
            if (isGridCard2(block)) {
              return (
                <Component
                  {...block}
                  color={color}
                  bentoVariant={block.bentoVariant}
                  key={block._key}
                />
              );
            }
            return <Component {...block} color={color} key={block._key} />;
          })}
        </div>
      )}
    </SectionContainer>
  );
}
