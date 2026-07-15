"use client";

import { CalendarEventPanel } from "@/components/CalendarEventPanel";
import { InscricoesContent } from "@/components/InscricoesContent";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import type { CalendarCategoryRecord, CalendarEvent } from "@/lib/calendar/types";
import { useEffect, useRef, useState } from "react";

type CalendarioInscricoesContentProps = {
  initialWeekStart: string;
  initialEvents: CalendarEvent[];
  initialCategories: CalendarCategoryRecord[];
  configured: boolean;
};

export function CalendarioInscricoesContent({
  initialWeekStart,
  initialEvents,
  initialCategories,
  configured,
}: CalendarioInscricoesContentProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [categories, setCategories] = useState(initialCategories);
  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [events, setEvents] = useState(initialEvents);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedEvent || !panelRef.current) {
      return;
    }

    panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedEvent]);

  function handleWeekChange(nextWeekStart: string) {
    setWeekStart(nextWeekStart);
    setSelectedEvent(null);
  }

  function handleEventsLoaded(_nextWeekStart: string, nextEvents: CalendarEvent[]) {
    setEvents(nextEvents);
  }

  return (
    <div className="calendario-inscricoes-layout">
      <div className="calendario-inscricoes-calendar">
        <WeeklyCalendar
          initialWeekStart={weekStart}
          initialEvents={events}
          initialCategories={categories}
          configured={configured}
          onEventClick={setSelectedEvent}
          selectedEventId={selectedEvent?.id ?? null}
          showReservationCta={false}
          showClickHint
          onWeekChange={handleWeekChange}
          onEventsLoaded={handleEventsLoaded}
          onCategoriesLoaded={setCategories}
        />
      </div>

      <div ref={panelRef} className="calendario-event-panel-anchor">
        <CalendarEventPanel
          event={selectedEvent}
          categories={categories}
          onClose={() => setSelectedEvent(null)}
        />
      </div>

      <div className="calendario-inscricoes-panel">
        <InscricoesContent hideCalendarLink />
      </div>
    </div>
  );
}
