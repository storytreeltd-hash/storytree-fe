import "server-only";

import type { DocumentData, Timestamp } from "firebase-admin/firestore";

import {
  adminStats,
  adminUsers,
  type AdminDashboardStats,
  type AdminUser,
} from "@/lib/admin-dashboard-data";
import { getFirebaseAdminFirestore } from "@/lib/firebase/admin";
import {
  getLiveVisitorCount,
  getStoredDashboardStats,
  getUsersCollectionCount,
} from "@/lib/firebase/dashboard-stats";
import { isFirebaseAdminConfigured } from "@/lib/firebase/env";

const defaultAvatars = ["/image1.png", "/image2.png", "/image3.png", "/community.png", "/hero.png"];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function formatAdminDate(value: unknown) {
  if (!value) {
    return "—";
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? "—" : formatDate(parsed);
  }

  if (value instanceof Date) {
    return formatDate(value);
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return formatDate((value as Timestamp).toDate());
  }

  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    const seconds = record.seconds ?? record._seconds;

    if (typeof seconds === "number") {
      return formatDate(new Date(seconds * 1000));
    }
  }

  return "—";
}

function mapFirestoreUser(
  id: string,
  data: DocumentData,
  index: number,
): AdminUser {
  return {
    id,
    name: String(data.name ?? "Unknown"),
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    dateTime: formatAdminDate(data.createdAt),
    avatar: String(data.avatar ?? defaultAvatars[index % defaultAvatars.length]),
  };
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  if (!isFirebaseAdminConfigured()) {
    return adminStats;
  }

  try {
    const [storedStats, userCount, liveVisitors] = await Promise.all([
      getStoredDashboardStats(),
      getUsersCollectionCount(),
      getLiveVisitorCount(),
    ]);

    if (!storedStats) {
      return {
        ...adminStats,
        liveVisitors,
        uniqueVisitors: userCount || adminStats.uniqueVisitors,
        totalVisitors: userCount || adminStats.totalVisitors,
      };
    }

    return {
      liveVisitors,
      uniqueVisitors: Number(
        storedStats.uniqueVisitors ?? userCount ?? adminStats.uniqueVisitors,
      ),
      totalVisitors: Number(
        storedStats.totalVisitors ?? userCount ?? adminStats.totalVisitors,
      ),
      averageSessionMinutes: Number(
        storedStats.averageSessionMinutes ?? adminStats.averageSessionMinutes,
      ),
      averageSessionSeconds: Number(
        storedStats.averageSessionSeconds ?? adminStats.averageSessionSeconds,
      ),
    };
  } catch (error) {
    console.error("Failed to load dashboard stats from Firestore:", error);
    return adminStats;
  }
}

export async function getAdminUsers(limit?: number): Promise<AdminUser[]> {
  const fallback = limit ? adminUsers.slice(0, limit) : adminUsers;

  if (!isFirebaseAdminConfigured()) {
    return fallback;
  }

  try {
    const db = await getFirebaseAdminFirestore();
    let query = db.collection("users").orderBy("createdAt", "desc");

    if (limit) {
      query = query.limit(limit);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return fallback;
    }

    return snapshot.docs.map((doc, index) => mapFirestoreUser(doc.id, doc.data(), index));
  } catch (error) {
    console.error("Failed to load users from Firestore:", error);

    try {
      const db = await getFirebaseAdminFirestore();
      const snapshot = limit
        ? await db.collection("users").limit(limit).get()
        : await db.collection("users").get();

      if (snapshot.empty) {
        return fallback;
      }

      return snapshot.docs.map((doc, index) => mapFirestoreUser(doc.id, doc.data(), index));
    } catch (fallbackError) {
      console.error("Failed to load users without ordering:", fallbackError);
      return fallback;
    }
  }
}
