export type CalendarCategory = string;

export type CalendarCategoryRecord = {
  slug: CalendarCategory;
  label: string;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CalendarCategoryInput = {
  label: string;
  color: string;
  slug?: string;
  sort_order?: number;
};

export type CalendarEvent = {
  id: string;
  week_start: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  title: string;
  subtitle: string;
  price_label: string;
  recurrence_note: string;
  category: CalendarCategory;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CalendarEventInput = {
  week_start: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  title: string;
  subtitle?: string;
  price_label?: string;
  recurrence_note?: string;
  category: CalendarCategory;
  sort_order?: number;
};

export const CALENDAR_DAY_LABELS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;

export const DEFAULT_CALENDAR_CATEGORIES: CalendarCategoryRecord[] = [
  {
    slug: "meeting",
    label: "Encontros e participação",
    color: "#fff3a8",
    sort_order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    slug: "dance",
    label: "Dança e movimento",
    color: "#b8dff5",
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    slug: "art",
    label: "Ateliers expressivos",
    color: "#f5c4d4",
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    slug: "garden",
    label: "Horta comunitária",
    color: "#c8e6b8",
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
];

export const CALENDAR_FALLBACK_COLOR = "#f0efe8";
export const DEFAULT_EVENT_PRICE_LABEL = "gratuito";

export function getEventPriceLabel(priceLabel?: string | null): string {
  const trimmed = priceLabel?.trim();
  return trimmed || DEFAULT_EVENT_PRICE_LABEL;
}

export const CALENDAR_START_HOUR = 10;
export const CALENDAR_END_HOUR = 20;

export function getCategoryLabel(
  categories: CalendarCategoryRecord[],
  slug: CalendarCategory,
): string {
  return categories.find((category) => category.slug === slug)?.label ?? slug;
}

export function getCategoryColor(
  categories: CalendarCategoryRecord[],
  slug: CalendarCategory,
): string {
  return (
    categories.find((category) => category.slug === slug)?.color ??
    CALENDAR_FALLBACK_COLOR
  );
}

export function buildCategoryMap(
  categories: CalendarCategoryRecord[],
): Map<CalendarCategory, CalendarCategoryRecord> {
  return new Map(categories.map((category) => [category.slug, category]));
}
