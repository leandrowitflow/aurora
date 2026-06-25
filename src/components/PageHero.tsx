import Image from "next/image";
import type { ReactNode } from "react";
import { HeroBlobDecoration } from "@/components/PageDecorations";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  imageSrc?: string;
  showBlob?: boolean;
}

export function PageHero({
  title,
  subtitle,
  imageSrc,
  showBlob = true,
}: PageHeroProps) {
  const hasImage = Boolean(imageSrc);

  return (
    <section className={`site-hero${hasImage && showBlob ? " site-hero--decorated" : ""}`}>
      {hasImage ? (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={imageSrc!}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-r from-black/65 via-black/40 to-black/20"
            aria-hidden
          />
          {showBlob ? <HeroBlobDecoration /> : null}
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-olive" aria-hidden />
          <div
            className="page-hero-blob -right-20 top-10 h-72 w-72 bg-mustard/20"
            aria-hidden
          />
          <div
            className="page-hero-blob bottom-0 left-1/4 h-56 w-56 bg-white/5"
            aria-hidden
          />
        </>
      )}

      <div className="page-hero-content site-hero__content site-container">
        <h1 className="heading-page max-w-[900px]">{title}</h1>
        {subtitle ? (
          <p className="body-text mt-5 max-w-[640px] opacity-95 lg:mt-6">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
