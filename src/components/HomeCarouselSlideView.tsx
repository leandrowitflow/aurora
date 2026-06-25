import { Button } from "@/components/Button";
import type { HomeCarouselSlide } from "@/lib/home-banner-slides";
import Image from "next/image";

export function HomeCarouselSlideView({
  slide,
  isPriority = false,
}: {
  slide: HomeCarouselSlide;
  isPriority?: boolean;
}) {
  return (
    <article
      id={slide.id}
      className="home-carousel__slide"
      aria-roledescription="slide"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.imageSrc}
          alt={slide.imageAlt}
          fill
          priority={isPriority}
          fetchPriority={isPriority ? "high" : undefined}
          loading={isPriority ? "eager" : "lazy"}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/30 to-black/5"
        aria-hidden
      />

      <div className="page-hero-content site-hero__content site-container relative z-[2]">
        <h1 className="heading-page max-w-[900px]">{slide.title}</h1>
        {slide.description ? (
          <p className="body-text mt-5 max-w-[640px] opacity-95 lg:mt-6">
            {slide.description}
          </p>
        ) : null}
        <div className={slide.description ? "mt-6 lg:mt-7" : "mt-6"}>
          <Button
            href={slide.buttonHref}
            label={slide.buttonLabel}
            variant={slide.buttonVariant ?? "mustard"}
          />
        </div>
      </div>
    </article>
  );
}
