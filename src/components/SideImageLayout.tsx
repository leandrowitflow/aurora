import { SECTION_IMAGES, type SectionImageKey } from "@/lib/section-images";
import type { CSSProperties, ReactNode } from "react";

interface SideImageLayoutProps {
  imageSrc: string;
  imageAlt: string;
  imageLayout: SectionImageKey;
  imagePosition?: "left" | "right";
  children: ReactNode;
}

export function SideImageLayout({
  imageSrc,
  imageAlt,
  imageLayout,
  imagePosition = "right",
  children,
}: SideImageLayoutProps) {
  const { imageWidth, imageHeight } = SECTION_IMAGES[imageLayout];
  const aspectRatio = imageHeight ? `${imageWidth} / ${imageHeight}` : undefined;
  const imgPct = `${((imageWidth / 1560) * 100).toFixed(1)}%`;

  return (
    <div
      className={`flex flex-col items-start gap-8 max-lg:items-center lg:items-center ${
        imagePosition === "right"
          ? "lg:flex-row-reverse lg:gap-10 xl:gap-12 2xl:gap-16"
          : "lg:flex-row rect-row-image-left lg:gap-10 xl:gap-12 2xl:gap-16"
      }`}
    >
      <div
        className="rect-img overflow-hidden"
        style={
          {
            "--rect-max-w": `${imageWidth}px`,
            "--rect-pct": imgPct,
            flexShrink: 0,
            aspectRatio,
          } as CSSProperties
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}
