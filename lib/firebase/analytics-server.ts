import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  endSiteSession,
  heartbeatSiteSession,
  SESSION_COOKIE,
  trackSiteVisit,
  VISITOR_COOKIE,
} from "@/lib/firebase/dashboard-stats";
import { isFirebaseAdminConfigured } from "@/lib/firebase/env";

const VISITOR_MAX_AGE = 60 * 60 * 24 * 400;
const SESSION_MAX_AGE = 60 * 30;

function applyAnalyticsCookies(
  response: NextResponse,
  visitorId: string,
  sessionId: string,
  isNewVisitor: boolean,
) {
  if (isNewVisitor) {
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: VISITOR_MAX_AGE,
    });
  }

  response.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}

export async function readAnalyticsCookies() {
  const cookieStore = await cookies();
  return {
    visitorId: cookieStore.get(VISITOR_COOKIE)?.value,
    sessionId: cookieStore.get(SESSION_COOKIE)?.value,
  };
}

export async function handleAnalyticsTrack(request: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let path = "/";

  try {
    const body = (await request.json()) as { path?: string };
    path = body.path?.trim() || path;
  } catch {
    // Ignore invalid JSON and fall back to root path.
  }

  const { visitorId, sessionId } = await readAnalyticsCookies();
  const result = await trackSiteVisit({ visitorId, sessionId, path });
  const response = NextResponse.json({ ok: true, sessionId: result.sessionId });

  return applyAnalyticsCookies(
    response,
    result.visitorId,
    result.sessionId,
    result.isNewVisitor,
  );
}

export async function handleAnalyticsHeartbeat() {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const { sessionId } = await readAnalyticsCookies();

  if (!sessionId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await heartbeatSiteSession(sessionId);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}

export async function handleAnalyticsEnd() {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const { sessionId } = await readAnalyticsCookies();

  if (sessionId) {
    await endSiteSession(sessionId);
  }

  return NextResponse.json({ ok: true });
}
