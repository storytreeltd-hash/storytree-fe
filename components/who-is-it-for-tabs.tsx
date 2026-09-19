"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export const whoIsItForTabs = [
  { id: "film-lovers", label: "Film lovers", href: "/who-is-it-for" },
  { id: "filmmakers", label: "Filmmakers", href: "/who-is-it-for/filmmakers" },
  { id: "investors", label: "Investors", href: "/who-is-it-for/investors" },
] as const;

export type WhoIsItForTabId = (typeof whoIsItForTabs)[number]["id"];

export function getActiveWhoTab(pathname: string): WhoIsItForTabId {
  if (pathname.startsWith("/who-is-it-for/filmmakers")) return "filmmakers";
  if (pathname.startsWith("/who-is-it-for/investors")) return "investors";
  return "film-lovers";
}

export function WhoIsItForTabs({
  variant,
  activeTab: activeTabOverride,
}: {
  variant: "home" | "page";
  activeTab?: WhoIsItForTabId;
}) {
  const pathname = usePathname();
  const activeTab =
    activeTabOverride ??
    (variant === "home" ? null : getActiveWhoTab(pathname));

  const isPage = variant === "page";

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[360px] flex-col gap-1 rounded-2xl bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:inline-flex md:w-auto md:max-w-none md:flex-row md:rounded-full md:p-1.5">
        {whoIsItForTabs.map((tab) => {
          const isActive = isPage && activeTab === tab.id;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`relative rounded-full px-4 py-2.5 text-center text-sm transition-colors md:px-6 md:py-2.5 md:text-base ${
                isPage
                  ? isActive
                    ? "font-semibold text-white"
                    : "font-normal text-[#0D0D0D] hover:text-[#0D0D0D]/80"
                  : "font-normal text-[#0D0D0D] hover:bg-[#F3E8CE] hover:font-semibold hover:text-[#171717]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`who-tab-pill-${variant}`}
                  className="absolute inset-0 rounded-full bg-[#171717]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
