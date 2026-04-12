import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toSentenceCase(value: string) {
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function arrayFromCsv(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatDate(value?: string | Date) {
  if (!value) {
    return "";
  }

  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function readingTimeFromText(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function toDisplayImageUrl(value?: string) {
  if (!value) {
    return "";
  }

  if (
    value.startsWith("/api/media/") ||
    value.startsWith("/") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  try {
    const parsed = new URL(value);
    const pathSegments = parsed.pathname.split("/").filter(Boolean);

    if (!pathSegments.length) {
      return value;
    }

    const bucket = pathSegments[0];
    const keySegments = pathSegments.slice(1);

    if (!keySegments.length) {
      return value;
    }

    if (parsed.hostname.includes("minio") || bucket === "touchpointe") {
      const encodedKey = keySegments
        .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
        .join("/");
      return `/api/media/${encodedKey}`;
    }
  } catch {
    return value;
  }

  return value;
}

export function normalizeHtmlImageSources(html?: string) {
  if (!html) {
    return "";
  }

  return html.replace(
    /(<img\b[^>]*\bsrc\s*=\s*["'])([^"']+)(["'])/gi,
    (_match, prefix: string, src: string, suffix: string) => `${prefix}${toDisplayImageUrl(src)}${suffix}`
  );
}
