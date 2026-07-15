import type {
  CalendarCategoryInput,
  CalendarCategoryRecord,
} from "@/lib/calendar/types";
import { getCalendarAdminClient, getCalendarPublicClient } from "@/lib/calendar/supabase";

const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;

function mapCategoryRow(row: Record<string, unknown>): CalendarCategoryRecord {
  return {
    slug: String(row.slug),
    label: String(row.label),
    color: String(row.color),
    sort_order: Number(row.sort_order ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export function slugifyCategoryLabel(label: string): string {
  const slug = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return slug || "categoria";
}

export function isValidCategoryColor(color: string): boolean {
  return HEX_COLOR_PATTERN.test(color);
}

export async function getCalendarCategories(): Promise<CalendarCategoryRecord[]> {
  const supabase = getCalendarPublicClient();
  const { data, error } = await supabase
    .from("calendar_categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("label", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapCategoryRow(row as Record<string, unknown>));
}

async function resolveUniqueSlug(baseSlug: string): Promise<string> {
  const supabase = getCalendarAdminClient();
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const { data, error } = await supabase
      .from("calendar_categories")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function createCalendarCategory(
  input: CalendarCategoryInput,
): Promise<CalendarCategoryRecord> {
  if (!input.label.trim()) {
    throw new Error("O nome da categoria é obrigatório.");
  }

  if (!isValidCategoryColor(input.color)) {
    throw new Error("Cor inválida.");
  }

  const supabase = getCalendarAdminClient();
  const baseSlug = slugifyCategoryLabel(input.slug?.trim() || input.label);
  const slug = await resolveUniqueSlug(baseSlug);

  const { data, error } = await supabase
    .from("calendar_categories")
    .insert({
      slug,
      label: input.label.trim(),
      color: input.color,
      sort_order: input.sort_order ?? 0,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCategoryRow(data as Record<string, unknown>);
}

export async function updateCalendarCategory(
  slug: string,
  input: Partial<Pick<CalendarCategoryInput, "label" | "color" | "sort_order">>,
): Promise<CalendarCategoryRecord> {
  if (input.color && !isValidCategoryColor(input.color)) {
    throw new Error("Cor inválida.");
  }

  const supabase = getCalendarAdminClient();
  const { data, error } = await supabase
    .from("calendar_categories")
    .update({
      ...(input.label !== undefined ? { label: input.label.trim() } : {}),
      ...(input.color !== undefined ? { color: input.color } : {}),
      ...(input.sort_order !== undefined ? { sort_order: input.sort_order } : {}),
    })
    .eq("slug", slug)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCategoryRow(data as Record<string, unknown>);
}

export async function deleteCalendarCategory(slug: string): Promise<void> {
  const supabase = getCalendarAdminClient();

  const { count, error: countError } = await supabase
    .from("calendar_events")
    .select("id", { count: "exact", head: true })
    .eq("category", slug);

  if (countError) {
    throw new Error(countError.message);
  }

  if ((count ?? 0) > 0) {
    throw new Error("Não é possível eliminar uma categoria com eventos associados.");
  }

  const { error } = await supabase.from("calendar_categories").delete().eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }
}

export async function categoryExists(slug: string): Promise<boolean> {
  const supabase = getCalendarPublicClient();
  const { data, error } = await supabase
    .from("calendar_categories")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}
