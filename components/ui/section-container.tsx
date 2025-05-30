import { cn } from "@/lib/utils";

export const DEFAULT_PADDING = {
  top: true,
  bottom: true,
};

export interface ISectionPadding {
  top: boolean;
  bottom: boolean;
}

export interface ISectionContainer {
  color?:
    | "primary"
    | "secondary"
    | "card"
    | "accent"
    | "destructive"
    | "background"
    | "transparent";
  children: React.ReactNode;
  className?: string;
  padding?: ISectionPadding | null | undefined;
  isContainer?: boolean;
}

export default function SectionContainer({
  color = "background",
  padding,
  children,
  isContainer = true,
  className,
}: ISectionContainer) {
  return (
    <div
      className={cn(
        `bg-${color} relative`,
        padding?.top ? "pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "pb-16 xl:pb-20" : undefined,
        className
      )}
    >
      {isContainer ? (
        <div className="px-4 md:px-16 lg:px-24">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
