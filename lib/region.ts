/** Region slugs used by the StoryTree membership API. */
export const REGION_OPTIONS = [
  { slug: "diaspora", label: "US / Rest of World" },
  { slug: "africa", label: "Africa (general)" },
  { slug: "ng", label: "Nigeria" },
  { slug: "za", label: "South Africa" },
  { slug: "gh", label: "Ghana" },
  { slug: "ke", label: "Kenya" },
  { slug: "rw", label: "Rwanda" },
  { slug: "eg", label: "Egypt" },
  { slug: "ma", label: "Morocco" },
  { slug: "mu", label: "Mauritius" },
] as const;

export type RegionSlug = (typeof REGION_OPTIONS)[number]["slug"];

const COUNTRY_TO_REGION: Record<string, RegionSlug> = {
  NG: "ng",
  ZA: "za",
  GH: "gh",
  KE: "ke",
  RW: "rw",
  EG: "eg",
  MA: "ma",
  MU: "mu",
};

/** ISO country codes that fall under the Africa regional price when not listed above. */
const AFRICA_COUNTRY_CODES = new Set([
  "DZ",
  "AO",
  "BJ",
  "BW",
  "BF",
  "BI",
  "CV",
  "CM",
  "CF",
  "TD",
  "KM",
  "CG",
  "CD",
  "CI",
  "DJ",
  "GQ",
  "ER",
  "SZ",
  "ET",
  "GA",
  "GM",
  "GN",
  "GW",
  "LR",
  "LY",
  "MG",
  "MW",
  "ML",
  "MR",
  "MZ",
  "NA",
  "NE",
  "NG",
  "RW",
  "ST",
  "SN",
  "SC",
  "SL",
  "SO",
  "SS",
  "SD",
  "TZ",
  "TG",
  "TN",
  "UG",
  "ZM",
  "ZW",
  "EH",
  "LS",
]);

export function countryCodeToRegion(countryCode: string | null | undefined): RegionSlug {
  if (!countryCode) return "diaspora";
  const code = countryCode.trim().toUpperCase();
  if (COUNTRY_TO_REGION[code]) return COUNTRY_TO_REGION[code];
  if (AFRICA_COUNTRY_CODES.has(code)) return "africa";
  return "diaspora";
}

export async function detectRegionFromIp(): Promise<RegionSlug> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return "diaspora";
    const data = (await response.json()) as { country_code?: string };
    return countryCodeToRegion(data.country_code);
  } catch {
    return "diaspora";
  }
}

export function regionLabel(slug: string): string {
  return REGION_OPTIONS.find((option) => option.slug === slug)?.label ?? slug;
}
