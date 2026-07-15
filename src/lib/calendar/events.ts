import type { CalendarEvent, CalendarEventInput } from "@/lib/calendar/types";
import { getCalendarAdminClient, getCalendarPublicClient } from "@/lib/calendar/supabase";

function mapRow(row: Record<string, unknown>): CalendarEvent {
  return {
    id: String(row.id),
    week_start: String(row.week_start),
    day_of_week: Number(row.day_of_week),
    start_time: String(row.start_time).slice(0, 5),
    end_time: String(row.end_time).slice(0, 5),
    title: String(row.title),
    subtitle: String(row.subtitle ?? ""),
    price_label: String(row.price_label ?? ""),
    recurrence_note: String(row.recurrence_note ?? ""),
    category: row.category as CalendarEvent["category"],
    sort_order: Number(row.sort_order ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export async function getEventsForWeek(weekStart: string): Promise<CalendarEvent[]> {
  const supabase = getCalendarPublicClient();
  const { data, error } = await supabase
    .from("calendar_events")
    .select("*")
    .eq("week_start", weekStart)
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

export async function createCalendarEvent(
  input: CalendarEventInput,
): Promise<CalendarEvent> {
  const supabase = getCalendarAdminClient();
  const { data, error } = await supabase
    .from("calendar_events")
    .insert({
      week_start: input.week_start,
      day_of_week: input.day_of_week,
      start_time: input.start_time,
      end_time: input.end_time,
      title: input.title,
      subtitle: input.subtitle ?? "",
      price_label: input.price_label ?? "",
      recurrence_note: input.recurrence_note ?? "",
      category: input.category,
      sort_order: input.sort_order ?? 0,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapRow(data as Record<string, unknown>);
}

export async function updateCalendarEvent(
  id: string,
  input: Partial<CalendarEventInput>,
): Promise<CalendarEvent> {
  const supabase = getCalendarAdminClient();
  const { data, error } = await supabase
    .from("calendar_events")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapRow(data as Record<string, unknown>);
}

export async function deleteCalendarEvent(id: string): Promise<void> {
  const supabase = getCalendarAdminClient();
  const { error } = await supabase.from("calendar_events").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function copyWeekEvents(
  sourceWeekStart: string,
  targetWeekStart: string,
): Promise<CalendarEvent[]> {
  const sourceEvents = await getEventsForWeek(sourceWeekStart);

  if (sourceEvents.length === 0) {
    return [];
  }

  const supabase = getCalendarAdminClient();
  await supabase.from("calendar_events").delete().eq("week_start", targetWeekStart);

  const { data, error } = await supabase
    .from("calendar_events")
    .insert(
      sourceEvents.map((event) => ({
        week_start: targetWeekStart,
        day_of_week: event.day_of_week,
        start_time: event.start_time,
        end_time: event.end_time,
        title: event.title,
        subtitle: event.subtitle,
        price_label: event.price_label,
        recurrence_note: event.recurrence_note,
        category: event.category,
        sort_order: event.sort_order,
      })),
    )
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}
