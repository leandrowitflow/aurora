"use client";

import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import type { CalendarEvent, CalendarEventInput } from "@/lib/calendar/types";
import {
  CALENDAR_CATEGORIES,
  CALENDAR_CATEGORY_LABELS,
  CALENDAR_DAY_LABELS,
} from "@/lib/calendar/types";
import { formatWeekStart, shiftWeek } from "@/lib/calendar/week";
import { useEffect, useMemo, useState } from "react";

type CalendarAdminPanelProps = {
  initialWeekStart: string;
  initialEvents: CalendarEvent[];
  configured: boolean;
};

const EMPTY_FORM: CalendarEventInput = {
  week_start: "",
  day_of_week: 1,
  start_time: "10:00",
  end_time: "11:00",
  title: "",
  subtitle: "",
  price_label: "",
  recurrence_note: "",
  category: "art",
  sort_order: 0,
};

export function CalendarAdminPanel({
  initialWeekStart,
  initialEvents,
  configured,
}: CalendarAdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState<CalendarEventInput>({
    ...EMPTY_FORM,
    week_start: initialWeekStart,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/calendar/admin/session")
      .then((response) => response.json())
      .then((data: { authenticated?: boolean }) => {
        if (data.authenticated) {
          setAuthenticated(true);
        }
      })
      .catch(() => undefined);
  }, []);

  const sourceWeekStart = useMemo(
    () => formatWeekStart(shiftWeek(new Date(`${weekStart}T12:00:00`), -1)),
    [weekStart],
  );

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError(null);
    setBusy(true);

    try {
      const response = await fetch("/api/calendar/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Palavra-passe inválida.");
      }

      setAuthenticated(true);
      setPassword("");
    } catch (loginFailure) {
      setLoginError(
        loginFailure instanceof Error
          ? loginFailure.message
          : "Não foi possível iniciar sessão.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/calendar/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }

  function resetForm() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, week_start: weekStart });
  }

  function startEdit(event: CalendarEvent) {
    setEditingId(event.id);
    setForm({
      week_start: event.week_start,
      day_of_week: event.day_of_week,
      start_time: event.start_time,
      end_time: event.end_time,
      title: event.title,
      subtitle: event.subtitle,
      price_label: event.price_label,
      recurrence_note: event.recurrence_note,
      category: event.category,
      sort_order: event.sort_order,
    });
    setStatus(null);
  }

  async function saveEvent(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);

    const payload = { ...form, week_start: weekStart };

    try {
      const response = await fetch(
        editingId ? `/api/calendar/admin/events/${editingId}` : "/api/calendar/admin/events",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = (await response.json()) as { event?: CalendarEvent; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao guardar evento.");
      }

      if (data.event) {
        setEvents((current) => {
          if (editingId) {
            return current.map((item) => (item.id === editingId ? data.event! : item));
          }
          return [...current, data.event!].sort((a, b) => {
            if (a.day_of_week !== b.day_of_week) {
              return a.day_of_week - b.day_of_week;
            }
            return a.start_time.localeCompare(b.start_time);
          });
        });
      }

      resetForm();
      setStatus(editingId ? "Evento atualizado." : "Evento criado.");
    } catch (saveError) {
      setStatus(
        saveError instanceof Error ? saveError.message : "Erro ao guardar evento.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function deleteEvent() {
    if (!editingId || !window.confirm("Eliminar este evento?")) {
      return;
    }

    setBusy(true);
    setStatus(null);

    try {
      const response = await fetch(`/api/calendar/admin/events/${editingId}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao eliminar evento.");
      }

      setEvents((current) => current.filter((item) => item.id !== editingId));
      resetForm();
      setStatus("Evento eliminado.");
    } catch (deleteError) {
      setStatus(
        deleteError instanceof Error ? deleteError.message : "Erro ao eliminar evento.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function copyWeek() {
    if (
      !window.confirm(
        `Copiar a semana ${sourceWeekStart} para ${weekStart}? Os eventos atuais desta semana serão substituídos.`,
      )
    ) {
      return;
    }

    setBusy(true);
    setStatus(null);

    try {
      const response = await fetch("/api/calendar/admin/copy-week", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceWeekStart,
          targetWeekStart: weekStart,
        }),
      });
      const data = (await response.json()) as {
        events?: CalendarEvent[];
        count?: number;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao copiar semana.");
      }

      setEvents(data.events ?? []);
      setStatus(`Semana copiada (${data.count ?? 0} eventos).`);
    } catch (copyError) {
      setStatus(
        copyError instanceof Error ? copyError.message : "Erro ao copiar semana.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (!authenticated) {
    return (
      <form className="calendar-admin-login form-panel" onSubmit={handleLogin}>
        <h1 className="heading-section">Administração do calendário</h1>
        <p className="body-text mt-4 text-olive/80">
          Introduza a palavra-passe para gerir os eventos semanais.
        </p>
        <label className="calendar-admin-field mt-8 block">
          <span className="label-olive">Palavra-passe</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="calendar-admin-input"
            required
            autoComplete="current-password"
          />
        </label>
        {loginError ? (
          <p className="calendar-admin-status calendar-admin-status--error" role="alert">
            {loginError}
          </p>
        ) : null}
        <button type="submit" className="calendar-admin-btn mt-6" disabled={busy}>
          Entrar
        </button>
      </form>
    );
  }

  return (
    <div className="calendar-admin">
      <div className="calendar-admin__header">
        <div>
          <h1 className="heading-section">Administração do calendário</h1>
          <p className="body-text mt-3 text-olive/80">
            Adicione, edite ou copie eventos semana a semana.
          </p>
        </div>
        <button type="button" className="calendar-admin-btn calendar-admin-btn--ghost" onClick={handleLogout}>
          Terminar sessão
        </button>
      </div>

      <div className="calendar-admin__actions">
        <button type="button" className="calendar-admin-btn" onClick={resetForm} disabled={busy}>
          Novo evento
        </button>
        <button type="button" className="calendar-admin-btn" onClick={copyWeek} disabled={busy}>
          Copiar semana anterior
        </button>
      </div>

      <WeeklyCalendar
        initialWeekStart={weekStart}
        initialEvents={events}
        configured={configured}
        adminMode
        onEventClick={startEdit}
        onWeekChange={(nextWeekStart) => {
          setWeekStart(nextWeekStart);
          setForm((current) => ({ ...current, week_start: nextWeekStart }));
        }}
        onEventsLoaded={(_nextWeekStart, nextEvents) => {
          setEvents(nextEvents);
        }}
      />

      <form className="calendar-admin-form form-panel" onSubmit={saveEvent}>
        <h2 className="heading-subsection">
          {editingId ? "Editar evento" : "Novo evento"}
        </h2>

        <div className="calendar-admin-form__grid">
          <label className="calendar-admin-field">
            <span className="label-olive">Dia</span>
            <select
              value={form.day_of_week}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  day_of_week: Number(event.target.value),
                }))
              }
              className="calendar-admin-input"
            >
              {CALENDAR_DAY_LABELS.map((label, index) => (
                <option key={label} value={index + 1}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="calendar-admin-field">
            <span className="label-olive">Categoria</span>
            <select
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  category: event.target.value as CalendarEventInput["category"],
                }))
              }
              className="calendar-admin-input"
            >
              {CALENDAR_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {CALENDAR_CATEGORY_LABELS[category]}
                </option>
              ))}
            </select>
          </label>

          <label className="calendar-admin-field">
            <span className="label-olive">Início</span>
            <input
              type="time"
              value={form.start_time}
              onChange={(event) =>
                setForm((current) => ({ ...current, start_time: event.target.value }))
              }
              className="calendar-admin-input"
              required
            />
          </label>

          <label className="calendar-admin-field">
            <span className="label-olive">Fim</span>
            <input
              type="time"
              value={form.end_time}
              onChange={(event) =>
                setForm((current) => ({ ...current, end_time: event.target.value }))
              }
              className="calendar-admin-input"
              required
            />
          </label>
        </div>

        <label className="calendar-admin-field">
          <span className="label-olive">Título</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
            className="calendar-admin-input"
            required
          />
        </label>

        <label className="calendar-admin-field">
          <span className="label-olive">Público / descrição curta</span>
          <input
            type="text"
            value={form.subtitle}
            onChange={(event) =>
              setForm((current) => ({ ...current, subtitle: event.target.value }))
            }
            className="calendar-admin-input"
          />
        </label>

        <div className="calendar-admin-form__grid">
          <label className="calendar-admin-field">
            <span className="label-olive">Preço</span>
            <input
              type="text"
              value={form.price_label}
              onChange={(event) =>
                setForm((current) => ({ ...current, price_label: event.target.value }))
              }
              className="calendar-admin-input"
              placeholder="gratuito, €10"
            />
          </label>

          <label className="calendar-admin-field">
            <span className="label-olive">Recorrência</span>
            <input
              type="text"
              value={form.recurrence_note}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  recurrence_note: event.target.value,
                }))
              }
              className="calendar-admin-input"
              placeholder="quinzenal, mensal"
            />
          </label>
        </div>

        {status ? <p className="calendar-admin-status">{status}</p> : null}

        <div className="calendar-admin-form__actions">
          <button type="submit" className="calendar-admin-btn" disabled={busy}>
            {editingId ? "Guardar alterações" : "Criar evento"}
          </button>
          {editingId ? (
            <button
              type="button"
              className="calendar-admin-btn calendar-admin-btn--danger"
              onClick={deleteEvent}
              disabled={busy}
            >
              Eliminar
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
