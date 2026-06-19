import type { Metadata } from "next";
import { FazerParteContent } from "@/components/FazerParteContent";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Fazer parte | Coletivo Aurora",
  description:
    "Voluntariado, donativos, amigos do Aurora e parcerias para sustentar o projeto.",
};

export default function FazerPartePage() {
  return (
    <PageShell>
      <PageHero
        title="Fazer parte"
        subtitle="Com tempo, com recursos ou com uma parceria de longo prazo, há um lugar para si no Aurora."
        imageSrc="/images/hero-fazer-parte.png"
      />

      <PageSection tone="cream">
        <FazerParteContent />
      </PageSection>
    </PageShell>
  );
}
