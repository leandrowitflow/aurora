export const COOKIE_CONSENT_KEY = "aurora-cookie-consent";

export type CookieConsentValue = "accepted";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" ? "accepted" : null;
}

export function setCookieConsent(value: CookieConsentValue) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
}
