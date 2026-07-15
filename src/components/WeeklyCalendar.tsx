"use client";

import { Button } from "@/components/Button";
import type { CalendarEvent } from "@/lib/calendar/types";
import {
  CALENDAR_CATEGORY_LABELS,
  CALENDAR_DAY_LABELS,
  CALENDAR_END_HOUR,
  CALENDAR_START_HOUR,
} from "@/lib/calendar/types";
import {
  formatTimeLabel,
  formatWeekRangeLabel,
  formatWeekStart,
  isCurrentWeek,
  shiftWeek,
  timeToMinutes,
} from "@/lib/calendar/week";
import { useCallback, useEffect, useMemo, useState } from "react";

const HOUR_HEIGHT = 64;
const HOUR_COUNT = CALENDAR_END_HOUR - CALENDAR_START_HOUR;

type WeeklyCalendarProps = {
  initialWeekStart: string;
  initialEvents: CalendarEvent[];
  configured: boolean;
  adminMode?: boolean;
  onEventClick?: (event: CalendarEvent) => void;
  onWeekChange?: (weekStart: string) => void;
  onEventsLoaded?: (weekStart: string, events: CalendarEvent[]) => void;
};

function categoryClass(category: CalendarEvent["category"]): string {
  return `weekly-calendar__event weekly-calendar__event--${category}`;
}

export function WeeklyCalendar({
  initialWeekStart,
  initialEvents,
  configured,
  adminMode = false,
  onEventClick,
  onWeekChange,
  onEventsLoaded,
}: WeeklyCalendarProps) {
  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [events, setEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weekDate = useMemo(() => new Date(`${weekStart}T12:00:00`), [weekStart]);

  const loadWeek = useCallback(async (nextWeekStart: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/calendar?week=${nextWeekStart}`);
      const data = (await response.json()) as {
        events?: CalendarEvent[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível carregar o calendário.");
      }

      setWeekStart(nextWeekStart);
      setEvents(data.events ?? []);
      onWeekChange?.(nextWeekStart);
      onEventsLoaded?.(nextWeekStart, data.events ?? []);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Não foi possível carregar o calendário.",
      );
    } finally {
      setLoading(false);
    }
  }, [onWeekChange, onEventsLoaded]);

  useEffect(() => {
    setWeekStart(initialWeekStart);
    setEvents(initialEvents);
  }, [initialWeekStart, initialEvents]);

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

      <div className="weekly-calendar__scroll">
        <div
          className="weekly-calendar__grid"
          style={{ "--hour-height": `${HOUR_HEIGHT}px` } as React.CSSProperties}
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
                {hours.map((hour) => (
                  <div key={hour} className="weekly-calendar__hour-cell" />
                ))}
                {dayEvents.map((event) => {
                  const start = timeToMinutes(event.start_time);
                  const end = timeToMinutes(event.end_time);
                  const gridStart = CALENDAR_START_HOUR * 60;
                  const top = ((start - gridStart) / 60) * HOUR_HEIGHT;
                  const height = ((end - start) / 60) * HOUR_HEIGHT;
                  const eventContent = (
                    <>
                      <span className="weekly-calendar__event-time">
                        {formatTimeLabel(event.start_time)} –{" "}
                        {formatTimeLabel(event.end_time)}
                      </span>
                      <span className="weekly-calendar__event-title">{event.title}</span>
                      {event.subtitle ? (
                        <span className="weekly-calendar__event-subtitle">
                          {event.subtitle}
                        </span>
                      ) : null}
                      {event.price_label ? (
                        <span className="weekly-calendar__event-price">
                          ({event.price_label})
                        </span>
                      ) : null}
                      {event.recurrence_note ? (
                        <span className="weekly-calendar__event-recurrence">
                          {event.recurrence_note}
                        </span>
                      ) : null}
                    </>
                  );

                  if (adminMode && onEventClick) {
                    return (
                      <button
                        key={event.id}
                        type="button"
                        className={categoryClass(event.category)}
                        style={{ top: `${top}px`, height: `${height}px` }}
                        onClick={() => onEventClick(event)}
                      >
                        {eventContent}
                      </button>
                    );
                  }

                  return (
                    <article
                      key={event.id}
                      className={categoryClass(event.category)}
                      style={{ top: `${top}px`, height: `${height}px` }}
                    >
                      {eventContent}
                    </article>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="weekly-calendar__legend">
        {Object.entries(CALENDAR_CATEGORY_LABELS).map(([key, label]) => (
          <span key={key} className={`weekly-calendar__legend-item weekly-calendar__legend-item--${key}`}>
            {label}
          </span>
        ))}
      </div>

      {!adminMode ? (
        <div className="weekly-calendar__cta">
          <Button href="/inscricoes" label="Reservar atividade" />
        </div>
      ) : null}
    </div>
  );
}
