"use client";

import { Button } from "@/components/Button";
import {
  HOME_CAROUSEL_SLIDES,
  type HomeCarouselSlide,
} from "@/lib/home-banner-slides";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const AUTOPLAY_MS = 6000;

function CarouselSlide({ slide }: { slide: HomeCarouselSlide }) {
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
          priority={slide.imageSrc === "/images/hero-bg.jpg"}
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

export function HomeBannerCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const slideCount = HOME_CAROUSEL_SLIDES.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncAutoplay = () => setAutoplayEnabled(!mediaQuery.matches);

    syncAutoplay();
    mediaQuery.addEventListener("change", syncAutoplay);
    return () => mediaQuery.removeEventListener("change", syncAutoplay);
  }, []);

  useEffect(() => {
    if (!autoplayEnabled || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [autoplayEnabled, isPaused, slideCount]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        goTo(index - 1);
      }
      if (event.key === "ArrowRight") {
        goTo(index + 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, index]);

  return (
    <section
      className="site-hero home-carousel"
      aria-roledescription="carousel"
      aria-label="Destaques do Coletivo Aurora"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="home-carousel__viewport">
        <div
          className="home-carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {HOME_CAROUSEL_SLIDES.map((slide, slideIndex) => (
            <CarouselSlide
              key={slide.id ?? `slide-${slideIndex}`}
              slide={slide}
            />
          ))}
        </div>
      </div>

      <div className="home-carousel__controls">
        <button
          type="button"
          className="home-carousel__arrow"
          onClick={() => goTo(index - 1)}
          aria-label="Slide anterior"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="home-carousel__dots" role="tablist" aria-label="Slides">
          {HOME_CAROUSEL_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.id ?? `slide-${slideIndex}`}
              type="button"
              role="tab"
              className={`home-carousel__dot ${
                slideIndex === index ? "home-carousel__dot-active" : ""
              }`}
              aria-label={`Ir para slide ${slideIndex + 1}`}
              aria-selected={slideIndex === index}
              onClick={() => goTo(slideIndex)}
            />
          ))}
        </div>

        <button
          type="button"
          className="home-carousel__arrow"
          onClick={() => goTo(index + 1)}
          aria-label="Slide seguinte"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
