import Image from "next/image";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section className="relative min-h-[700px] overflow-hidden lg:min-h-[1018px]">
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

      <div className="hero-content relative z-[2] mx-auto flex min-h-[700px] max-w-[1920px] flex-col justify-center px-6 pb-20 pt-32 lg:min-h-[1018px] lg:px-[180px] lg:pt-40">
        <h1 className="hero-title">Olá, Prima!</h1>
        <p className="hero-lead">
          A antiga escola primária de Olhão está a transformar-se numa casa de
          encontro aberta ao mundo.
        </p>
        <div className="mt-8">
          <Button href="/quem-somos" label="Quem somos" variant="mustard" />
        </div>
      </div>
    </section>
  );
}
