"use client";

import Image from "next/image";

import { CountUp } from "@/components/count-up";
import type { AdminDashboardStats } from "@/lib/admin-dashboard-data";

function StatCardBackground() {
  return (
    <Image
      src="/cardBg.svg"
      alt=""
      width={132}
      height={74}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 h-auto w-[132px] max-w-[70%]"
    />
  );
}

type AdminStatCardsProps = {
  stats: AdminDashboardStats;
};

export function AdminStatCards({ stats }: AdminStatCardsProps) {
  const cards = [
    {
      title: "Live Visitors",
      showLiveDot: true,
      value: <CountUp end={stats.liveVisitors} duration={1.5} />,
    },
    {
      title: "Unique Visitors",
      showLiveDot: false,
      value: <CountUp end={stats.uniqueVisitors} duration={2} />,
    },
    {
      title: "Total Visitors",
      showLiveDot: false,
      value: <CountUp end={stats.totalVisitors} duration={2.2} />,
    },
    {
      title: "Average Session",
      showLiveDot: false,
      value: (
        <span className="tabular-nums">
          <CountUp end={stats.averageSessionMinutes} duration={1.8} />
          min
          <CountUp end={stats.averageSessionSeconds} duration={2} delay={0.2} />
          sec
        </span>
      ),
    },
  ] as const;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ title, showLiveDot, value }) => (
        <article
          key={title}
          className="relative min-h-[150px] overflow-hidden rounded-[12px] bg-white px-5 py-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]"
        >
          <StatCardBackground />
          <div className="relative">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-normal text-[#667085]">{title}</h3>
              {showLiveDot ? (
                <span className="inline-flex h-2 w-2 rounded-full bg-[#12B76A]" />
              ) : null}
            </div>
            <p className="mt-4 text-[32px] font-semibold leading-none tracking-tight text-[#101828]">
              {value}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
