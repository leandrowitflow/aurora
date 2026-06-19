import { Button } from "@/components/Button";
import { SECTION_IMAGES, type SectionImageKey } from "@/lib/section-images";
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
}

/**
 * Desktop flex-basis for torn-edge image columns.
 * Derived from imageWidth / 1920px Figma canvas width.
 * nature/corpo → 51%  |  cuidar → 55%
 */
const TORN_WIDTH_CLASS: Partial<Record<SectionImageKey, string>> = {
  nature: "torn-w-51",
  corpo:  "torn-w-51",
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
}: ContentSectionProps) {
  const config = SECTION_IMAGES[imageLayout];
  const { sectionHeight, imageWidth, imageHeight } = config;

  /* ─────────────────────────────────────────────────────────────────────────
     TORN sections
     The section element IS the flex container so h-full propagates correctly
     to the torn-col image column.
     ───────────────────────────────────────────────────────────────────────── */
  if (config.variant === "torn") {
    const tornClass = TORN_WIDTH_CLASS[imageLayout] ?? "torn-w-51";

    // Both sides: 180px — matches every other section on the page.

    return (
      // Section is the flex row — this lets torn-col height = section height
      <section
        id={id}
        className={`content-banner flex w-full overflow-hidden flex-col ${
          imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Image column — tears in from the page edge, fills full section height.
            aspectRatio drives height on mobile (flex-col, width = 100vw).
            On desktop (flex-row) align-self:stretch overrides it so the column
            fills the full section height. */}
        <div
          className={`torn-col ${tornClass}`}
          style={{ aspectRatio: `${imageWidth} / ${sectionHeight}` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover lg:object-fill"
            style={{
              objectPosition:
                imagePosition === "left" ? "left center" : "right center",
            }}
          />
        </div>

        {/* Text column — fills remaining width, centred vertically */}
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

  /* ─────────────────────────────────────────────────────────────────────────
     RECT sections
     Portrait photo sits inside the standard 180px page margins.
     Image width: min(Xpx, Y%) — caps at the Figma pixel value at 1920px but
     scales down proportionally at narrower viewports so the text column never
     gets crushed. The percentage is derived from imageWidth / 1560 (content
     width = 1920 − 2×180px margins).
     ───────────────────────────────────────────────────────────────────────── */
  const aspectRatio = imageHeight ? `${imageWidth} / ${imageHeight}` : undefined;
  const imgPct = `${((imageWidth / 1560) * 100).toFixed(1)}%`;

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden pb-12 pt-0 lg:pb-14 lg:pt-0 xl:pb-16 2xl:pb-20"
    >
      <div
        className={`site-container flex flex-col items-start gap-8 max-lg:items-center lg:flex-row lg:items-center ${
          imagePosition === "right"
            ? "lg:flex-row-reverse lg:gap-10 xl:gap-12 2xl:gap-16"
            : "rect-row-image-left"
        }`}
      >
        {/* Portrait photo — scales with viewport, caps at Figma pixel width */}
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

        {/* Text column */}
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
