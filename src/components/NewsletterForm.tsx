"use client";

import Image from "next/image";
import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "newsletter",
          data: { email: trimmed },
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível subscrever.");
      }

      setSubmitted(true);
      setEmail("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível subscrever.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <p className="mt-6 font-[family-name:var(--font-roboto)] text-base text-white/90">
        Obrigado pela subscrição.
      </p>
    );
  }

  return (
    <form className="mt-6 max-w-[360px]" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="O seu e-mail"
          required
          disabled={submitting}
          className="h-12 flex-1 rounded-full bg-white px-5 font-[family-name:var(--font-roboto)] text-sm text-[#1c2544] outline-none disabled:opacity-70"
        />
        <button
          type="submit"
          disabled={submitting || !email.trim()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Subscrever newsletter"
        >
          <Image
            src="/images/icon-arrow-submit.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-sm text-white/90" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
