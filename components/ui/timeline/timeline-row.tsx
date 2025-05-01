import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import Timeline1, { Timeline1Props } from "@/components/ui/timeline/timeline-1";

export default function TimelineRow({
  padding,
  colorVariant,
  timelines,
  isAcronym = false, 
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer["color"];
  timelines: Timeline1Props[];
  isAcronym: boolean; 
}>) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      {timelines && timelines?.length > 0 && (
        <div className="max-w-[48rem] px-4 md:px-16 lg:px-24">
          {timelines?.map((timeline, index) => (
            <Timeline1
              key={index}
              color={color}
              tagLine={timeline.tagLine}
              title={timeline.title}
              body={timeline.body}
              isAcronym={isAcronym} // Add isAcronym prop to Timeline1 component
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
