import { requireCalendarAdmin } from "@/lib/calendar/auth";
import { createCalendarCategory } from "@/lib/calendar/categories";
import type { CalendarCategoryInput } from "@/lib/calendar/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!(await requireCalendarAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json()) as CalendarCategoryInput;

  if (!body.label?.trim() || !body.color) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  try {
    const category = await createCalendarCategory(body);
    return NextResponse.json({ category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao criar categoria.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
