import type { Metadata } from "next";
import { InscricoesContent } from "@/components/InscricoesContent";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Inscrições | Coletivo Aurora",
  description:
    "Agenda geral e formulários de reserva para ateliers, festas e campos de férias.",
};

export default function InscricoesPage() {
  return (
    <PageShell>
      <PageHero
        title="Inscrições"
        subtitle="Escolha o tipo de atividade e preencha o formulário. Entraremos em contacto para confirmar o seu lugar."
        imageSrc="/images/hero-inscricoes.png"
      />

      <PageSection id="formularios" tone="cream">
        <InscricoesContent />
      </PageSection>
    </PageShell>
  );
}
