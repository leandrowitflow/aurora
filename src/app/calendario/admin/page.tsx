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

export const dynamic = "force-dynamic";

export default async function CalendarioAdminPage() {
  const { weekStart, events, categories, configured } = await loadCalendarWeek();

  return (
    <PageShell>
      <PageSection tone="cream" className="calendar-admin-page">
        <CalendarAdminPanel
          initialWeekStart={weekStart}
          initialEvents={events}
          initialCategories={categories}
          configured={configured}
        />
      </PageSection>
    </PageShell>
  );
}
