import Hero1 from "@/components/ui/hero/hero-1";
import Hero2 from "@/components/ui/hero/hero-2";
import Hero5 from "./ui/hero/hero-5";
import Hero4 from "@/components/ui/hero/hero-4";
import SectionHeader from "@/components/ui/section-header";
import SplitRow from "@/components/ui/split/split-row";
import GridRow from "@/components/ui/grid/grid-row";
import GridCard2 from "@/components/ui/grid/grid-card-2";
import GridFeatureCard from "@/components/ui/grid/grid-feature-card";
import TabSection from "./ui/tab-section/tab-section";
import Carousel1 from "@/components/ui/carousel/carousel-1";
import Carousel2 from "@/components/ui/carousel/carousel-2";
import Carousel3 from "@/components/ui/carousel/carousel-3";
import TimelineRow from "@/components/ui/timeline/timeline-row";
import Cta1 from "@/components/ui/cta/cta-1";
import LogoCloud1 from "@/components/ui/logo-cloud/logo-cloud-1";
import FAQs from "@/components/ui/faqs";
import FormNewsletter from "@/components/ui/forms/newsletter";
import FormContact from "./ui/forms/contact";
import AllPosts from "@/components/ui/all-posts";
import AllProducts from "./ui/all-products";
import HeroHotspot from "./ui/hero/heroHotspot";
import TextBlock from "./ui/textBlock";
import ClientReveal from "./client-reveal";


const componentMap: { [key: string]: React.ComponentType<any> } = {
  "hero-1": Hero1,
  "hero-2": Hero2,
  "hero-4": Hero4,
  "hero-5": Hero5,
  "section-header": SectionHeader,
  "split-row": SplitRow,
  "grid-row": GridRow,
  "tab-section": TabSection,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "carousel-3": Carousel3,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "logo-cloud-1": LogoCloud1,
  faqs: FAQs,
  "form-newsletter": FormNewsletter,
  "form-contact": FormContact,
  "all-posts": AllPosts,
  "all-products": AllProducts,
  "hero-hotspot": HeroHotspot,
  textBlock: TextBlock,
  "grid-feature-card": GridFeatureCard,
  "grid-card-2": GridCard2,
};


export default function Blocks({ blocks }: { readonly blocks?: ReadonlyArray<Sanity.Block> }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block: Sanity.Block, i) => {
        const Component = componentMap[block._type];
        
        if (!Component) {
          // Fallback for unknown block types to debug
          return <div data-type={block._type} key={block._key} />;
        }

        // Wrap each component in ClientReveal for animations
        // while keeping the actual component rendering server-side
        return (
          <ClientReveal key={`${block._key}-${i}`} index={i}>
            <Component {...block} />
          </ClientReveal>
        );
      })}
    </>
  );
}
