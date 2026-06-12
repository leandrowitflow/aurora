import Image from "next/image";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: string;
  imageSrc?: string;
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  imageSrc,
}: PageHeroProps) {
  const hasImage = Boolean(imageSrc);

  return (
    <section className="relative min-h-[480px] overflow-hidden lg:min-h-[600px] xl:min-h-[720px]">
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

      <div className="page-hero-content relative z-[2] mx-auto flex min-h-[480px] max-w-[1920px] flex-col justify-center px-page py-28 lg:min-h-[600px] lg:py-32 xl:min-h-[720px]">
        {eyebrow ? <p className="label-olive">{eyebrow}</p> : null}
        <h1 className={`heading-page max-w-[900px] ${eyebrow ? "mt-4" : ""}`}>
          {title}
        </h1>
        <div className="accent-rule mt-6 bg-mustard" />
        {subtitle ? (
          <p className="body-text mt-6 max-w-[640px] opacity-95">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
