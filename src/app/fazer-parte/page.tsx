import type { Metadata } from "next";
import { FazerParteContent } from "@/components/FazerParteContent";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Fazer Parte | Coletivo Aurora",
  description:
    "Voluntariado, donativos, Amigos do Aurora e parcerias para sustentar o projeto.",
};

export default function FazerPartePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Comunidade"
        title="Fazer Parte"
        subtitle="Com tempo, com recursos ou com uma parceria de longo prazo — há um lugar para si no Aurora."
        imageSrc="/images/section-apoiar.png"
      />

      <PageSection tone="cream">
        <SectionHeading
          eyebrow="Pilares de apoio"
          title="Escolha a sua forma de contribuir"
          description="Cada gesto — grande ou pequeno — ajuda a manter vivo o Tecendo Gerações e toda a comunidade que o sustenta."
        />
        <FazerParteContent />
      </PageSection>
    </PageShell>
  );
}
