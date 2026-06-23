"use client";

import { HomeCarouselSlideView } from "@/components/HomeCarouselSlideView";
import { HOME_CAROUSEL_SLIDES } from "@/lib/home-banner-slides";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 8000;
const AUTOPLAY_START_DELAY_MS = 15000;
const TRANSITION_MS = 900;

export function HomeBannerCarousel() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [autoplayReady, setAutoplayReady] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const slideCount = HOME_CAROUSEL_SLIDES.length;

  indexRef.current = index;

  const goTo = useCallback(
    (nextIndex: number) => {
      const normalized = (nextIndex + slideCount) % slideCount;
      if (normalized === indexRef.current) {
        return;
      }

      setPrevIndex(indexRef.current);
      setIndex(normalized);
    },
    [slideCount],
  );

  useEffect(() => {
    if (prevIndex === null) {
      return;
    }

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      setPrevIndex(null);
      transitionTimerRef.current = null;
    }, TRANSITION_MS);

    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, [index, prevIndex]);

  useEffect(() => {
    HOME_CAROUSEL_SLIDES.forEach((slide, slideIndex) => {
      if (slideIndex === 0) {
        return;
      }

      const img = new window.Image();
      img.src = slide.imageSrc;
    });
  }, []);

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
      goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [autoplayEnabled, autoplayReady, goTo, isPaused]);

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
  const previousSlide = prevIndex !== null ? HOME_CAROUSEL_SLIDES[prevIndex] : null;

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
        {previousSlide ? (
          <div
            className="home-carousel__slide-layer home-carousel__slide-layer-exit"
            aria-hidden="true"
          >
            <HomeCarouselSlideView slide={previousSlide} />
          </div>
        ) : null}

        <div
          className={`home-carousel__slide-layer${
            previousSlide ? " home-carousel__slide-layer-enter" : ""
          }`}
        >
          <HomeCarouselSlideView
            slide={activeSlide}
            isPriority={index === 0 && prevIndex === null}
          />
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
