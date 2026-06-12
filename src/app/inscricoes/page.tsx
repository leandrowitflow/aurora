import type { Metadata } from "next";
import { InscricoesContent } from "@/components/InscricoesContent";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Inscrições | Coletivo Aurora",
  description:
    "Agenda geral e formulários de reserva para ateliers, festas e campos de férias.",
};

export default function InscricoesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Reservas"
        title="Inscrições"
        subtitle="Escolha o tipo de atividade e preencha o formulário. Entraremos em contacto para confirmar o seu lugar."
      />

      <PageSection id="formularios" tone="cream">
        <SectionHeading
          eyebrow="Como funciona"
          title="Escolha a atividade e envie o pedido"
          description="Selecione o tipo de reserva à esquerda e preencha apenas o formulário correspondente. Confirmamos disponibilidade por e-mail ou telefone."
        />
        <InscricoesContent />
      </PageSection>
    </PageShell>
  );
}
