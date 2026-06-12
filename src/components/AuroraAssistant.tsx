"use client";

import { AURORA_SUGGESTIONS } from "@/lib/aurora-assistant";
import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function getMessageText(message: { parts: Array<{ type: string; text?: string }> }) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

export function AuroraAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat();

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, status]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isBusy) {
      return;
    }

    sendMessage({ text });
    setInput("");
  }

  function handleSuggestion(text: string) {
    if (isBusy) {
      return;
    }
    sendMessage({ text });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          className="assistant-backdrop"
          aria-label="Fechar assistente"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="assistant-root">
        {open ? (
          <div
            className="assistant-panel assistant-panel-open"
            role="dialog"
            aria-labelledby="assistant-title"
            aria-modal="true"
          >
            <header className="assistant-header">
              <div className="assistant-header-brand">
                <div className="assistant-avatar" aria-hidden="true">
                  <Image
                    src="/images/logo.svg"
                    alt=""
                    width={36}
                    height={36}
                  />
                </div>
                <div>
                  <p className="assistant-eyebrow">Coletivo Aurora</p>
                  <h2 id="assistant-title" className="assistant-title">
                    Assistente
                  </h2>
                </div>
              </div>
              <button
                type="button"
                className="assistant-close"
                onClick={() => setOpen(false)}
                aria-label="Fechar assistente"
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="assistant-messages" aria-live="polite">
              {messages.length === 0 ? (
                <div className="assistant-welcome">
                  <h3 className="assistant-welcome-title">Como posso ajudar?</h3>
                  <div className="assistant-welcome-rule" aria-hidden="true" />
                  <p className="assistant-welcome-text">
                    Pergunte sobre atividades, inscrições, Tecendo gerações ou
                    contactos — respondo com base no que o Aurora partilha
                    publicamente.
                  </p>
                  <p className="assistant-suggestions-label">Sugestões</p>
                  <ul className="assistant-suggestions">
                    {AURORA_SUGGESTIONS.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          type="button"
                          className="assistant-suggestion"
                          onClick={() => handleSuggestion(suggestion)}
                          disabled={isBusy}
                        >
                          <span>{suggestion}</span>
                          <Image
                            src="/images/icon-arrow-olive.svg"
                            alt=""
                            width={16}
                            height={16}
                            aria-hidden
                            className="assistant-suggestion-arrow"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {messages.map((message) => {
                const text = getMessageText(message);
                if (!text) {
                  return null;
                }

                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`assistant-row ${
                      isUser ? "assistant-row-user" : "assistant-row-assistant"
                    }`}
                  >
                    {!isUser ? (
                      <div className="assistant-row-avatar" aria-hidden="true">
                        <Image
                          src="/images/logo.svg"
                          alt=""
                          width={28}
                          height={28}
                        />
                      </div>
                    ) : null}

                    <div
                      className={`assistant-bubble ${
                        isUser ? "assistant-bubble-user" : "assistant-bubble-assistant"
                      }`}
                    >
                      <p className="assistant-bubble-label">
                        {isUser ? "Você" : "Aurora"}
                      </p>
                      <div className="assistant-bubble-text">{text}</div>
                    </div>
                  </div>
                );
              })}

              {status === "submitted" ? (
                <div className="assistant-row assistant-row-assistant">
                  <div className="assistant-row-avatar" aria-hidden="true">
                    <Image
                      src="/images/logo.svg"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="assistant-bubble assistant-bubble-assistant">
                    <p className="assistant-bubble-label">Aurora</p>
                    <div className="assistant-typing" aria-label="A responder">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              ) : null}

              {error ? (
                <p className="assistant-error" role="alert">
                  Não foi possível obter resposta. Tente novamente ou escreva para{" "}
                  <a href="mailto:somosaurora@gmail.com">somosaurora@gmail.com</a>
                </p>
              ) : null}

              <div ref={messagesEndRef} />
            </div>

            <form className="assistant-form" onSubmit={handleSubmit}>
              <div className="assistant-input-wrap">
                <label htmlFor="assistant-input" className="sr-only">
                  A sua pergunta
                </label>
                <textarea
                  ref={inputRef}
                  id="assistant-input"
                  className="assistant-input"
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escreva a sua pergunta..."
                  disabled={isBusy}
                />
              </div>
              <button
                type="submit"
                className="assistant-send"
                disabled={isBusy || !input.trim()}
                aria-label="Enviar mensagem"
              >
                <Image
                  src="/images/icon-arrow-olive.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              </button>
            </form>
          </div>
        ) : null}

        <button
          type="button"
          className={`assistant-toggle ${open ? "assistant-toggle-open" : ""}`}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={open ? "assistant-title" : undefined}
          aria-label={open ? "Fechar assistente Aurora" : "Abrir assistente Aurora"}
        >
          <span className="assistant-toggle-ring" aria-hidden="true" />
          {open ? (
            <span className="assistant-toggle-close" aria-hidden="true">
              ×
            </span>
          ) : (
            <span className="assistant-toggle-logo">
              <Image
                src="/images/logo.svg"
                alt=""
                width={34}
                height={34}
                priority
              />
            </span>
          )}
        </button>
      </div>
    </>
  );
}
