import type { ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote">
      <p className="font-[family-name:var(--font-epilogue)] text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold leading-snug text-olive">
        {children}
      </p>
      {attribution ? (
        <cite className="mt-4 block font-[family-name:var(--font-manrope)] text-sm font-bold not-italic text-olive/70">
          {attribution}
        </cite>
      ) : null}
    </blockquote>
  );
}
