import Image from "next/image";
import SVGPainter from "./svgpainter";

export default function Logo() {
  return (
    <Image
      src="/images/logo.svg"
      alt="Cheemsdev Logo"
      width={96}
      height={96}
    />
  );
}
