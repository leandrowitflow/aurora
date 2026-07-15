import { getCalendarCategories } from "@/lib/calendar/categories";
import { isCalendarConfigured } from "@/lib/calendar/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  if (!isCalendarConfigured()) {
    return NextResponse.json({ categories: [], configured: false });
  }

  try {
    const categories = await getCalendarCategories();
    return NextResponse.json({ categories, configured: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load categories.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
