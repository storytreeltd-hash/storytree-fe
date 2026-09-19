import "server-only";

import { isAllowedAdminEmail } from "@/lib/admin-auth";

type LookupResponse = {
  users?: Array<{
    localId?: string;
    email?: string;
  }>;
  error?: {
    message?: string;
  };
};

export type VerifiedAdminUser = {
  uid: string;
  email: string;
};

function decodeJwtPayload(token: string): Record<string, unknown> {
  const segment = token.split(".")[1];

  if (!segment) {
    throw new Error("Invalid authentication token.");
  }

  const json = Buffer.from(segment, "base64url").toString("utf8");
  return JSON.parse(json) as Record<string, unknown>;
}

export async function verifyFirebaseIdTokenViaRest(
  idToken: string,
): Promise<VerifiedAdminUser> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    throw new Error("Firebase API key is not configured.");
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    },
  );

  let data: LookupResponse;

  try {
    data = (await response.json()) as LookupResponse;
  } catch {
    throw new Error("Invalid email or password.");
  }

  if (!response.ok || data.error) {
    throw new Error("Invalid email or password.");
  }

  const user = data.users?.[0];
  const uid = user?.localId;
  const email = user?.email?.trim().toLowerCase();

  if (!uid || !email) {
    throw new Error("Invalid email or password.");
  }

  const claims = decodeJwtPayload(idToken);
  const isAdminClaim = claims.admin === true;

  if (!isAdminClaim && !isAllowedAdminEmail(email)) {
    throw new Error("This account is not authorized for admin access.");
  }

  return { uid, email };
}
