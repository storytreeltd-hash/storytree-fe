import "server-only";

import { FieldValue, Timestamp } from "firebase-admin/firestore";

import type { AdminDashboardStats } from "@/lib/admin-dashboard-data";
import { getFirebaseAdminFirestore } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/env";

const STATS_DOC_PATH = "dashboard/stats";
const SESSIONS_COLLECTION = "analytics_sessions";
const LIVE_WINDOW_MS = 2 * 60 * 1000;
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export const VISITOR_COOKIE = "storytree-visitor";
export const SESSION_COOKIE = "storytree-session";

type TrackVisitResult = {
  sessionId: string;
  visitorId: string;
  isNewVisitor: boolean;
  isNewSession: boolean;
};

async function getStatsRef() {
  const db = await getFirebaseAdminFirestore();
  return db.doc(STATS_DOC_PATH);
}

async function getSessionRef(sessionId: string) {
  const db = await getFirebaseAdminFirestore();
  return db.collection(SESSIONS_COLLECTION).doc(sessionId);
}

function splitAverageSeconds(totalSeconds: number) {
  const rounded = Math.max(0, Math.round(totalSeconds));
  return {
    averageSessionMinutes: Math.floor(rounded / 60),
    averageSessionSeconds: rounded % 60,
  };
}

export async function incrementSignupStats() {
  if (!isFirebaseAdminConfigured()) {
    return;
  }

  await (await getStatsRef()).set(
    {
      totalVisitors: FieldValue.increment(1),
      uniqueVisitors: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

export async function getUsersCollectionCount() {
  if (!isFirebaseAdminConfigured()) {
    return 0;
  }

  const snapshot = await (await getFirebaseAdminFirestore()).collection("users").count().get();
  return snapshot.data().count;
}

export async function getLiveVisitorCount() {
  if (!isFirebaseAdminConfigured()) {
    return 0;
  }

  const cutoff = Timestamp.fromMillis(Date.now() - LIVE_WINDOW_MS);
  const snapshot = await (await getFirebaseAdminFirestore())
    .collection(SESSIONS_COLLECTION)
    .where("lastSeen", ">=", cutoff)
    .count()
    .get();

  return snapshot.data().count;
}

export async function trackSiteVisit(input: {
  visitorId?: string;
  sessionId?: string;
  path: string;
}): Promise<TrackVisitResult> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Analytics is not configured.");
  }

  const db = await getFirebaseAdminFirestore();
  const now = Timestamp.now();
  let visitorId = input.visitorId ?? crypto.randomUUID();
  let sessionId = input.sessionId ?? crypto.randomUUID();
  let isNewVisitor = !input.visitorId;
  let isNewSession = true;

  if (input.sessionId) {
    const existingSession = await (await getSessionRef(input.sessionId)).get();

    if (existingSession.exists) {
      const data = existingSession.data();
      const lastSeenMs = data?.lastSeen?.toMillis?.() ?? 0;
      const isActive = Date.now() - lastSeenMs < SESSION_TIMEOUT_MS;

      if (isActive) {
        isNewSession = false;
        sessionId = input.sessionId;
        visitorId = String(data?.visitorId ?? visitorId);
        isNewVisitor = false;

        await (await getSessionRef(sessionId)).set(
          {
            visitorId,
            lastSeen: now,
            path: input.path,
          },
          { merge: true },
        );

        return { sessionId, visitorId, isNewVisitor, isNewSession };
      }
    }
  }

  if (input.visitorId) {
    isNewVisitor = false;
    visitorId = input.visitorId;
  }

  isNewSession = true;
  sessionId = crypto.randomUUID();

  await (await getSessionRef(sessionId)).set({
    visitorId,
    startedAt: now,
    lastSeen: now,
    path: input.path,
  });

  const statsUpdate: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (isNewSession) {
    statsUpdate.totalVisitors = FieldValue.increment(1);
  }

  if (isNewVisitor) {
    statsUpdate.uniqueVisitors = FieldValue.increment(1);
  }

  if (isNewSession || isNewVisitor) {
    await (await getStatsRef()).set(statsUpdate, { merge: true });
  }

  return { sessionId, visitorId, isNewVisitor, isNewSession };
}

export async function heartbeatSiteSession(sessionId: string) {
  if (!isFirebaseAdminConfigured()) {
    return;
  }

  const sessionRef = await getSessionRef(sessionId);
  const snapshot = await sessionRef.get();

  if (!snapshot.exists) {
    return;
  }

  await sessionRef.set(
    {
      lastSeen: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

export async function endSiteSession(sessionId: string) {
  if (!isFirebaseAdminConfigured()) {
    return;
  }

  const sessionRef = await getSessionRef(sessionId);
  const snapshot = await sessionRef.get();

  if (!snapshot.exists) {
    return;
  }

  const data = snapshot.data();
  const startedAtMs = data?.startedAt?.toMillis?.() ?? Date.now();
  const durationSeconds = Math.max(1, Math.round((Date.now() - startedAtMs) / 1000));

  await (await getStatsRef()).set(
    {
      totalSessionSeconds: FieldValue.increment(durationSeconds),
      completedSessions: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

export async function getStoredDashboardStats(): Promise<Partial<AdminDashboardStats> | null> {
  if (!isFirebaseAdminConfigured()) {
    return null;
  }

  const snapshot = await (await getStatsRef()).get();

  if (!snapshot.exists) {
    return null;
  }

  const data = snapshot.data();
  const totalSessionSeconds = Number(data?.totalSessionSeconds ?? 0);
  const completedSessions = Number(data?.completedSessions ?? 0);
  const computedAverage =
    completedSessions > 0
      ? splitAverageSeconds(totalSessionSeconds / completedSessions)
      : null;

  return {
    liveVisitors: Number(data?.liveVisitors ?? 0),
    uniqueVisitors: Number(data?.uniqueVisitors ?? 0),
    totalVisitors: Number(data?.totalVisitors ?? 0),
    averageSessionMinutes:
      computedAverage?.averageSessionMinutes ??
      Number(data?.averageSessionMinutes ?? 0),
    averageSessionSeconds:
      computedAverage?.averageSessionSeconds ??
      Number(data?.averageSessionSeconds ?? 0),
  };
}

export async function initializeDashboardStats(stats: AdminDashboardStats) {
  if (!isFirebaseAdminConfigured()) {
    return;
  }

  const statsRef = await getStatsRef();
  const existing = await statsRef.get();

  if (existing.exists) {
    return;
  }

  await statsRef.set({
    ...stats,
    totalSessionSeconds: 0,
    completedSessions: 0,
    updatedAt: FieldValue.serverTimestamp(),
  });
}
