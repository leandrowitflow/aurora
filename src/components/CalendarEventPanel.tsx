"use client";

import { ReservationForm } from "@/components/ReservationForm";
import type { CalendarCategoryRecord, CalendarEvent } from "@/lib/calendar/types";
import { CALENDAR_DAY_LABELS, getCategoryColor, getCategoryLabel } from "@/lib/calendar/types";
import { formatTimeLabel } from "@/lib/calendar/week";

function formatEventDescription(event: CalendarEvent): string {
  const day = CALENDAR_DAY_LABELS[event.day_of_week - 1];
  const time = `${formatTimeLabel(event.start_time)} – ${formatTimeLabel(event.end_time)}`;
  const parts = [day, time];

  if (event.subtitle) {
    parts.push(event.subtitle);
  }

  if (event.price_label) {
    parts.push(event.price_label);
  }

  return parts.join(" · ");
}

type CalendarEventPanelProps = {
  event: CalendarEvent | null;
  categories: CalendarCategoryRecord[];
  onClose: () => void;
};

export function CalendarEventPanel({
  event,
  categories,
  onClose,
}: CalendarEventPanelProps) {
  if (!event) {
    return (
      <section className="calendario-event-panel calendario-event-panel--empty" aria-live="polite">
        <div className="calendario-event-panel__placeholder">
          <span className="calendario-event-panel__arrow" aria-hidden="true">
            ↑
          </span>
          <p className="label-olive">Inscrição na atividade</p>
          <p className="heading-subsection mt-3">Escolha uma atividade no calendário</p>
          <p className="body-text mt-3">
            <span className="calendario-event-panel__placeholder-desktop">
              O formulário de inscrição abre aqui em baixo, com os detalhes da atividade
              já preenchidos.
            </span>
            <span className="calendario-event-panel__placeholder-mobile">
              Toque numa atividade no calendário acima — o formulário abre aqui com os
              detalhes já preenchidos.
            </span>
          </p>
        </div>
      </section>
    );
  }

  const activityLabel = event.subtitle
    ? `${event.title} — ${event.subtitle}`
    : event.title;
  const accentColor = getCategoryColor(categories, event.category);

  return (
    <section
      className="calendario-event-panel calendario-event-panel--open"
      style={{ "--calendario-event-accent": accentColor } as React.CSSProperties}
      aria-live="polite"
    >
      <header className="calendario-event-panel__header">
        <div>
          <p className="label-olive">Formulário de inscrição</p>
          <h2 className="calendario-event-panel__title">{event.title}</h2>
          <p className="calendario-event-panel__meta">{formatEventDescription(event)}</p>
        </div>
        <button
          type="button"
          className="calendario-event-panel__close"
          onClick={onClose}
        >
          Fechar
        </button>
      </header>

      <div className="calendario-event-panel__body">
        <ReservationForm
          key={event.id}
          formType="inscricao-calendario"
          title="Os seus dados"
          submitLabel="Enviar inscrição"
          hiddenFields={{
            atividade: activityLabel,
            dia: CALENDAR_DAY_LABELS[event.day_of_week - 1],
            horario: `${formatTimeLabel(event.start_time)} – ${formatTimeLabel(event.end_time)}`,
            semana: event.week_start,
            categoria: getCategoryLabel(categories, event.category),
            ...(event.price_label ? { preco: event.price_label } : {}),
          }}
          fields={[
            { name: "nome", label: "Nome", required: true },
            { name: "contacto", label: "Contacto", type: "tel", required: true },
            { name: "email", label: "E-mail", type: "email", required: true },
            {
              name: "localidade",
              label: "Localidade",
              placeholder: "Ex.: Olhão, Moncarapacho",
              required: true,
            },
            {
              name: "mensagem",
              label: "Mensagem (opcional)",
              type: "textarea",
              placeholder: "Dúvidas ou informação adicional",
            },
          ]}
        />
      </div>
    </section>
  );
}
