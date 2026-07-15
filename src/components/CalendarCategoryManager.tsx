"use client";

import type { CalendarCategoryRecord } from "@/lib/calendar/types";
import { useState } from "react";

type CalendarCategoryManagerProps = {
  categories: CalendarCategoryRecord[];
  onChange: (categories: CalendarCategoryRecord[]) => void;
  disabled?: boolean;
};

type CategoryDraft = {
  label: string;
  color: string;
};

const EMPTY_DRAFT: CategoryDraft = {
  label: "",
  color: "#fff3a8",
};

export function CalendarCategoryManager({
  categories,
  onChange,
  disabled = false,
}: CalendarCategoryManagerProps) {
  const [draft, setDraft] = useState<CategoryDraft>(EMPTY_DRAFT);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<CategoryDraft>(EMPTY_DRAFT);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/calendar/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = (await response.json()) as {
        category?: CalendarCategoryRecord;
        error?: string;
      };

      if (!response.ok || !data.category) {
        throw new Error(data.error ?? "Erro ao criar categoria.");
      }

      onChange(
        [...categories, data.category].sort((a, b) => a.sort_order - b.sort_order),
      );
      setDraft(EMPTY_DRAFT);
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Erro ao criar categoria.",
      );
    } finally {
      setBusy(false);
    }
  }

  function startEdit(category: CalendarCategoryRecord) {
    setEditingSlug(category.slug);
    setEditDraft({ label: category.label, color: category.color });
    setError(null);
  }

  function cancelEdit() {
    setEditingSlug(null);
    setEditDraft(EMPTY_DRAFT);
  }

  async function handleUpdate(slug: string) {
    setBusy(true);
    setError(null);

    try {
      const response = await fetch(`/api/calendar/admin/categories/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDraft),
      });
      const data = (await response.json()) as {
        category?: CalendarCategoryRecord;
        error?: string;
      };

      if (!response.ok || !data.category) {
        throw new Error(data.error ?? "Erro ao atualizar categoria.");
      }

      onChange(
        categories
          .map((category) => (category.slug === slug ? data.category! : category))
          .sort((a, b) => a.sort_order - b.sort_order),
      );
      cancelEdit();
    } catch (updateError) {
      setError(
        updateError instanceof Error ? updateError.message : "Erro ao atualizar categoria.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(slug: string, label: string) {
    if (!window.confirm(`Eliminar a categoria "${label}"?`)) {
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const response = await fetch(`/api/calendar/admin/categories/${slug}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao eliminar categoria.");
      }

      onChange(categories.filter((category) => category.slug !== slug));
      if (editingSlug === slug) {
        cancelEdit();
      }
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Erro ao eliminar categoria.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="calendar-admin-categories">
      <div className="calendar-admin-categories__header">
        <h2 className="heading-subsection">Categorias</h2>
        <p className="body-text mt-2 text-olive/80">
          Crie categorias com cor personalizada. Aparecem na legenda e ao criar eventos.
        </p>
      </div>

      <ul className="calendar-admin-categories__list">
        {categories.map((category) => (
          <li key={category.slug} className="calendar-admin-categories__item">
            {editingSlug === category.slug ? (
              <div className="calendar-admin-categories__edit">
                <input
                  type="text"
                  value={editDraft.label}
                  onChange={(event) =>
                    setEditDraft((current) => ({ ...current, label: event.target.value }))
                  }
                  className="calendar-admin-input"
                  disabled={busy}
                />
                <input
                  type="color"
                  value={editDraft.color}
                  onChange={(event) =>
                    setEditDraft((current) => ({ ...current, color: event.target.value }))
                  }
                  className="calendar-admin-color-input"
                  disabled={busy}
                  aria-label={`Cor de ${category.label}`}
                />
                <button
                  type="button"
                  className="calendar-admin-btn"
                  onClick={() => handleUpdate(category.slug)}
                  disabled={busy}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="calendar-admin-btn calendar-admin-btn--ghost"
                  onClick={cancelEdit}
                  disabled={busy}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="calendar-admin-categories__row">
                <span
                  className="calendar-admin-categories__swatch"
                  style={{ backgroundColor: category.color }}
                  aria-hidden="true"
                />
                <span className="calendar-admin-categories__label">{category.label}</span>
                <div className="calendar-admin-categories__actions">
                  <button
                    type="button"
                    className="calendar-admin-btn calendar-admin-btn--ghost"
                    onClick={() => startEdit(category)}
                    disabled={busy || disabled}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="calendar-admin-btn calendar-admin-btn--danger"
                    onClick={() => handleDelete(category.slug, category.label)}
                    disabled={busy || disabled}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <form className="calendar-admin-categories__create" onSubmit={handleCreate}>
        <label className="calendar-admin-field">
          <span className="label-olive">Nova categoria</span>
          <input
            type="text"
            value={draft.label}
            onChange={(event) =>
              setDraft((current) => ({ ...current, label: event.target.value }))
            }
            className="calendar-admin-input"
            placeholder="Ex.: Oficinas de verão"
            required
            disabled={busy || disabled}
          />
        </label>
        <label className="calendar-admin-field calendar-admin-field--color">
          <span className="label-olive">Cor</span>
          <input
            type="color"
            value={draft.color}
            onChange={(event) =>
              setDraft((current) => ({ ...current, color: event.target.value }))
            }
            className="calendar-admin-color-input"
            disabled={busy || disabled}
          />
        </label>
        <button type="submit" className="calendar-admin-btn" disabled={busy || disabled}>
          Criar categoria
        </button>
      </form>

      {error ? (
        <p className="calendar-admin-status calendar-admin-status--error" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
