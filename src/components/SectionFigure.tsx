import {
  SectionImageShape,
  type SectionImageShapeOverlay,
} from "@/components/PageDecorations";
import Image from "next/image";

interface SectionFigureProps {
  src: string;
  alt?: string;
  sizes?: string;
  imageShapeOverlay?: SectionImageShapeOverlay;
}

export function SectionFigure({
  src,
  alt = "",
  sizes = "(min-width: 1024px) 560px, 100vw",
  imageShapeOverlay,
}: SectionFigureProps) {
  if (!imageShapeOverlay) {
    return (
      <figure className="section-figure">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </figure>
    );
  }

  return (
    <figure className="section-figure section-figure-stack">
      <div className="section-figure__frame">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
      <SectionImageShape variant={imageShapeOverlay} />
    </figure>
  );
}
