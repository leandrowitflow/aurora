import type { ReactNode } from "react";

type SectionTone = "white" | "cream" | "sand" | "pattern" | "olive";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  narrow?: boolean;
  wide?: boolean;
  tone?: SectionTone;
}

const TONE_CLASS: Record<SectionTone, string> = {
  white: "bg-white",
  cream: "surface-cream",
  sand: "surface-sand",
  pattern: "surface-pattern",
  olive: "surface-olive",
};

export function PageSection({
  children,
  className = "",
  id,
  narrow = false,
  wide = false,
  tone = "white",
}: PageSectionProps) {
  const containerClass = narrow
    ? "mx-auto max-w-[900px] px-page"
    : "site-container";

  return (
    <section id={id} className={`py-20 lg:py-28 ${TONE_CLASS[tone]} ${className}`}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}
