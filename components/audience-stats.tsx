"use client";

import { CountUp } from "@/components/count-up";

const stats = [
  {
    end: 1.58,
    decimals: 2,
    suffix: "B",
    label: "People on the continent",
  },
  {
    end: 30,
    decimals: 0,
    suffix: "M+",
    label: "Africans in diaspora",
  },
  {
    end: 200,
    decimals: 0,
    suffix: "M+",
    label: "People of African descent",
  },
] as const;

export function AudienceStats() {
  return (
    <div className="mx-auto mt-10 grid max-w-[280px] grid-cols-1 gap-6 md:max-w-none md:grid-cols-4 md:gap-3 lg:mx-0 lg:mt-12">
      {stats.map(({ end, decimals, suffix, label }, index) => (
        <div key={label} className="text-center lg:text-left">
          <p className="text-[30px] font-semibold leading-none text-[#171717]">
            <CountUp
              end={end}
              decimals={decimals}
              suffix={suffix}
              delay={index * 0.15}
            />
          </p>
          <p className="mt-2 text-sm leading-snug text-[#0D0D0DB2]">{label}</p>
        </div>
      ))}
    </div>
  );
}
