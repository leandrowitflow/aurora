export const PAGE_SHAPES = {
  oliveLoop: "/Shapes/Camada_1.png",
  peachDots: "/Shapes/Camada_2.png",
  oliveWave: "/Shapes/Camada_3.png",
  blueBlob: "/Shapes/Vector.png",
  terracottaWave: "/Shapes/Vector_1.png",
} as const;

/** @deprecated Use PAGE_SHAPES */
export const HOME_SHAPES = PAGE_SHAPES;

type SectionShapeGapProps = {
  src: string;
  sizes: string;
  align: "left" | "right" | "center";
  kind: "loop" | "dots" | "blob" | "wave";
};

export type SectionImageShapeOverlay =
  | "olive-wave-top"
  | "olive-wave-bottom"
  | "terracotta-wave-top"
  | "terracotta-wave-bottom";

const SECTION_IMAGE_SHAPE_CONFIG: Record<
  SectionImageShapeOverlay,
  { src: string; className: string; sizes: string }
> = {
  "olive-wave-top": {
    src: PAGE_SHAPES.oliveWave,
    className: "section-image-shape section-image-shape--wave-top",
    sizes: "(min-width: 1280px) 631px, 320px",
  },
  "olive-wave-bottom": {
    src: PAGE_SHAPES.oliveWave,
    className: "section-image-shape section-image-shape--wave-bottom",
    sizes: "(min-width: 1280px) 631px, 320px",
  },
  "terracotta-wave-top": {
    src: PAGE_SHAPES.terracottaWave,
    className: "section-image-shape section-image-shape--wave-top",
    sizes: "(min-width: 1280px) 670px, 340px",
  },
  "terracotta-wave-bottom": {
    src: PAGE_SHAPES.terracottaWave,
    className: "section-image-shape section-image-shape--wave-bottom",
    sizes: "(min-width: 1280px) 670px, 340px",
  },
};

/** Presets for section boundary shapes. */
export const SHAPE_GAPS = {
  loopLeft: {
    src: PAGE_SHAPES.oliveLoop,
    align: "left" as const,
    kind: "loop" as const,
    sizes: "(min-width: 1280px) 266px, 200px",
  },
  loopRight: {
    src: PAGE_SHAPES.oliveLoop,
    align: "right" as const,
    kind: "loop" as const,
    sizes: "(min-width: 1280px) 266px, 200px",
  },
  dotsLeft: {
    src: PAGE_SHAPES.peachDots,
    align: "left" as const,
    kind: "dots" as const,
    sizes: "(min-width: 1280px) 256px, 180px",
  },
  dotsRight: {
    src: PAGE_SHAPES.peachDots,
    align: "right" as const,
    kind: "dots" as const,
    sizes: "(min-width: 1280px) 256px, 180px",
  },
  waveCenter: {
    src: PAGE_SHAPES.oliveWave,
    align: "center" as const,
    kind: "wave" as const,
    sizes: "(min-width: 1280px) 631px, 320px",
  },
};

/** Static PNG decorations — native img avoids /_next/image optimizer round-trips. */
function DecorativeShapeImage({
  src,
  className = "object-contain",
}: {
  src: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      decoding="async"
      loading="lazy"
      fetchPriority="low"
      className={`absolute inset-0 size-full ${className}`}
    />
  );
}

export function SectionImageShape({
  variant,
}: {
  variant: SectionImageShapeOverlay;
}) {
  const { src, className } = SECTION_IMAGE_SHAPE_CONFIG[variant];

  return (
    <div className={className} aria-hidden="true">
      <DecorativeShapeImage src={src} />
    </div>
  );
}

/** Blue blob anchored to the bottom-right of a hero. */
export function HeroBlobDecoration() {
  return (
    <div className="hero-blob-decoration" aria-hidden="true">
      <DecorativeShapeImage
        src={PAGE_SHAPES.blueBlob}
        className="object-contain object-right-bottom"
      />
    </div>
  );
}

/** @deprecated Use HeroBlobDecoration */
export function HomeHeroDecoration() {
  return <HeroBlobDecoration />;
}

export function SectionShapeGap({
  src,
  sizes: _sizes,
  align,
  kind,
}: SectionShapeGapProps) {
  return (
    <div className="section-shape-gap" aria-hidden="true">
      <div
        className={`section-shape-gap__shape section-shape-gap__shape--${align} section-shape-gap__shape--${kind}`}
      >
        <DecorativeShapeImage src={src} />
      </div>
    </div>
  );
}

export function ShapeGap({
  preset,
}: {
  preset: keyof typeof SHAPE_GAPS;
}) {
  return <SectionShapeGap {...SHAPE_GAPS[preset]} />;
}
