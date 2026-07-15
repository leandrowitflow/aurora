import { requireCalendarAdmin } from "@/lib/calendar/auth";
import { createCalendarEvent } from "@/lib/calendar/events";
import type { CalendarEventInput } from "@/lib/calendar/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!(await requireCalendarAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json()) as CalendarEventInput;

  if (
    !body.week_start ||
    !body.title ||
    !body.start_time ||
    !body.end_time ||
    !body.category ||
    body.day_of_week < 1 ||
    body.day_of_week > 6
  ) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  try {
    const event = await createCalendarEvent(body);
    return NextResponse.json({ event });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao criar evento.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
