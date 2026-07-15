import { getEventsForWeek } from "@/lib/calendar/events";
import { isCalendarConfigured } from "@/lib/calendar/supabase";
import { formatWeekStart, parseWeekParam } from "@/lib/calendar/week";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (!isCalendarConfigured()) {
    return NextResponse.json({ events: [], configured: false });
  }

  const { searchParams } = new URL(request.url);
  const weekStart = formatWeekStart(parseWeekParam(searchParams.get("week")));

  try {
    const events = await getEventsForWeek(weekStart);
    return NextResponse.json({ events, weekStart, configured: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load calendar.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
