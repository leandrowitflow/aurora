"use client";

import { Button } from "@/components/Button";
import type { CalendarCategoryRecord, CalendarEvent } from "@/lib/calendar/types";
import {
  CALENDAR_DAY_LABELS,
  CALENDAR_END_HOUR,
  CALENDAR_FALLBACK_COLOR,
  CALENDAR_START_HOUR,
  DEFAULT_CALENDAR_CATEGORIES,
  getCategoryColor,
  getEventPriceLabel,
} from "@/lib/calendar/types";
import { getCategorySurfaceStyles } from "@/lib/calendar/color";
import {
  formatTimeLabel,
  formatWeekRangeLabel,
  formatWeekStart,
  isCurrentWeek,
  shiftWeek,
  timeToMinutes,
} from "@/lib/calendar/week";
import { useCallback, useEffect, useMemo, useState } from "react";

const HOUR_HEIGHT_DESKTOP = 64;
const HOUR_HEIGHT_MOBILE = 52;
const MIN_TOUCH_EVENT_HEIGHT = 48;
const HOUR_COUNT = CALENDAR_END_HOUR - CALENDAR_START_HOUR;

export type CalendarSlotClick = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type CalendarDraftEvent = {
  day_of_week: number;
  start_time: string;
  end_time: string;
  title: string;
  category: CalendarEvent["category"];
};

type WeeklyCalendarProps = {
  initialWeekStart: string;
  initialEvents: CalendarEvent[];
  initialCategories?: CalendarCategoryRecord[];
  configured: boolean;
  adminMode?: boolean;
  onEventClick?: (event: CalendarEvent) => void;
  onSlotClick?: (slot: CalendarSlotClick) => void;
  selectedEventId?: string | null;
  activeSlot?: { dayOfWeek: number; startTime: string } | null;
  draftEvent?: CalendarDraftEvent | null;
  showReservationCta?: boolean;
  showClickHint?: boolean;
  onWeekChange?: (weekStart: string) => void;
  onEventsLoaded?: (weekStart: string, events: CalendarEvent[]) => void;
  onCategoriesLoaded?: (categories: CalendarCategoryRecord[]) => void;
};

function hourToTime(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

function eventBackgroundStyle(
  categories: CalendarCategoryRecord[],
  category: CalendarEvent["category"],
): React.CSSProperties {
  return getCategorySurfaceStyles(getCategoryColor(categories, category));
}

type EventDensity = "ultra" | "compact" | "full";

function getEventDensity(
  rawHeight: number,
  hourHeight: number,
  durationMinutes: number,
): EventDensity {
  if (durationMinutes <= 60 || rawHeight <= hourHeight * 1.15) {
    return "ultra";
  }

  if (durationMinutes <= 120 || rawHeight <= hourHeight * 2.1) {
    return "compact";
  }

  return "full";
}

function buildEventTooltip(event: CalendarEvent): string {
  const parts = [
    event.title,
    `${formatTimeLabel(event.start_time)} – ${formatTimeLabel(event.end_time)}`,
    getEventPriceLabel(event.price_label),
  ];

  if (event.subtitle) {
    parts.push(event.subtitle);
  }

  if (event.recurrence_note) {
    parts.push(event.recurrence_note);
  }

  return parts.join(" · ");
}

function renderEventTimeLine(event: CalendarEvent): string {
  const timeLabel = `${formatTimeLabel(event.start_time)} – ${formatTimeLabel(event.end_time)}`;
  return `${timeLabel} · ${getEventPriceLabel(event.price_label)}`;
}

function renderEventContent(
  event: CalendarEvent,
  density: EventDensity,
  clickable: boolean,
) {
  const timeLine = renderEventTimeLine(event);
  const action = clickable ? (
    <span className="weekly-calendar__event-action">Inscrever</span>
  ) : null;

  if (density === "ultra") {
    return (
      <>
        <div className="weekly-calendar__event-body">
          <span className="weekly-calendar__event-time weekly-calendar__event-time--clamp">
            {timeLine}
          </span>
          <span className="weekly-calendar__event-title weekly-calendar__event-title--clamp">
            {event.title}
          </span>
        </div>
        {action}
      </>
    );
  }

  if (density === "compact") {
    return (
      <>
        <div className="weekly-calendar__event-body">
          <span className="weekly-calendar__event-time weekly-calendar__event-time--clamp">
            {timeLine}
          </span>
          <span className="weekly-calendar__event-title weekly-calendar__event-title--clamp">
            {event.title}
          </span>
          {event.subtitle ? (
            <span className="weekly-calendar__event-subtitle weekly-calendar__event-subtitle--clamp">
              {event.subtitle}
            </span>
          ) : null}
        </div>
        {action}
      </>
    );
  }

  return (
    <>
      <div className="weekly-calendar__event-body">
        <span className="weekly-calendar__event-time weekly-calendar__event-time--clamp">
          {timeLine}
        </span>
        <span className="weekly-calendar__event-title weekly-calendar__event-title--clamp">
          {event.title}
        </span>
        {event.subtitle ? (
          <span className="weekly-calendar__event-subtitle weekly-calendar__event-subtitle--clamp">
            {event.subtitle}
          </span>
        ) : null}
        {event.recurrence_note ? (
          <span className="weekly-calendar__event-recurrence weekly-calendar__event-recurrence--clamp">
            {event.recurrence_note}
          </span>
        ) : null}
      </div>
      {action}
    </>
  );
}

export function WeeklyCalendar({
  initialWeekStart,
  initialEvents,
  initialCategories = DEFAULT_CALENDAR_CATEGORIES,
  configured,
  adminMode = false,
  onEventClick,
  onSlotClick,
  selectedEventId = null,
  activeSlot = null,
  draftEvent = null,
  showReservationCta = true,
  showClickHint = false,
  onWeekChange,
  onEventsLoaded,
  onCategoriesLoaded,
}: WeeklyCalendarProps) {
  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [events, setEvents] = useState(initialEvents);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hourHeight, setHourHeight] = useState(HOUR_HEIGHT_DESKTOP);

  const weekDate = useMemo(() => new Date(`${weekStart}T12:00:00`), [weekStart]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    function syncHourHeight() {
      setHourHeight(mediaQuery.matches ? HOUR_HEIGHT_MOBILE : HOUR_HEIGHT_DESKTOP);
    }

    syncHourHeight();
    mediaQuery.addEventListener("change", syncHourHeight);
    return () => mediaQuery.removeEventListener("change", syncHourHeight);
  }, []);

  const loadWeek = useCallback(async (nextWeekStart: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/calendar?week=${nextWeekStart}`);
      const data = (await response.json()) as {
        events?: CalendarEvent[];
        categories?: CalendarCategoryRecord[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível carregar o calendário.");
      }

      const nextCategories = data.categories ?? [];

      setWeekStart(nextWeekStart);
      setEvents(data.events ?? []);
      setCategories(nextCategories);
      onWeekChange?.(nextWeekStart);
      onEventsLoaded?.(nextWeekStart, data.events ?? []);
      onCategoriesLoaded?.(nextCategories);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Não foi possível carregar o calendário.",
      );
    } finally {
      setLoading(false);
    }
  }, [onWeekChange, onEventsLoaded, onCategoriesLoaded]);

  useEffect(() => {
    setWeekStart(initialWeekStart);
    setEvents(initialEvents);
  }, [initialWeekStart, initialEvents]);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const hours = useMemo(
    () =>
      Array.from({ length: HOUR_COUNT }, (_, index) => CALENDAR_START_HOUR + index),
    [],
  );

  return (
    <div className="weekly-calendar">
      <div className="weekly-calendar__toolbar">
        <div className="weekly-calendar__nav">
          <button
            type="button"
            className="weekly-calendar__nav-btn"
            onClick={() => loadWeek(formatWeekStart(shiftWeek(weekDate, -1)))}
            disabled={loading}
            aria-label="Semana anterior"
          >
            ←
          </button>
          <p className="weekly-calendar__week-label">{formatWeekRangeLabel(weekDate)}</p>
          <button
            type="button"
            className="weekly-calendar__nav-btn"
            onClick={() => loadWeek(formatWeekStart(shiftWeek(weekDate, 1)))}
            disabled={loading}
            aria-label="Semana seguinte"
          >
            →
          </button>
        </div>
        {!isCurrentWeek(weekDate) ? (
          <button
            type="button"
            className="weekly-calendar__today-btn"
            onClick={() => loadWeek(formatWeekStart(new Date()))}
            disabled={loading}
          >
            Esta semana
          </button>
        ) : null}
      </div>

      {adminMode && onSlotClick ? (
        <p className="weekly-calendar__admin-hint">
          Clique numa hora vazia no calendário para criar um evento, ou num evento
          existente para editar.
        </p>
      ) : null}

      {showClickHint && onEventClick ? (
        <p className="weekly-calendar__hint">
          <span className="weekly-calendar__hint-desktop">
            Clique numa atividade — o formulário de inscrição abre logo abaixo do
            calendário.
          </span>
          <span className="weekly-calendar__hint-mobile">
            Toque numa atividade — o formulário abre abaixo. Deslize o calendário
            para ver todos os dias.
          </span>
        </p>
      ) : null}

      {!configured ? (
        <p className="weekly-calendar__notice body-text">
          O calendário está temporariamente indisponível. Volte em breve ou contacte-nos.
        </p>
      ) : null}

      {error ? (
        <p className="weekly-calendar__error" role="alert">
          {error}
        </p>
      ) : null}

      {configured && !loading && !error && events.length === 0 ? (
        <p className="weekly-calendar__notice body-text">
          Sem atividades nesta semana. Use as setas para ver outras semanas.
        </p>
      ) : null}

      <div className="weekly-calendar__scroll">
        <div
          className="weekly-calendar__grid"
          style={{ "--hour-height": `${hourHeight}px` } as React.CSSProperties}
        >
          <div className="weekly-calendar__corner" aria-hidden />
          {CALENDAR_DAY_LABELS.map((label) => (
            <div key={label} className="weekly-calendar__day-head">
              {label}
            </div>
          ))}

          <div className="weekly-calendar__time-col">
            {hours.map((hour) => (
              <div key={hour} className="weekly-calendar__time-label">
                {`${hour}h00`}
              </div>
            ))}
          </div>

          {CALENDAR_DAY_LABELS.map((_, dayIndex) => {
            const dayEvents = events.filter((event) => event.day_of_week === dayIndex + 1);

            return (
              <div key={dayIndex} className="weekly-calendar__day-col">
                {hours.map((hour) => {
                  const startTime = hourToTime(hour);
                  const isActiveSlot =
                    activeSlot?.dayOfWeek === dayIndex + 1 &&
                    activeSlot.startTime === startTime;

                  if (adminMode && onSlotClick) {
                    return (
                      <button
                        key={hour}
                        type="button"
                        className={`weekly-calendar__hour-cell weekly-calendar__hour-cell--admin${
                          isActiveSlot ? " weekly-calendar__hour-cell--active" : ""
                        }`}
                        onClick={() =>
                          onSlotClick({
                            dayOfWeek: dayIndex + 1,
                            startTime,
                            endTime: hourToTime(Math.min(hour + 1, CALENDAR_END_HOUR)),
                          })
                        }
                        aria-label={`Criar evento ${CALENDAR_DAY_LABELS[dayIndex]} às ${hour}h00`}
                      />
                    );
                  }

                  return <div key={hour} className="weekly-calendar__hour-cell" />;
                })}
                {dayEvents.map((event) => {
                  const start = timeToMinutes(event.start_time);
                  const end = timeToMinutes(event.end_time);
                  const durationMinutes = end - start;
                  const gridStart = CALENDAR_START_HOUR * 60;
                  const top = ((start - gridStart) / 60) * hourHeight;
                  const rawHeight = ((end - start) / 60) * hourHeight;
                  const density = getEventDensity(rawHeight, hourHeight, durationMinutes);
                  const height =
                    onEventClick && rawHeight < MIN_TOUCH_EVENT_HEIGHT
                      ? MIN_TOUCH_EVENT_HEIGHT
                      : rawHeight;
                  const densityClass = ` weekly-calendar__event--${density}`;
                  const eventTooltip = buildEventTooltip(event);
                  const eventContent = renderEventContent(
                    event,
                    density,
                    Boolean(onEventClick) && !adminMode,
                  );

                  if (onEventClick) {
                    const isSelected = selectedEventId === event.id;

                    return (
                      <button
                        key={event.id}
                        type="button"
                        className={`weekly-calendar__event weekly-calendar__event--clickable${densityClass}${
                          isSelected ? " weekly-calendar__event--selected" : ""
                        }`}
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          ...eventBackgroundStyle(categories, event.category),
                        }}
                        onClick={() => onEventClick(event)}
                        aria-pressed={isSelected}
                        title={eventTooltip}
                      >
                        {eventContent}
                      </button>
                    );
                  }

                  return (
                    <article
                      key={event.id}
                      className={`weekly-calendar__event${densityClass}`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        ...eventBackgroundStyle(categories, event.category),
                      }}
                      title={eventTooltip}
                    >
                      {eventContent}
                    </article>
                  );
                })}
                {draftEvent && draftEvent.day_of_week === dayIndex + 1 ? (
                  (() => {
                    const draftStart = timeToMinutes(draftEvent.start_time);
                    const draftEnd = timeToMinutes(draftEvent.end_time);
                    const gridStart = CALENDAR_START_HOUR * 60;
                    const draftTop = ((draftStart - gridStart) / 60) * hourHeight;
                    const draftHeight = ((draftEnd - draftStart) / 60) * hourHeight;

                    return (
                      <div
                        className="weekly-calendar__event weekly-calendar__event--draft"
                        style={{
                          top: `${draftTop}px`,
                          height: `${draftHeight}px`,
                          ...eventBackgroundStyle(categories, draftEvent.category),
                        }}
                        aria-hidden="true"
                      >
                        <span className="weekly-calendar__event-time">
                          {formatTimeLabel(draftEvent.start_time)} –{" "}
                          {formatTimeLabel(draftEvent.end_time)}
                        </span>
                        <span className="weekly-calendar__event-title">
                          {draftEvent.title || "Novo evento"}
                        </span>
                      </div>
                    );
                  })()
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {showClickHint && onEventClick ? (
        <p className="weekly-calendar__scroll-hint" aria-hidden="true">
          Deslize para ver todos os dias
        </p>
      ) : null}

      <div className="weekly-calendar__legend">
        {categories.map((category) => (
          <span
            key={category.slug}
            className="weekly-calendar__legend-item"
            style={getCategorySurfaceStyles(category.color || CALENDAR_FALLBACK_COLOR)}
          >
            {category.label}
          </span>
        ))}
        {showClickHint && onEventClick ? (
          <span className="weekly-calendar__legend-hint">
            O formulário abre abaixo do calendário
          </span>
        ) : null}
      </div>

      {!adminMode && showReservationCta ? (
        <div className="weekly-calendar__cta">
          <Button href="/inscricoes" label="Reservar atividade" />
        </div>
      ) : null}
    </div>
  );
}
