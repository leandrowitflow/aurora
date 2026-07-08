import { DeferredHeroBlob } from "@/components/DeferredHeroBlob";
import { DeferredHomeBannerCarouselClient } from "@/components/DeferredHomeBannerCarouselClient";
import { HomeCarouselSlideView } from "@/components/HomeCarouselSlideView";
import { HOME_CAROUSEL_SLIDES } from "@/lib/home-banner-slides";

export function HomeBannerCarousel() {
  const firstSlide = HOME_CAROUSEL_SLIDES[0];

  return (
    <section
      className="site-hero home-carousel"
      aria-roledescription="carousel"
      aria-label="Destaques do Coletivo Aurora"
    >
      <div className="home-carousel__viewport">
        <div className="home-carousel__ssr-fallback">
          <HomeCarouselSlideView slide={firstSlide} isPriority />
        </div>
        <div
          className="home-carousel__controls home-carousel__controls--static"
          aria-hidden="true"
        >
          <div className="home-carousel__dots">
            {HOME_CAROUSEL_SLIDES.map((slide, slideIndex) => (
              <span
                key={slide.id ?? `ssr-dot-${slideIndex}`}
                className={`home-carousel__dot rounded-full ${
                  slideIndex === 0 ? "home-carousel__dot-active" : ""
                }`}
              />
            ))}
          </div>
        </div>
        <DeferredHomeBannerCarouselClient />
        <DeferredHeroBlob />
      </div>
    </section>
  );
}
