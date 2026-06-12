import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-[800px] ${alignClass}`}>
      {eyebrow ? (
        <p className={`label-olive ${light ? "text-mustard" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`heading-section mt-3 ${light ? "text-white" : ""} ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      <div className={`accent-rule mt-5 ${light ? "bg-mustard" : ""}`} />
      {description ? (
        <p className={`body-text mt-6 ${light ? "text-white/90" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
