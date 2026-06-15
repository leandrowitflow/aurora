"use client";

import Image from "next/image";
import { useState } from "react";
import type { ContactFormType } from "@/lib/email";

interface FormField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

interface ReservationFormProps {
  formType: ContactFormType;
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

const inputClass =
  "w-full border-0 border-b border-olive/25 bg-transparent px-0 py-3 font-[family-name:var(--font-manrope)] text-base text-black outline-none transition-colors focus:border-olive";

export function ReservationForm({
  formType,
  title,
  description,
  fields,
  submitLabel = "Enviar",
}: ReservationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, data }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível enviar o pedido.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível enviar o pedido.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-panel-success">
        <p className="label-olive">Obrigado</p>
        <h3 className="heading-subsection mt-3">Pedido recebido</h3>
        <p className="body-text mt-4">
          Entraremos em contacto em breve através do e-mail indicado.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-panel">
      <h3 className="heading-subsection">{title}</h3>
      {description ? <p className="body-text mt-4">{description}</p> : null}

      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label
              htmlFor={field.name}
              className="mb-2 block font-[family-name:var(--font-manrope)] text-sm font-bold text-olive"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={4}
                className={inputClass}
                disabled={submitting}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                className={inputClass}
                defaultValue=""
                disabled={submitting}
              >
                <option value="" disabled>
                  Selecionar
                </option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                required={field.required}
                placeholder={field.placeholder}
                className={inputClass}
                disabled={submitting}
              />
            )}
          </div>
        ))}
      </div>

      {error ? (
        <p className="mt-6 text-sm font-bold text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="group mt-8 inline-flex h-[63px] items-center gap-3 border-2 border-olive px-8 font-[family-name:var(--font-manrope)] text-[20px] font-bold text-olive transition-colors hover:bg-olive/5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{submitting ? "A enviar..." : submitLabel}</span>
        <Image
          src="/images/icon-arrow-olive.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
