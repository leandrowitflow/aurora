export type SectionVariant = "torn" | "rect";

export interface SectionImageConfig {
  variant: SectionVariant;
  /** Exact image frame pixel width at 1920px Figma canvas */
  imageWidth: number;
  /** Exact image frame pixel height at 1920px Figma canvas (rect sections only) */
  imageHeight?: number;
  /** Exact section height at 1920px Figma canvas */
  sectionHeight: number;
}

export type SectionImageKey =
  | "nature"
  | "cuidar"
  | "corpo"
  | "viver"
  | "tecendo"
  | "apoiar";

/**
 * Exact measurements from the grouped Figma nodes (1920px canvas).
 *
 * The screenshots for torn images are taken directly from Figma at the
 * exact frame dimensions (imageWidth × sectionHeight), so they already
 * include the correct crop/clip. We render them at w-full h-full.
 */
export const SECTION_IMAGES: Record<SectionImageKey, SectionImageConfig> = {
  // ── Torn edge photos ──────────────────────────────────────────────────────
  // Downloaded as pre-cropped frames directly from Figma nodes.
  // nature: 1357:155 → 982×813, torn edge on the right (no CSS flip needed)
  nature:  { variant: "torn", imageWidth: 982,  sectionHeight: 813 },
  // cuidar: 1361:166 → 1064×812, image placed at left-856px on 1920 canvas
  cuidar:  { variant: "torn", imageWidth: 1064, sectionHeight: 812 },
  // corpo:  1364:181 → 971×812, torn edge on the right
  corpo:   { variant: "torn", imageWidth: 971,  sectionHeight: 812 },

  // ── Portrait photos (rect) ────────────────────────────────────────────────
  // viver:   1406:37 → section 797px, image frame 589×724
  viver:   { variant: "rect", imageWidth: 589,  sectionHeight: 797,  imageHeight: 724 },
  // tecendo: 1406:38 → section 744px, image frame 626×671
  tecendo: { variant: "rect", imageWidth: 626,  sectionHeight: 744,  imageHeight: 671 },
  // apoiar:  1406:39 → section 887px, image frame 687×724
  apoiar:  { variant: "rect", imageWidth: 687,  sectionHeight: 887,  imageHeight: 724 },
};
