import { isCalendarAdminAuthenticated } from "@/lib/calendar/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const authenticated = await isCalendarAdminAuthenticated();
  return NextResponse.json({ authenticated });
}
