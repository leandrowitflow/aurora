import { getEventsForWeek } from "@/lib/calendar/events";
import { isCalendarConfigured } from "@/lib/calendar/supabase";
import { formatWeekStart, getMonday } from "@/lib/calendar/week";
import type { CalendarEvent } from "@/lib/calendar/types";

export async function loadCalendarWeek(
  week?: string,
): Promise<{ weekStart: string; events: CalendarEvent[]; configured: boolean }> {
  const configured = isCalendarConfigured();
  const weekStart = week ?? formatWeekStart(getMonday(new Date()));

  if (!configured) {
    return { weekStart, events: [], configured: false };
  }

  try {
    const events = await getEventsForWeek(weekStart);
    return { weekStart, events, configured: true };
  } catch {
    return { weekStart, events: [], configured: true };
  }
}
