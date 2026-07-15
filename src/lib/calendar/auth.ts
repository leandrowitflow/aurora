import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const CALENDAR_ADMIN_COOKIE = "calendar_admin";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  exp: number;
};

function getSessionSecret(): string {
  const secret = process.env.CALENDAR_SESSION_SECRET;
  if (!secret) {
    throw new Error("CALENDAR_SESSION_SECRET is not configured.");
  }
  return secret;
}

function signPayload(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

function encodeSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(body);
  return `${body}.${signature}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return null;
  }

  const expected = signPayload(body);
  const actual = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actual.length !== expectedBuffer.length ||
    !timingSafeEqual(actual, expectedBuffer)
  ) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.CALENDAR_ADMIN_PASSWORD;
  if (!expected) {
    return false;
  }

  const actualBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createAdminSessionToken(): string {
  return encodeSession({
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  });
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export async function isCalendarAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CALENDAR_ADMIN_COOKIE)?.value;
  if (!token) {
    return false;
  }

  const payload = decodeSession(token);
  if (!payload) {
    return false;
  }

  return payload.exp > Math.floor(Date.now() / 1000);
}

export async function requireCalendarAdmin(): Promise<boolean> {
  return isCalendarAdminAuthenticated();
}
