import type { Metadata } from "next";
import { CalendarAdminPanel } from "@/components/CalendarAdminPanel";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { loadCalendarWeek } from "@/lib/calendar/load-week";

export const metadata: Metadata = {
  title: "Administração do calendário | Coletivo Aurora",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CalendarioAdminPage() {
  const { weekStart, events, configured } = await loadCalendarWeek();

  return (
    <PageShell>
      <PageSection tone="cream" className="calendar-admin-page">
        <CalendarAdminPanel
          initialWeekStart={weekStart}
          initialEvents={events}
          configured={configured}
        />
      </PageSection>
    </PageShell>
  );
}
