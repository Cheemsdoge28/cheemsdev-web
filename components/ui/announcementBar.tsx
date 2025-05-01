"use client";
import SectionContainer from "./section-container";
import PortableTextRenderer from "../portable-text-renderer";
import { ButtonLink } from "./link";
import { usePathname } from "next/navigation";

const AnnouncementBar = ({
  body,
  CTA,
  isActive,
}: {
  body: any;
  CTA: any;
  isActive: boolean;
}) => {
  const pathname = usePathname();
  return isActive && pathname !== CTA.href ? (
    <SectionContainer color="secondary" className="py-2">
      <div className="flex w-full justify-between">
        <div className="flex flex-col text-secondary-foreground [&_div>p]:!mb-0">
          <PortableTextRenderer value={body} announcement={true} />
        </div>
        <div className="flex items-center justify-center">
          <ButtonLink href={CTA.href ?? ""} variant={CTA.buttonVariant}>
            {CTA.title}
          </ButtonLink>
        </div>
      </div>
    </SectionContainer>
  ) : null;
};

export default AnnouncementBar;
