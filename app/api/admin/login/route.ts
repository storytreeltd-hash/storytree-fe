import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SEC,
  createAdminSessionValue,
} from "@/lib/admin-auth";
import {
  clearLoginAttempts,
  getClientIp,
  getRateLimitRetryAfterSeconds,
  isLoginRateLimited,
  isSameOriginRequest,
} from "@/lib/admin-rate-limit";
import { getAdminLoginConfigError } from "@/lib/firebase/env";
import { verifyFirebaseIdTokenViaRest } from "@/lib/firebase/verify-id-token-rest";

export const runtime = "nodejs";

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

export async function POST(request: Request) {
  try {
    if (!isSameOriginRequest(request)) {
      return jsonError("Invalid request origin.", 403);
    }

    const configError = getAdminLoginConfigError();
    if (configError) {
      return jsonError(configError, 503);
    }

    const ip = getClientIp(request);

    if (isLoginRateLimited(ip)) {
      return jsonError("Too many login attempts. Please try again later.", 429, {
        "Retry-After": String(getRateLimitRetryAfterSeconds(ip)),
      });
    }

    let body: { idToken?: string };

    try {
      body = (await request.json()) as { idToken?: string };
    } catch {
      return jsonError("Invalid request body.", 400);
    }

    const idToken = body.idToken?.trim() ?? "";

    if (!idToken) {
      return jsonError("Missing authentication token.", 400);
    }

    try {
      const adminUser = await verifyFirebaseIdTokenViaRest(idToken);
      clearLoginAttempts(ip);

      const sessionValue = await createAdminSessionValue(adminUser.uid);
      const response = NextResponse.json({ success: true });
      response.cookies.set(ADMIN_SESSION_COOKIE, sessionValue, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/admin",
        maxAge: ADMIN_SESSION_MAX_AGE_SEC,
      });

      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid email or password.";

      if (message.includes("not authorized")) {
        return jsonError(message, 403);
      }

      return jsonError("Invalid email or password.", 401);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    console.error("Admin login error:", message);
    return jsonError(message, 500);
  }
}

export function GET() {
  return jsonError("Method not allowed.", 405);
}
