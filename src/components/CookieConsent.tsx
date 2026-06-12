"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCookieConsent, setCookieConsent } from "@/lib/cookies";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!getCookieConsent()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (!visible) {
      root.style.removeProperty("--cookie-consent-offset");
      document.body.classList.remove("cookie-consent-visible");
      return;
    }

    document.body.classList.add("cookie-consent-visible");

    function updateOffset() {
      const height = bannerRef.current?.offsetHeight ?? 0;
      root.style.setProperty("--cookie-consent-offset", `${height}px`);
    }

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("resize", updateOffset);
      root.style.removeProperty("--cookie-consent-offset");
      document.body.classList.remove("cookie-consent-visible");
    };
  }, [visible]);

  function accept() {
    setCookieConsent("accepted");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <section
      ref={bannerRef}
      className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="cookie-consent-inner px-page">
        <div className="cookie-consent-copy">
          <p id="cookie-consent-title" className="cookie-consent-title">
            Cookies
          </p>
          <p id="cookie-consent-description" className="cookie-consent-text">
            Utilizamos cookies para análise estatística (Google Analytics) e
            para melhorar o site. Ao continuar, aceita a nossa{" "}
            <Link href="/transparencia" className="cookie-consent-link">
              política de privacidade
            </Link>
            .
          </p>
        </div>
        <button type="button" className="cookie-consent-accept" onClick={accept}>
          Aceitar
        </button>
      </div>
    </section>
  );
}
