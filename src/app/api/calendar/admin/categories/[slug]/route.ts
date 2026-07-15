import { requireCalendarAdmin } from "@/lib/calendar/auth";
import {
  deleteCalendarCategory,
  updateCalendarCategory,
} from "@/lib/calendar/categories";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireCalendarAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { slug } = await context.params;
  const body = (await request.json()) as {
    label?: string;
    color?: string;
    sort_order?: number;
  };

  try {
    const category = await updateCalendarCategory(slug, body);
    return NextResponse.json({ category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao atualizar categoria.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireCalendarAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { slug } = await context.params;

  try {
    await deleteCalendarCategory(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao eliminar categoria.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
