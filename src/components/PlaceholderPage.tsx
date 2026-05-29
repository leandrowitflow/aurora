import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-page py-32 text-center">
        <h1 className="heading-section">{title}</h1>
        <p className="body-text mt-6 text-olive/80">Página em construção.</p>
        <Link
          href="/"
          className="mt-8 font-[family-name:var(--font-manrope)] text-lg font-bold text-olive transition-opacity hover:opacity-70"
        >
          Voltar ao início
        </Link>
      </main>
      <Footer />
    </>
  );
}
