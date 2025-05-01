import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PortableTextRenderer from "@/components/portable-text-renderer";

interface FAQProps {
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
  title: string;
  faqs: {
    _id: string;
    title: string;
    body: any;
  }[];
}

export default function FAQs({
  padding,
  colorVariant,
  faqs,
}: Readonly<Partial<FAQProps>>) {
  const color = stegaClean(colorVariant);
  return (
    <SectionContainer color={color} padding={padding}>
      {faqs && faqs?.length > 0 && (
        <Accordion className="space-y-4" type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem key={`${faq._id ?? ""}-${index}`} value={`item-${index}`}>
              <AccordionTrigger>
                {index + 1}. {faq.title ?? ""}
              </AccordionTrigger>
              <AccordionContent>
                <PortableTextRenderer value={faq.body} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </SectionContainer>
  );
}
