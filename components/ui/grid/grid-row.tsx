import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
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
    (Sanity.Block & {
      bentoColSpan?: 1 | 2 | 3 | 4;
      bentoRowSpan?: 1 | 2 | 3 | 4;
    })
  >;
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  "grid-card": GridCard,
  "grid-card-2": GridCard2,
  "pricing-card": PricingCard,
  "grid-post": GridPost,
  "grid-feature-card": GridFeatureCard,
  product: ProductCard,
};

function validateSpan(span: number | undefined): 1 | 2 | 3 | 4 {
  if (!span || span < 1) return 1;
  if (span > 4) return 4;
  return span as 1 | 2 | 3 | 4;
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
      {columns?.length ? (        <div
          className={cn(
            "mx-auto grid w-full max-w-7xl",
            "grid-cols-1 md:grid-cols-4 gap-4",
            "md:grid-flow-dense auto-rows-[minmax(200px,auto)]"
          )}
        >
          {columns.map((block) => {
            const Component = componentMap[block._type];
            if (!Component) {
              return <div key={block._key} data-type={block._type} />;
            }            const colSpan = validateSpan(block.bentoColSpan);
            const rowSpan = validateSpan(block.bentoRowSpan);
            
            // Use proper tailwind classes based on span values
            const colSpanClass = 
              colSpan === 1 ? "md:col-span-1" :
              colSpan === 2 ? "md:col-span-2" :
              colSpan === 3 ? "md:col-span-3" :
              "md:col-span-4";
              
            const rowSpanClass = 
              rowSpan === 1 ? "md:row-span-1" :
              rowSpan === 2 ? "md:row-span-2" :
              rowSpan === 3 ? "md:row-span-3" :
              "md:row-span-4";
              
            return (
              <div
                key={block._key}
                className={cn(
                  "h-full w-full", // Make sure it fills the entire grid cell
                  colSpanClass,
                  rowSpanClass
                )}
              >
                <Component {...block} color={color} bentoColSpan={colSpan} bentoRowSpan={rowSpan} />
              </div>
            );
          })}
        </div>
      ) : null}
    </SectionContainer>
  );
}