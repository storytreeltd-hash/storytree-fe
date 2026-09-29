/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { ApiError } from "@/lib/api/client";
import {
  createSession,
  getCurrentUser,
  getMyMembership,
  initializePayment,
  listMembershipTiers,
  selectMembership,
} from "@/lib/api/membership";
import { clearSession, getAccessToken, getStoredUser } from "@/lib/api/session";
import type { BillingCycle, TierInfo, User } from "@/lib/api/types";
import {
  detectRegionFromIp,
  REGION_OPTIONS,
  regionLabel,
  type RegionSlug,
} from "@/lib/region";

type Step = "account" | "plan";

const inputClassName =
  "w-full rounded-[6px] border border-[#171717]/15 bg-white/70 px-4 py-3 text-sm text-[#171717] placeholder:text-[#171717]/45 outline-none focus:border-[#171717]/40 sm:py-3.5";

function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

function priceForTier(
  tier: TierInfo,
  region: string,
  cycle: BillingCycle,
): { amount: number; currency: string } | null {
  if (tier.is_free) return { amount: 0, currency: "USD" };
  const entry = tier.pricing[region] ?? tier.pricing.diaspora;
  if (!entry) return null;
  return {
    amount: cycle === "monthly" ? entry.monthly : entry.yearly,
    currency: entry.currency,
  };
}

function tierAccent(slug: string): string {
  if (slug.includes("platinum")) return "#C0C0C0";
  if (slug.includes("gold")) return "#E2B45F";
  return "#5B8DEF";
}

export function MembershipCheckout() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("account");
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tiers, setTiers] = useState<TierInfo[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [region, setRegion] = useState<RegionSlug>("diaspora");
  const [cycle, setCycle] = useState<BillingCycle>("yearly");
  const [autoRenew, setAutoRenew] = useState(true);
  const [loadingTiers, setLoadingTiers] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = getStoredUser();
    if (!getAccessToken() || !stored) return;

    setUser(stored);
    setEmail(stored.email);
    setName(stored.name ?? "");
    setPhone(stored.phone ?? "");
    setStep("plan");

    let cancelled = false;
    getCurrentUser()
      .then((current) => {
        if (!cancelled) setUser(current);
      })
      .catch((err) => {
        if (cancelled || !(err instanceof ApiError)) return;
        if (err.status !== 401 && err.status !== 403 && err.status !== 404) return;
        clearSession();
        setUser(null);
        setStep("account");
        setError("Your session isn't valid anymore. Enter your email to start again.");
      });

    getMyMembership()
      .then((m) => {
        if (cancelled) return;
        if (m.status === "active") {
          router.replace("/membership/thank-you");
        }
      })
      .catch((err) => {
        if (cancelled || !(err instanceof ApiError)) return;
        if (err.status !== 401 && err.status !== 403) return;
        clearSession();
        setUser(null);
        setStep("account");
        setError("Your session isn't valid anymore. Enter your email to start again.");
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [tierList, detected] = await Promise.all([
          listMembershipTiers(),
          detectRegionFromIp(),
        ]);
        if (cancelled) return;
        setTiers(tierList);
        setRegion(detected);
        const preferred =
          tierList.find((t) => t.slug === "gold") ??
          tierList.find((t) => !t.is_free) ??
          tierList[0];
        if (preferred) setSelectedTier(preferred.slug);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Could not load membership tiers.",
          );
        }
      } finally {
        if (!cancelled) setLoadingTiers(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = useMemo(
    () => tiers.find((t) => t.slug === selectedTier) ?? null,
    [tiers, selectedTier],
  );

  const selectedPrice = useMemo(() => {
    if (!selected) return null;
    return priceForTier(selected, region, cycle);
  }, [selected, region, cycle]);

  async function handleAccountSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const session = await createSession({
        email: email.trim(),
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
      });
      setUser(session.user);
      setStep("plan");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to start your session. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCheckout() {
    if (!selected) return;
    setError("");
    setSubmitting(true);
    try {
      if (!getAccessToken()) {
        const session = await createSession({
          email: email.trim(),
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
        });
        setUser(session.user);
      }

      if (selected.is_free) {
        await selectMembership({
          tier: selected.slug,
          region,
          cycle,
        });
        router.push("/membership/thank-you?tier=" + encodeURIComponent(selected.slug));
        return;
      }

      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
        window.location.origin;
      const payment = await initializePayment({
        tier: selected.slug,
        region,
        cycle,
        auto_renew: autoRenew,
        redirect_url: `${siteUrl}/membership/thank-you`,
      });
      window.location.href = payment.payment_link;
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Checkout failed. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <section className="font-inter flex min-h-screen items-start px-0 pb-16 pt-24 sm:pt-28 md:pb-20">
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6 lg:px-8">
        <StaggerContainer className="max-w-2xl">
          <StaggerItem>
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-[#171717]/55">
              Ubuntu Pass
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-3 text-[26px] font-bold leading-tight text-[#171717] sm:text-[36px] md:text-[40px]">
              Choose your membership
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-sm leading-relaxed text-[#171717]/75 sm:text-base">
              Testnet mode for now — Flutterwave test cards and Polygon Amoy.
              No real charges until the charity approves production.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn delay={0.08} className="mt-10">
          {step === "account" ? (
            <form
              onSubmit={handleAccountSubmit}
              className="mx-auto max-w-md rounded-[10px] border border-[#171717]/10 bg-white/55 p-5 backdrop-blur-sm sm:p-6"
            >
              <h2 className="text-lg font-semibold text-[#171717]">
                Start with your email
              </h2>
              <p className="mt-1 text-sm text-[#171717]/65">
                We&apos;ll create a session so you can pick a tier. A full login
                provider comes later.
              </p>

              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                className={`mt-5 ${inputClassName}`}
              />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`mt-3 ${inputClassName}`}
              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                className={`mt-3 ${inputClassName}`}
              />

              {error ? (
                <p className="mt-4 rounded-[6px] bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full rounded-[6px] border border-[#E2B45F] bg-[#171717] px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5"
              >
                {submitting ? "Continuing…" : "Continue"}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-[#171717]/10 bg-white/55 px-4 py-3">
                <p className="text-sm text-[#171717]">
                  Signed in as{" "}
                  <span className="font-medium">{user?.email ?? email}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setStep("account")}
                  className="text-sm font-medium text-[#171717]/70 underline-offset-2 hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <label className="block flex-1 text-sm text-[#171717]">
                  <span className="mb-1.5 block font-medium">Region</span>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value as RegionSlug)}
                    className={inputClassName}
                  >
                    {REGION_OPTIONS.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex rounded-[6px] border border-[#171717]/15 bg-white/70 p-1">
                  {(["yearly", "monthly"] as BillingCycle[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setCycle(value)}
                      className={`rounded-[4px] px-4 py-2 text-sm font-medium capitalize transition-colors ${
                        cycle === value
                          ? "bg-[#171717] text-white"
                          : "text-[#171717]/70 hover:text-[#171717]"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              {loadingTiers ? (
                <p className="text-sm text-[#171717]/65">Loading tiers…</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-3">
                  {tiers.map((tier) => {
                    const price = priceForTier(tier, region, cycle);
                    const isSelected = tier.slug === selectedTier;
                    return (
                      <button
                        key={tier.slug}
                        type="button"
                        onClick={() => setSelectedTier(tier.slug)}
                        className={`rounded-[10px] border p-5 text-left transition ${
                          isSelected
                            ? "border-[#171717] bg-white shadow-[0_8px_24px_rgba(23,23,23,0.08)]"
                            : "border-[#171717]/10 bg-white/50 hover:border-[#171717]/25"
                        }`}
                      >
                        <span
                          className="mb-3 inline-block h-2 w-10 rounded-full"
                          style={{ backgroundColor: tierAccent(tier.slug) }}
                        />
                        <h3 className="text-lg font-semibold text-[#171717]">
                          {tier.name}
                        </h3>
                        <p className="mt-2 text-2xl font-bold text-[#171717]">
                          {tier.is_free
                            ? "Free"
                            : price
                              ? formatMoney(price.amount, price.currency)
                              : "—"}
                        </p>
                        <p className="mt-1 text-xs text-[#171717]/55">
                          {tier.is_free
                            ? "Activate instantly"
                            : `${regionLabel(region)} · billed ${cycle}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {selected && !selected.is_free ? (
                <label className="flex items-start gap-3 text-sm text-[#171717]">
                  <input
                    type="checkbox"
                    checked={autoRenew}
                    onChange={(e) => setAutoRenew(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#171717]"
                  />
                  <span>
                    Renew automatically each {cycle === "monthly" ? "month" : "year"}{" "}
                    using the card I pay with.{" "}
                    <span className="text-[#171717]/60">
                      You can turn this off any time.
                    </span>
                  </span>
                </label>
              ) : null}

              {error ? (
                <p className="rounded-[6px] bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#171717]/65">
                  {selected
                    ? selected.is_free
                      ? `Activate ${selected.name} for free.`
                      : selectedPrice
                        ? `Pay ${formatMoney(selectedPrice.amount, selectedPrice.currency)} via Flutterwave.`
                        : "Pricing unavailable for this region."
                    : "Select a tier to continue."}
                </p>
                <button
                  type="button"
                  disabled={!selected || submitting || loadingTiers}
                  onClick={handleCheckout}
                  className="rounded-[6px] border border-[#E2B45F] bg-[#171717] px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[180px]"
                >
                  {submitting
                    ? "Working…"
                    : selected?.is_free
                      ? "Activate free tier"
                      : "Continue to payment"}
                </button>
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
