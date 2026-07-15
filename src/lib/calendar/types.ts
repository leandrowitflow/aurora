export const CALENDAR_CATEGORIES = ["meeting", "dance", "art", "garden"] as const;

export type CalendarCategory = (typeof CALENDAR_CATEGORIES)[number];

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

export const CALENDAR_CATEGORY_LABELS: Record<CalendarCategory, string> = {
  meeting: "Encontros e participação",
  dance: "Dança e movimento",
  art: "Ateliers expressivos",
  garden: "Horta comunitária",
};

export const CALENDAR_START_HOUR = 10;
export const CALENDAR_END_HOUR = 20;
