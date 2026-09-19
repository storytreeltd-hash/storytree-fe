const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;

  if (process.env.NODE_ENV === "production") {
    if (!secret || secret.length < 32) {
      throw new Error(
        "ADMIN_SECRET must be set to at least 32 characters in production.",
      );
    }
    return secret;
  }

  return secret ?? "storytree-dev-admin-secret-change-me";
}

function timingSafeEqualStrings(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

async function signPayload(payload: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function getAllowedAdminEmails() {
  const configured = process.env.ADMIN_EMAIL?.trim();

  if (!configured) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_EMAIL must be set in production.");
    }

    return ["admin@storytree.com"];
  }

  return configured
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return getAllowedAdminEmails().includes(normalizedEmail);
}

export async function createAdminSessionValue(uid: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC;
  const nonce = crypto.randomUUID();
  const payload = `${expiresAt}.${nonce}.${uid}`;
  const signature = await signPayload(payload, getAdminSecret());

  return `${payload}.${signature}`;
}

export async function parseAdminSessionValue(value: string | undefined) {
  if (!value) {
    return null;
  }

  const parts = value.split(".");
  if (parts.length !== 4) {
    return null;
  }

  const [expiresAtValue, nonce, uid, signature] = parts;
  const expiresAt = Number(expiresAtValue);

  if (
    !uid ||
    !Number.isFinite(expiresAt) ||
    Math.floor(Date.now() / 1000) > expiresAt
  ) {
    return null;
  }

  try {
    const expected = await signPayload(
      `${expiresAtValue}.${nonce}.${uid}`,
      getAdminSecret(),
    );

    if (!timingSafeEqualStrings(signature, expected)) {
      return null;
    }

    return { uid, expiresAt };
  } catch {
    return null;
  }
}

export async function isValidAdminSessionValue(value: string | undefined) {
  const session = await parseAdminSessionValue(value);
  return session !== null;
}

export const ADMIN_SESSION_COOKIE = "storytree-admin-session";
export const ADMIN_SESSION_MAX_AGE_SEC = SESSION_MAX_AGE_SEC;
