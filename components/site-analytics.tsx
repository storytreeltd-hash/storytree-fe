"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const HEARTBEAT_MS = 60_000;

async function logFirebasePageView(path: string) {
  try {
    const { getAnalytics, isSupported, logEvent } = await import("firebase/analytics");
    const { getFirebaseApp } = await import("@/lib/firebase/client");
    const { isFirebaseClientConfigured } = await import("@/lib/firebase/env");

    if (!isFirebaseClientConfigured() || !(await isSupported())) {
      return;
    }

    const analytics = getAnalytics(getFirebaseApp());
    logEvent(analytics, "page_view", { page_path: path });
  } catch {
    // Analytics is optional; ignore client-side failures.
  }
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    if (lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {});

    void logFirebasePageView(pathname);
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    const heartbeat = window.setInterval(() => {
      fetch("/api/analytics/heartbeat", {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
    }, HEARTBEAT_MS);

    function endSession() {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics/end");
        return;
      }

      fetch("/api/analytics/end", {
        method: "POST",
        credentials: "include",
        keepalive: true,
      }).catch(() => {});
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        endSession();
      }
    }

    window.addEventListener("pagehide", endSession);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("pagehide", endSession);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}
