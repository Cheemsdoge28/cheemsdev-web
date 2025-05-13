import React from "react";
import { useId } from "react";

interface SVGPainterProps {
  svg: React.ReactNode;
  background: React.ReactNode;
  className?: string;
  stroke?: boolean; 
  glow?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  glowColor?: string; 
}

const glowBlur = {
  none: 0,
  xs: 1,
  sm: 3,
  md: 6,
  lg: 12,
  xl: 18, 
};

// Converts a hex color to an feColorMatrix-compatible matrix string
const hexToMatrix = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return `${r} 0 0 0 0
          0 ${g} 0 0 0
          0 0 ${b} 0 0
          0 0 0 1 0`;
};

const SVGPainter: React.FC<SVGPainterProps> = ({
  svg,
  background,
  className = "",
  stroke = false,
  glow = "none",
  glowColor = "#ffffff", 
}) => {
  const maskId = useId();
  const filterId = useId();
  const glowStrength = glowBlur[glow];

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          {glow !== "none" && (
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={glowStrength} result="blur" />
              <feColorMatrix
                result="glowColor"
                type="matrix"
                values={hexToMatrix(glowColor)}
              />
              <feMerge>
                <feMergeNode in="glowColor" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          <mask id={maskId}>
            <rect width="100%" height="100%" fill={stroke ? "black" : "white"} />
            <g fill={stroke ? "white" : "black"} filter={glow !== "none" ? `url(#${filterId})` : undefined}>
              {svg}
            </g>
          </mask>
        </defs>

        <foreignObject width="100%" height="100%" mask={`url(#${maskId})`}>
          <div className="w-full h-full">{background}</div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default SVGPainter;
