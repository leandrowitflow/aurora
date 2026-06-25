"use client";

import { HomeCarouselSlideView } from "@/components/HomeCarouselSlideView";
import { HOME_CAROUSEL_SLIDES } from "@/lib/home-banner-slides";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 8000;
const AUTOPLAY_START_DELAY_MS = 15000;
const TRANSITION_MS = 900;

export function HomeBannerCarouselClient() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [autoplayReady, setAutoplayReady] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
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
    const preloadSlides = () => {
      HOME_CAROUSEL_SLIDES.forEach((slide, slideIndex) => {
        if (slideIndex === 0) {
          return;
        }

        const img = new window.Image();
        img.src = slide.imageSrc;
      });
    };

    const useIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = useIdleCallback
      ? window.requestIdleCallback(preloadSlides, { timeout: 12000 })
      : window.setTimeout(preloadSlides, 12000);

    return () => {
      if (useIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
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

  useEffect(() => {
    const section = controlsRef.current?.closest(".home-carousel");
    if (!section) {
      return;
    }

    const onEnter = () => setIsPaused(true);
    const onLeave = () => setIsPaused(false);

    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const activeSlide = HOME_CAROUSEL_SLIDES[index];
  const previousSlide = prevIndex !== null ? HOME_CAROUSEL_SLIDES[prevIndex] : null;
  const showClientSlides = index !== 0 || prevIndex !== null;

  return (
    <>
      {showClientSlides ? (
        <>
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
            <HomeCarouselSlideView slide={activeSlide} />
          </div>
        </>
      ) : null}

      <div
        ref={controlsRef}
        className="home-carousel__controls"
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false);
          }
        }}
      >
        <div className="home-carousel__dots" role="tablist" aria-label="Slides">
          {HOME_CAROUSEL_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.id ?? `slide-${slideIndex}`}
              type="button"
              role="tab"
              className={`home-carousel__dot rounded-full ${
                slideIndex === index ? "home-carousel__dot-active" : ""
              }`}
              aria-label={`Ir para slide ${slideIndex + 1}`}
              aria-selected={slideIndex === index}
              onClick={() => goTo(slideIndex)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
