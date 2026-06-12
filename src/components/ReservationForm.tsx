"use client";

import Image from "next/image";
import { useState } from "react";

interface FormField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

interface ReservationFormProps {
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

const inputClass =
  "w-full border-0 border-b border-olive/25 bg-transparent px-0 py-3 font-[family-name:var(--font-manrope)] text-base text-black outline-none transition-colors focus:border-olive";

export function ReservationForm({
  title,
  description,
  fields,
  submitLabel = "Enviar",
}: ReservationFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                className={inputClass}
                defaultValue=""
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
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex h-[63px] items-center gap-3 border-2 border-olive px-8 font-[family-name:var(--font-manrope)] text-[20px] font-bold text-olive transition-colors hover:bg-olive/5"
      >
        <span>{submitLabel}</span>
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
