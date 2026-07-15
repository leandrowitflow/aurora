import type { Metadata } from "next";
import { CalendarioInscricoesContent } from "@/components/CalendarioInscricoesContent";
import { DecoratedPage } from "@/components/DecoratedPage";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { ShapeGap } from "@/components/PageDecorations";
import { loadCalendarWeek } from "@/lib/calendar/load-week";

export const metadata: Metadata = {
  title: "Calendário | Coletivo Aurora",
  description:
    "Consulte a agenda semanal e inscreva-se em ateliers, horta, dança e encontros no Coletivo Aurora.",
};

export default async function CalendarioPage() {
  const { weekStart, events, categories, configured } = await loadCalendarWeek();

  return (
    <PageShell>
      <DecoratedPage>
        <PageHero
          title="Calendário"
          subtitle="Consulte as atividades desta semana e inscreva-se diretamente no calendário."
          imageSrc="/images/hero-inscricoes.webp"
        />

        <ShapeGap preset="dotsLeft" />

        <PageSection id="agenda" tone="cream">
          <SectionHeading
            eyebrow="Agenda"
            title="Programação e inscrições"
            description="Clique numa atividade no calendário — o formulário de inscrição abre logo abaixo."
          />
          <div className="mt-10">
            <CalendarioInscricoesContent
              initialWeekStart={weekStart}
              initialEvents={events}
              initialCategories={categories}
              configured={configured}
            />
          </div>
        </PageSection>
      </DecoratedPage>
    </PageShell>
  );
}
