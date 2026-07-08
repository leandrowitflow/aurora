import { Button } from "@/components/Button";
import { SectionImageShape, type SectionImageShapeOverlay } from "@/components/PageDecorations";
import { SECTION_IMAGES, type SectionImageKey } from "@/lib/section-images";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

interface ContentSectionProps {
  id?: string;
  title: ReactNode;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageLayout: SectionImageKey;
  buttonLabel: string;
  buttonHref: string;
  imagePosition?: "left" | "right";
  imageShapeOverlay?: SectionImageShapeOverlay;
}

const TORN_WIDTH_CLASS: Partial<Record<SectionImageKey, string>> = {
  nature: "torn-w-51",
  corpo: "torn-w-51",
  cuidar: "torn-w-55",
};

export function ContentSection({
  id,
  title,
  description,
  imageSrc,
  imageAlt,
  imageLayout,
  buttonLabel,
  buttonHref,
  imagePosition = "left",
  imageShapeOverlay,
}: ContentSectionProps) {
  const config = SECTION_IMAGES[imageLayout];
  const { sectionHeight, imageWidth, imageHeight } = config;

  if (config.variant === "torn") {
    const tornClass = TORN_WIDTH_CLASS[imageLayout] ?? "torn-w-51";

    return (
      <section
        id={id}
        className={`content-banner flex w-full overflow-hidden flex-col ${
          imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div
          className={`torn-col ${tornClass}`}
          style={{ aspectRatio: `${imageWidth} / ${sectionHeight}` }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover lg:object-fill"
            style={{
              objectPosition:
                imagePosition === "left" ? "left center" : "right center",
            }}
            sizes="(min-width: 1024px) 55vw, 100vw"
            loading="lazy"
            fetchPriority="low"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center bg-white px-page py-8 sm:py-10 lg:py-8 xl:py-10">
          <h2 className="heading-section max-w-[603px]">{title}</h2>
          <div className="body-text mt-6 max-w-[660px]">{description}</div>
          <div className="mt-8">
            <Button href={buttonHref} label={buttonLabel} />
          </div>
        </div>
      </section>
    );
  }

  const aspectRatio = imageHeight ? `${imageWidth} / ${imageHeight}` : undefined;
  const imgPct = `${((imageWidth / 1560) * 100).toFixed(1)}%`;

  return (
    <section
      id={id}
      className={`relative w-full pb-12 pt-0 lg:pb-14 lg:pt-0 xl:pb-16 2xl:pb-20 overflow-visible`}
    >
      <div
        className={`site-container flex flex-col items-start gap-8 max-lg:items-center lg:flex-row lg:items-center ${
          imagePosition === "right"
            ? "lg:flex-row-reverse lg:gap-10 xl:gap-12 2xl:gap-16"
            : "rect-row-image-left"
        }`}
      >
        <div
          className="rect-img rect-img-stack"
          style={
            {
              "--rect-max-w": `${imageWidth}px`,
              "--rect-pct": imgPct,
              flexShrink: 0,
            } as CSSProperties
          }
        >
          <div
            className="rect-img__frame relative overflow-hidden"
            style={{ aspectRatio }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top"
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 88vw"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
          {imageShapeOverlay ? (
            <SectionImageShape variant={imageShapeOverlay} />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col justify-center py-4 lg:py-0">
          <h2 className="heading-section max-w-[603px]">{title}</h2>
          <div className="body-text mt-6 max-w-[660px]">{description}</div>
          <div className="mt-8">
            <Button href={buttonHref} label={buttonLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
