import Image from "next/image";
import { Button } from "@/components/Button";
import { epilogue } from "@/lib/fonts";

export function Hero() {
  return (
    <section className="relative min-h-[560px] sm:min-h-[640px] xl:min-h-[1018px]">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.41)] from-40% to-[rgba(115,115,115,0)]" />

      <div className="relative mx-auto flex h-full min-h-[560px] max-w-[1920px] flex-col justify-center px-page pb-14 pt-28 sm:min-h-[640px] sm:pb-16 sm:pt-32 xl:min-h-[1018px] xl:pb-20 xl:pt-40">
        <h1
          className={`${epilogue.className} max-w-[420px] text-4xl font-bold leading-[100%] text-white lg:text-[40px] xl:text-[64px]`}
        >
          Olá, Prima!
        </h1>
        <p className="mt-5 max-w-[616px] font-[family-name:var(--font-manrope)] text-base leading-[100%] text-white lg:text-[17px] xl:text-[20px]">
          A antiga escola primária de Olhão está a transformar-se numa casa de encontro aberta ao mundo.
        </p>
        <div className="mt-8">
          <Button href="#quem-somos" label="Quem Somos" variant="mustard" />
        </div>
      </div>
    </section>
  );
}
