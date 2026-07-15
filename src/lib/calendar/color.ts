import type { CSSProperties } from "react";
import { CALENDAR_FALLBACK_COLOR } from "@/lib/calendar/types";

function parseHexColor(hex: string): [number, number, number] | null {
  const normalized = hex.trim().replace(/^#/, "");

  if (/^[0-9A-Fa-f]{6}$/.test(normalized)) {
    return [
      Number.parseInt(normalized.slice(0, 2), 16),
      Number.parseInt(normalized.slice(2, 4), 16),
      Number.parseInt(normalized.slice(4, 6), 16),
    ];
  }

  return null;
}

function linearizeChannel(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function getRelativeLuminance(hex: string): number | null {
  const rgb = parseHexColor(hex);
  if (!rgb) {
    return null;
  }

  const [red, green, blue] = rgb.map(linearizeChannel);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function shouldUseLightTextOnColor(hex: string): boolean {
  const luminance = getRelativeLuminance(hex);
  return luminance !== null && luminance < 0.45;
}

export function getCategorySurfaceStyles(color: string): CSSProperties {
  const backgroundColor = color || CALENDAR_FALLBACK_COLOR;
  const useLightText = shouldUseLightTextOnColor(backgroundColor);

  return {
    backgroundColor,
    color: useLightText ? "#ffffff" : "var(--olive)",
    "--calendar-surface-text": useLightText ? "#ffffff" : "var(--olive)",
    "--calendar-surface-text-muted": useLightText
      ? "rgba(255, 255, 255, 0.88)"
      : "var(--olive)",
  } as CSSProperties;
}
