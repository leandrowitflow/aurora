import { Button } from "@/components/Button";
import type { ReactNode } from "react";

interface SupportCardProps {
  id?: string;
  title: string;
  description: ReactNode;
  buttonLabel?: string;
  buttonHref?: string;
  highlight?: boolean;
}

export function SupportCard({
  id,
  title,
  description,
  buttonLabel,
  buttonHref,
  highlight = false,
}: SupportCardProps) {
  return (
    <article
      id={id}
      className={`support-entry ${highlight ? "support-entry-highlight" : ""}`}
    >
      <h3 className="heading-subsection">{title}</h3>
      <div className="body-text mt-4 flex-1">{description}</div>
      {buttonLabel && buttonHref ? (
        <div className="mt-8">
          <Button href={buttonHref} label={buttonLabel} />
        </div>
      ) : null}
    </article>
  );
}
