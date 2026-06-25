"use client";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { getCookieConsent } from "@/lib/cookies";
import { useEffect, useState } from "react";

const CONSENT_EVENT = "aurora-cookie-consent";

type ConsentGoogleAnalyticsProps = {
  measurementId: string;
};

export function ConsentGoogleAnalytics({ measurementId }: ConsentGoogleAnalyticsProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function maybeEnable() {
      if (getCookieConsent() === "accepted") {
        setEnabled(true);
      }
    }

    maybeEnable();
    window.addEventListener(CONSENT_EVENT, maybeEnable);
    return () => window.removeEventListener(CONSENT_EVENT, maybeEnable);
  }, []);

  if (!enabled) {
    return null;
  }

  return <GoogleAnalytics measurementId={measurementId} />;
}

export { CONSENT_EVENT };
