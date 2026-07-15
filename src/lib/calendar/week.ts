const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("pt-PT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function parseWeekParam(value: string | null | undefined): Date {
  if (!value) {
    return getMonday(new Date());
  }

  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return getMonday(new Date());
  }

  return getMonday(parsed);
}

export function getMonday(date: Date): Date {
  const monday = new Date(date);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  monday.setHours(12, 0, 0, 0);
  return monday;
}

export function formatWeekStart(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function shiftWeek(date: Date, weeks: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + weeks * 7);
  return next;
}

export function formatWeekRangeLabel(weekStart: Date): string {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 5);
  return `${WEEKDAY_FORMATTER.format(weekStart)} – ${WEEKDAY_FORMATTER.format(weekEnd)}`;
}

export function isCurrentWeek(weekStart: Date): boolean {
  return formatWeekStart(weekStart) === formatWeekStart(getMonday(new Date()));
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatTimeLabel(time: string): string {
  const [hours, minutes] = time.split(":");
  return `${hours}h${minutes}`;
}
