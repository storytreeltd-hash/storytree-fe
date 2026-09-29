/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FadeIn } from "@/components/motion";
import { ApiError } from "@/lib/api/client";
import {
  cancelAutoRenew,
  getCommunityStatus,
  getMyMembership,
  getPayment,
  getWallet,
  listUbuntuPasses,
} from "@/lib/api/membership";
import { getAccessToken } from "@/lib/api/session";
import type {
  CommunityStatus,
  Membership,
  Payment,
  UbuntuPass,
  Wallet,
} from "@/lib/api/types";

const POLL_MS = 2000;
const MAX_MS = 60_000;

type Phase =
  | "checking"
  | "waiting-payment"
  | "provisioning"
  | "ready"
  | "error"
  | "session-missing";

type PollResult<T> =
  | { ok: true; data: T }
  | { ok: false; notFound: boolean };

async function pollFetch<T>(fn: () => Promise<T>): Promise<PollResult<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { ok: false, notFound: true };
    }
    return { ok: false, notFound: false };
  }
}

function isWalletReady(w: Wallet | null): boolean {
  return Boolean(w && w.wallet_address);
}
function isCommunityReady(c: CommunityStatus | null): boolean {
  return Boolean(c && c.status === "active");
}
function isPassReady(p: UbuntuPass[]): boolean {
  return p.length > 0;
}

export function MembershipThankYou() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [passes, setPasses] = useState<UbuntuPass[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [community, setCommunity] = useState<CommunityStatus | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [paymentProblem, setPaymentProblem] = useState("");
  const [phase, setPhase] = useState<Phase>("checking");
  const [error, setError] = useState("");
  const [cancellingRenew, setCancellingRenew] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      setPhase("session-missing");
      setError("No active session. Please start again from membership checkout.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const reference = params.get("tx_ref");
    const redirectStatus = params.get("status");
    const startedAt = Date.now();
    const hasPayment = Boolean(reference);

    let cancelled = false;
    let paymentSettled = !hasPayment;
    let firstProvisioningTick = true;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (hasPayment) setPhase("waiting-payment");

    async function tick() {
      const elapsed = Date.now() - startedAt;

      if (!paymentSettled && reference) {
        const result = await pollFetch(() => getPayment(reference));
        if (cancelled) return;
        if (result.ok) {
          const current = result.data;
          setPayment(current);
          if (current.status === "successful") {
            paymentSettled = true;
            setPhase("provisioning");
          } else if (
            current.status === "failed" ||
            current.status === "abandoned"
          ) {
            setPaymentProblem(
              "Your payment didn't go through. You haven't been charged.",
            );
            setPhase("error");
            return;
          } else if (
            current.status === "pending" &&
            redirectStatus === "cancelled"
          ) {
            setPaymentProblem(
              "You cancelled the payment. You haven't been charged.",
            );
            setPhase("error");
            return;
          }
        }

        if (!paymentSettled) {
          if (elapsed >= MAX_MS) {
            setError(
              "Payment is taking longer than expected. Refresh in a moment — if it still hasn't cleared, contact support.",
            );
            setPhase("error");
            return;
          }
          timer = setTimeout(tick, POLL_MS);
          return;
        }
      }

      const [passResult, walletResult, communityResult, membershipResult] =
        await Promise.all([
          pollFetch(() => listUbuntuPasses()),
          pollFetch(() => getWallet()),
          pollFetch(() => getCommunityStatus()),
          pollFetch(() => getMyMembership()),
        ]);
      if (cancelled) return;

      if (passResult.ok) setPasses(passResult.data);
      if (walletResult.ok) setWallet(walletResult.data);
      if (communityResult.ok) setCommunity(communityResult.data);
      if (membershipResult.ok) setMembership(membershipResult.data);

      const walletDone = walletResult.ok && isWalletReady(walletResult.data);
      const communityDone =
        communityResult.ok && isCommunityReady(communityResult.data);
      const passDone = passResult.ok && isPassReady(passResult.data);

      if (walletDone && communityDone && passDone) {
        setPhase("ready");
        return;
      }

      if (firstProvisioningTick) {
        firstProvisioningTick = false;
        setPhase("provisioning");
      }

      if (elapsed >= MAX_MS) {
        const allStill404 =
          !walletResult.ok &&
          walletResult.notFound &&
          !communityResult.ok &&
          communityResult.notFound &&
          !passResult.ok &&
          passResult.notFound;
        if (allStill404) {
          setError(
            "Setup didn't finish in time. This looks like a backend issue — please refresh the page or contact support.",
          );
          setPhase("error");
        } else {
          setPhase("ready");
        }
        return;
      }

      timer = setTimeout(tick, POLL_MS);
    }

    void tick();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const primaryPass = passes[0];
  const walletReady = isWalletReady(wallet);
  const communityReady = isCommunityReady(community);
  const passReady = isPassReady(passes);
  const canCancelRenew =
    membership?.status === "active" &&
    membership.amount > 0 &&
    membership.auto_renew;

  async function handleCancelRenew() {
    setCancellingRenew(true);
    setError("");
    try {
      setMembership(await cancelAutoRenew());
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not turn off auto-renew.",
      );
    } finally {
      setCancellingRenew(false);
    }
  }

  if (
    phase === "checking" ||
    phase === "waiting-payment" ||
    phase === "provisioning"
  ) {
    return (
      <ProvisioningView
        phase={phase}
        walletReady={walletReady}
        communityReady={communityReady}
        passReady={passReady}
      />
    );
  }

  return (
    <section className="font-inter flex min-h-screen items-start px-0 pb-16 pt-24 sm:pt-28 md:pb-20">
      <div className="mx-auto w-full max-w-[720px] px-4 md:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-[#171717]/55">
            Ubuntu Pass
          </p>
          <h1 className="mt-3 text-[26px] font-bold leading-tight text-[#171717] sm:text-[36px]">
            {paymentProblem
              ? "Payment not completed"
              : phase === "session-missing"
                ? "Session expired"
                : phase === "error"
                  ? "We couldn't finish setup"
                  : "You're in"}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#171717]/75 sm:text-base">
            {paymentProblem
              ? `${paymentProblem} You can go back to plans and try again.`
              : phase === "session-missing"
                ? "Start again from membership checkout to continue."
                : phase === "error"
                  ? "Some parts of your account are still catching up. Refresh in a minute — everything is saved."
                  : "Your wallet and Ubuntu Pass are ready. We've emailed your community invite — check your inbox to accept."}
          </p>

          {error ? (
            <p className="mt-6 rounded-[6px] bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <div className="mt-8 space-y-3">
            {payment ? (
              <StatusCard
                title="Payment"
                body={`${payment.currency} ${payment.amount} · ${payment.status} · ${payment.reference}`}
              />
            ) : null}
            <StatusCard
              title="Membership"
              body={
                membership
                  ? `${membership.tier} · ${membership.status}${
                      membership.expires_at
                        ? ` · ${
                            membership.auto_renew && membership.amount > 0
                              ? "renews"
                              : "expires"
                          } ${new Date(membership.expires_at).toLocaleDateString()}`
                        : ""
                    }`
                  : "Not found yet"
              }
            />
            {canCancelRenew ? (
              <button
                type="button"
                onClick={handleCancelRenew}
                disabled={cancellingRenew}
                className="text-sm font-medium text-[#171717]/70 underline underline-offset-2 hover:text-[#171717] disabled:opacity-60"
              >
                {cancellingRenew
                  ? "Turning off auto-renew…"
                  : "Turn off auto-renew"}
              </button>
            ) : null}
            <StatusCard
              title="Ubuntu Pass"
              body={
                primaryPass
                  ? `token ${primaryPass.token_id ?? "—"} · ${primaryPass.status}${
                      primaryPass.transaction_hash
                        ? ` · ${primaryPass.transaction_hash.slice(0, 10)}…`
                        : ""
                    }`
                  : "Still finishing in the background"
              }
            />
            <StatusCard
              title="Wallet"
              body={
                wallet?.wallet_address
                  ? `${wallet.wallet_address} · ${wallet.network ?? "network TBD"}`
                  : "Still finishing in the background"
              }
            />
            <StatusCard
              title="Community"
              body={
                community
                  ? `${community.status} · invite sent to your email`
                  : "Sending invite to your email"
              }
            />
          </div>

          <p className="mt-6 text-sm text-[#171717]/70">
            The community invite lands in your email — open it to accept and
            join the chat.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={
                phase === "ready" ? "/membership?change=1" : "/membership"
              }
              className="rounded-[6px] border border-[#171717]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#171717]"
            >
              {phase === "ready" ? "Change plan" : "Back to plans"}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProvisioningView({
  phase,
  walletReady,
  communityReady,
  passReady,
}: {
  phase: "checking" | "waiting-payment" | "provisioning";
  walletReady: boolean;
  communityReady: boolean;
  passReady: boolean;
}) {
  const title =
    phase === "waiting-payment"
      ? "Confirming your payment…"
      : phase === "provisioning"
        ? "Setting up your account…"
        : "Loading your account…";
  const subtitle =
    phase === "waiting-payment"
      ? "Waiting on the payment confirmation from Flutterwave. This usually takes just a few seconds."
      : phase === "provisioning"
        ? "This takes a few seconds — creating your wallet, community access, and Ubuntu Pass."
        : "One moment while we pull up your details.";
  return (
    <section className="font-inter flex min-h-screen items-start px-0 pb-16 pt-24 sm:pt-28 md:pb-20">
      <div className="mx-auto w-full max-w-[560px] px-4 md:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <Spinner />
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.08em] text-[#171717]/55">
              Ubuntu Pass
            </p>
            <h1 className="mt-2 text-[24px] font-bold leading-tight text-[#171717] sm:text-[32px]">
              {title}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#171717]/70 sm:text-base">
              {subtitle}
            </p>
          </div>

          {phase === "provisioning" ? (
            <ul className="mt-8 space-y-3">
              <ChecklistItem
                ready={walletReady}
                pending="Creating your wallet…"
                done="Creating your wallet — done"
              />
              <ChecklistItem
                ready={communityReady}
                pending="Sending your community invite…"
                done="Community invite sent — check your email"
              />
              <ChecklistItem
                ready={passReady}
                pending="Minting your Ubuntu Pass…"
                done="Minting your Ubuntu Pass — done"
              />
            </ul>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}

function ChecklistItem({
  ready,
  pending,
  done,
}: {
  ready: boolean;
  pending: string;
  done: string;
}) {
  return (
    <li
      className={`flex items-center gap-3 rounded-[10px] border px-4 py-3 transition-colors ${
        ready
          ? "border-[#0F9D58]/25 bg-[#0F9D58]/5"
          : "border-[#171717]/10 bg-white/55"
      }`}
    >
      <span className="flex h-6 w-6 items-center justify-center">
        {ready ? <CheckIcon /> : <MiniSpinner />}
      </span>
      <span
        className={`text-sm ${ready ? "text-[#171717]" : "text-[#171717]/70"}`}
      >
        {ready ? done : pending}
      </span>
    </li>
  );
}

function Spinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#171717]/15 border-t-[#E2B45F]"
    />
  );
}

function MiniSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="h-4 w-4 animate-spin rounded-full border-2 border-[#171717]/15 border-t-[#171717]/70"
    />
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5 text-[#0F9D58]"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
      <path
        d="M6 10.5l2.5 2.5 5.5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[10px] border border-[#171717]/10 bg-white/55 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#171717]/55">
        {title}
      </p>
      <p className="mt-1 break-all text-sm text-[#171717]">{body}</p>
    </div>
  );
}
