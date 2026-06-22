import { HomeBannerCarouselClient } from "@/components/HomeBannerCarouselClient";
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
        <HomeCarouselSlideView slide={firstSlide} isPriority />
      </div>

      <HomeBannerCarouselClient />
    </section>
  );
}
