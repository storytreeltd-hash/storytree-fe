import { NextResponse } from "next/server";

import {
  createCommunityUser,
  DuplicateCommunityUserError,
} from "@/lib/firebase/community-users";
import { isFirebaseAdminConfigured } from "@/lib/firebase/env";
import {
  getClientIp,
  getRateLimitRetryAfterSeconds,
  isSameOriginRequest,
} from "@/lib/admin-rate-limit";

type AttemptRecord = {
  count: number;
  resetAt: number;
};

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, AttemptRecord>();

function isCommunityJoinRateLimited(ip: string) {
  const key = `community:${ip}`;
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Community signup is not available right now." },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);

  if (isCommunityJoinRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(getRateLimitRetryAfterSeconds(ip)),
        },
      },
    );
  }

  let body: { name?: string; email?: string; phone?: string; source?: string };

  try {
    body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      source?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const source = body.source?.trim() ?? "join-form";

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Name, email, and phone number are required." },
      { status: 400 },
    );
  }

  try {
    await createCommunityUser({ name, email, phone, source });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof DuplicateCommunityUserError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    if (error instanceof Error && error.message.includes("valid email")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Community join failed:", error);
    return NextResponse.json(
      { error: "Unable to join the community. Please try again." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
