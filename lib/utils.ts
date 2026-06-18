// ============================================================
// FM2 EMPIRE — UTILITY FUNCTIONS
// Pure helper functions used across the entire platform.
// No dependencies on React or Next.js — just plain TypeScript.
// Every component imports from here, nothing is duplicated.
// ============================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ------------------------------------------------------------
// cn — Class Name Merger
// Combines clsx (conditional classes) with tailwind-merge
// (removes conflicting Tailwind classes cleanly).
//
// Without cn: className="px-4 px-8" → conflict, unpredictable
// With cn:    cn("px-4", "px-8")    → "px-8" cleanly
//
// Every single component in this project uses cn() for classes.
// ------------------------------------------------------------

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ------------------------------------------------------------
// formatDate — Consistent date formatting
// Used for event dates, timestamps, application dates.
// Defaults to Nigerian English locale.
// ------------------------------------------------------------

export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-NG", options).format(d);
}

// ------------------------------------------------------------
// formatCurrency — Nigerian Naira formatting
// Used everywhere money appears: ticket prices, service fees.
// Pass a different currency code for future multi-currency.
// ------------------------------------------------------------

export function formatCurrency(
  amount: number,
  currency: string = "NGN"
): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ------------------------------------------------------------
// slugify — Converts a string to a URL-safe slug
// Used for event URLs, talent profiles, media pages.
// Example: "FM2 Empire Launch Event" → "fm2-empire-launch-event"
// ------------------------------------------------------------

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ------------------------------------------------------------
// truncate — Shortens text with ellipsis
// Used for card descriptions, preview bios.
// ------------------------------------------------------------

export function truncate(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

// ------------------------------------------------------------
// isValidEmail — Basic email validation
// Used in all intake forms before API submission.
// ------------------------------------------------------------

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
}

// ------------------------------------------------------------
// isValidNigerianPhone — Nigerian phone number validation
// Accepts: 08012345678, +2348012345678, 2348012345678
// Used in every intake form with a phone field.
// ------------------------------------------------------------

export function isValidNigerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  const nigerianPhoneRegex = /^(\+?234|0)[789][01]\d{8}$/;
  return nigerianPhoneRegex.test(cleaned);
}

// ------------------------------------------------------------
// normalizePhone — Standardises Nigerian phone numbers
// Converts any format to international: +234XXXXXXXXXX
// Always run this before storing a phone number in Supabase.
// ------------------------------------------------------------

export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+234")) return cleaned;
  if (cleaned.startsWith("234")) return `+${cleaned}`;
  if (cleaned.startsWith("0")) return `+234${cleaned.slice(1)}`;
  return cleaned;
}

// ------------------------------------------------------------
// getInitials — Returns initials from a full name
// Used for avatar fallbacks in admin panel and talent profiles.
// Example: "Pelumi Ogunleye" → "PO"
// ------------------------------------------------------------

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

// ------------------------------------------------------------
// wait — Promise-based delay
// Used in async flows, rate-limiting retries, animations.
// ------------------------------------------------------------

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ------------------------------------------------------------
// clamp — Clamps a number between min and max
// Used in scroll animations and canvas-based components.
// ------------------------------------------------------------

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ------------------------------------------------------------
// generateId — Lightweight client-side unique ID
// Used for temporary IDs before Supabase assigns a real UUID.
// Never use this as a permanent database identifier.
// ------------------------------------------------------------

export function generateId(prefix: string = "fm2"): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 7);
  return `${prefix}_${timestamp}_${random}`;
}

// ------------------------------------------------------------
// groupBy — Groups an array of objects by a key
// Used in admin panel to group applications by status or date.
// ------------------------------------------------------------

export function groupBy<T>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) result[groupKey] = [];
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}

// ------------------------------------------------------------
// safeJsonParse — Parses JSON without throwing
// Used when reading from localStorage or external sources
// where the data shape cannot be guaranteed.
// ------------------------------------------------------------

export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}