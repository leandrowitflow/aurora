"use client";

import { HomeCarouselSlideView } from "@/components/HomeCarouselSlideView";
import { HOME_CAROUSEL_SLIDES } from "@/lib/home-banner-slides";
import { useCallback, useEffect, useState } from "react";

const AUTOPLAY_MS = 8000;
const AUTOPLAY_START_DELAY_MS = 15000;

export function HomeBannerCarouselClient() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [autoplayReady, setAutoplayReady] = useState(false);
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
    const timer = window.setTimeout(() => setAutoplayReady(true), AUTOPLAY_START_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!autoplayEnabled || !autoplayReady || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [autoplayEnabled, autoplayReady, isPaused, slideCount]);

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

  const activeSlide = HOME_CAROUSEL_SLIDES[index];

  return (
    <>
      {index > 0 ? (
        <div className="home-carousel__viewport home-carousel__viewport-overlay">
          <HomeCarouselSlideView
            key={activeSlide.id ?? `slide-${index}`}
            slide={activeSlide}
          />
        </div>
      ) : null}

      <div
        className="home-carousel__controls"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false);
          }
        }}
      >
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
    </>
  );
}
