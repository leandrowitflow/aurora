import type { Metadata } from "next";
import { InscricoesContent } from "@/components/InscricoesContent";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Calendário | Coletivo Aurora",
  description:
    "Agenda e formulários de reserva para playgroups, ateliers, horta, férias e festas no Coletivo Aurora.",
};

export default function InscricoesPage() {
  return (
    <PageShell>
      <PageHero
        title="Calendário"
        subtitle="Escolha o tipo de atividade e preencha o formulário. Entraremos em contacto para confirmar o seu lugar."
        imageSrc="/images/hero-inscricoes.webp"
      />

      <PageSection id="formularios" tone="cream">
        <InscricoesContent />
      </PageSection>
    </PageShell>
  );
}
