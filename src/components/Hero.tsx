import Image from "next/image";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section className="relative min-h-[700px] lg:min-h-[1018px]">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.41)] from-40% to-[rgba(115,115,115,0)]" />

      <div className="relative mx-auto flex h-full min-h-[700px] max-w-[1920px] flex-col justify-center px-6 pb-20 pt-40 lg:min-h-[1018px] lg:px-[180px]">
        <h1 className="max-w-[380px] font-[family-name:var(--font-epilogue)] text-5xl font-bold leading-tight text-white lg:text-[64px]">
          Olá, Prima!
        </h1>
        <p className="mt-6 max-w-[616px] font-[family-name:var(--font-manrope)] text-xl text-white">
          A antiga escola primária de Olhão está a transformar-se numa casa de encontro aberta ao mundo.
        </p>
        <div className="mt-8">
          <Button href="#quem-somos" label="Quem Somos" variant="mustard" />
        </div>
      </div>
    </section>
  );
}
