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
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-[800px] text-center" : ""}>
      {eyebrow ? (
        <p className={`label-olive ${light ? "text-mustard" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`heading-section mt-3 ${light ? "text-white" : ""} ${
          isCenter ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`body-text mt-6 ${light ? "text-white/90" : ""} ${
            isCenter ? "" : "max-w-[960px]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
