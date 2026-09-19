"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { scrollToHash } from "@/lib/scroll-to-hash";

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    requestAnimationFrame(() => scrollToHash(hash));
  }, [pathname]);

  return null;
}
