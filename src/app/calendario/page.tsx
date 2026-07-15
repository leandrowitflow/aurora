import type { Metadata } from "next";
import { DecoratedPage } from "@/components/DecoratedPage";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { ShapeGap } from "@/components/PageDecorations";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { loadCalendarWeek } from "@/lib/calendar/load-week";

export const metadata: Metadata = {
  title: "Calendário | Coletivo Aurora",
  description:
    "Consulte a agenda semanal de ateliers, horta, dança e encontros no Coletivo Aurora.",
};

export default async function CalendarioPage() {
  const { weekStart, events, configured } = await loadCalendarWeek();

  return (
    <PageShell>
      <DecoratedPage>
        <PageHero
          title="Calendário"
          subtitle="Consulte as atividades desta semana e reserve o seu lugar."
          imageSrc="/images/hero-inscricoes.webp"
        />

        <ShapeGap preset="dotsLeft" />

        <PageSection id="agenda" tone="cream">
          <SectionHeading
            eyebrow="Agenda"
            title="Programação semanal"
            description="Ateliers, horta, dança e encontros comunitários. As cores indicam o tipo de atividade."
          />
          <div className="mt-10">
            <WeeklyCalendar
              initialWeekStart={weekStart}
              initialEvents={events}
              configured={configured}
            />
          </div>
        </PageSection>
      </DecoratedPage>
    </PageShell>
  );
}
