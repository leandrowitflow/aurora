import { getCalendarCategories } from "@/lib/calendar/categories";
import { getEventsForWeek } from "@/lib/calendar/events";
import { isCalendarConfigured } from "@/lib/calendar/supabase";
import { formatWeekStart, getMonday } from "@/lib/calendar/week";
import {
  DEFAULT_CALENDAR_CATEGORIES,
  type CalendarCategoryRecord,
  type CalendarEvent,
} from "@/lib/calendar/types";

export async function loadCalendarCategories(): Promise<CalendarCategoryRecord[]> {
  if (!isCalendarConfigured()) {
    return DEFAULT_CALENDAR_CATEGORIES;
  }

  try {
    const categories = await getCalendarCategories();
    return categories.length > 0 ? categories : DEFAULT_CALENDAR_CATEGORIES;
  } catch {
    return DEFAULT_CALENDAR_CATEGORIES;
  }
}

export async function loadCalendarWeek(
  week?: string,
): Promise<{
  weekStart: string;
  events: CalendarEvent[];
  categories: CalendarCategoryRecord[];
  configured: boolean;
}> {
  const configured = isCalendarConfigured();
  const weekStart = week ?? formatWeekStart(getMonday(new Date()));
  const categories = await loadCalendarCategories();

  if (!configured) {
    return { weekStart, events: [], categories, configured: false };
  }

  try {
    const events = await getEventsForWeek(weekStart);
    return { weekStart, events, categories, configured: true };
  } catch {
    return { weekStart, events: [], categories, configured: true };
  }
}
