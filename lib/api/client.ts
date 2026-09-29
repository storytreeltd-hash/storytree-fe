import { getAccessToken } from "@/lib/api/session";
import type { ApiErrorBody } from "@/lib/api/types";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) {
    throw new ApiError(
      "API URL is not configured. Set NEXT_PUBLIC_API_URL.",
      500,
    );
  }
  return raw.replace(/\/+$/, "");
}

function formatDetail(detail: ApiErrorBody["detail"]): string | null {
  if (!detail) return null;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => (typeof item === "object" && item?.msg ? item.msg : String(item)))
      .join(", ");
  }
  return null;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  options?: { auth?: boolean },
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  if (options?.auth !== false) {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const baseUrl = getApiBaseUrl();
  if (/\.ngrok(-free)?\.(app|dev|io)$/.test(new URL(baseUrl).hostname)) {
    headers.set("ngrok-skip-browser-warning", "true");
  }

  const response = await fetch(`${baseUrl}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const body = (data ?? {}) as ApiErrorBody;
    const message =
      formatDetail(body.detail) ||
      body.message ||
      (typeof data === "string" ? data : null) ||
      `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}

export function apiV1Path(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/api/v1${normalized}`;
}
