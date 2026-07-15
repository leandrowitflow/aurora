import {
  CALENDAR_ADMIN_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/calendar/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = body.password?.trim() ?? "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Palavra-passe inválida." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    CALENDAR_ADMIN_COOKIE,
    createAdminSessionToken(),
    getAdminSessionCookieOptions(),
  );
  return response;
}
