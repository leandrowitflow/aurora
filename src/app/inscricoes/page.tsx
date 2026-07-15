import type { Metadata } from "next";
import { DecoratedPage } from "@/components/DecoratedPage";
import { InscricoesContent } from "@/components/InscricoesContent";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { ShapeGap } from "@/components/PageDecorations";

export const metadata: Metadata = {
  title: "Inscrições | Coletivo Aurora",
  description:
    "Formulários de reserva para playgroups, ateliers, horta, férias e festas no Coletivo Aurora.",
};

export default function InscricoesPage() {
  return (
    <PageShell>
      <DecoratedPage>
        <PageHero
          title="Inscrições"
          subtitle="Escolha o tipo de atividade e preencha o formulário. Entraremos em contacto para confirmar o seu lugar."
          imageSrc="/images/hero-inscricoes.webp"
        />

        <ShapeGap preset="dotsLeft" />

        <PageSection id="formularios" tone="cream">
          <InscricoesContent />
        </PageSection>
      </DecoratedPage>
    </PageShell>
  );
}
