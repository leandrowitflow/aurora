import { requireCalendarAdmin } from "@/lib/calendar/auth";
import { copyWeekEvents } from "@/lib/calendar/events";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!(await requireCalendarAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json()) as {
    sourceWeekStart?: string;
    targetWeekStart?: string;
  };

  if (!body.sourceWeekStart || !body.targetWeekStart) {
    return NextResponse.json({ error: "Semanas inválidas." }, { status: 400 });
  }

  try {
    const events = await copyWeekEvents(body.sourceWeekStart, body.targetWeekStart);
    return NextResponse.json({ events, count: events.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao copiar semana.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
