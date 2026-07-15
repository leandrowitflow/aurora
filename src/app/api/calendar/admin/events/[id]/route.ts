import { requireCalendarAdmin } from "@/lib/calendar/auth";
import { deleteCalendarEvent, updateCalendarEvent } from "@/lib/calendar/events";
import type { CalendarEventInput } from "@/lib/calendar/types";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireCalendarAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as Partial<CalendarEventInput>;

  try {
    const event = await updateCalendarEvent(id, body);
    return NextResponse.json({ event });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao atualizar evento.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireCalendarAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await deleteCalendarEvent(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao eliminar evento.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
