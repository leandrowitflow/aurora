import Image from "next/image";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section className="site-hero">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/30 to-black/5"
        aria-hidden
      />

      <div className="page-hero-content site-hero__content site-container">
        <h1 className="heading-page max-w-[900px]">Olá, Prima!</h1>
        <p className="body-text mt-5 max-w-[640px] opacity-95 lg:mt-6">
          A antiga escola primária de Olhão está a transformar-se numa casa de
          encontro aberta ao mundo.
        </p>
        <div className="mt-6 lg:mt-7">
          <Button href="/quem-somos" label="Quem somos" variant="mustard" />
        </div>
      </div>
    </section>
  );
}
