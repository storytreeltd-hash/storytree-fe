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

const POLL_MS = 2500;
const MAX_POLLS = 24;

type OptionalResult<T> = T | null;

export function MembershipThankYou() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [passes, setPasses] = useState<UbuntuPass[]>([]);
  const [wallet, setWallet] = useState<OptionalResult<Wallet>>(null);
  const [community, setCommunity] =
    useState<OptionalResult<CommunityStatus>>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [paymentProblem, setPaymentProblem] = useState("");
  const [error, setError] = useState("");
  const [polling, setPolling] = useState(true);
  const [cancellingRenew, setCancellingRenew] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      setError("No active session. Please start again from membership checkout.");
      setPolling(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const reference = params.get("tx_ref");
    const redirectStatus = params.get("status");

    let cancelled = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function checkPayment(): Promise<boolean> {
      if (!reference) return false;
      const current = await getPayment(reference).catch(() => null);
      if (cancelled || !current) return false;
      setPayment(current);
      if (current.status === "failed" || current.status === "abandoned") {
        setPaymentProblem("Your payment didn't go through. You haven't been charged.");
        return true;
      }
      if (current.status === "pending" && redirectStatus === "cancelled") {
        setPaymentProblem("You cancelled the payment. You haven't been charged.");
        return true;
      }
      return false;
    }

    async function refreshExtras() {
      const [passList, walletResult, communityResult] = await Promise.all([
        listUbuntuPasses().catch(() => [] as UbuntuPass[]),
        getWallet().catch(() => null),
        getCommunityStatus().catch(() => null),
      ]);
      if (cancelled) return;
      setPasses(passList);
      setWallet(walletResult);
      setCommunity(communityResult);
    }

    async function tick() {
      attempts += 1;
      if (await checkPayment()) {
        setPolling(false);
        return;
      }
      try {
        const me = await getMyMembership();
        if (cancelled) return;
        setMembership(me);
        await refreshExtras();

        if (me.status === "active" || attempts >= MAX_POLLS) {
          setPolling(false);
          return;
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404 && attempts < MAX_POLLS) {
          // Membership may still be creating after Flutterwave return.
        } else if (attempts >= MAX_POLLS) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Could not confirm membership status yet.",
          );
          setPolling(false);
          return;
        }
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
  const canCancelRenew =
    membership?.status === "active" && membership.amount > 0 && membership.auto_renew;

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
              : membership?.status === "active"
                ? "You're in"
                : polling
                  ? "Confirming your membership…"
                  : "Thanks — we're finishing setup"}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#171717]/75 sm:text-base">
            {paymentProblem
              ? `${paymentProblem} You can go back to plans and try again.`
              : polling
                ? "If you just paid with Flutterwave, activation can take a moment while the webhook lands."
                : membership?.status === "active"
                  ? "Your membership is active. Wallet, pass minting, and community access may still catch up in the background."
                  : "You can refresh this page later — your session is saved in this browser."}
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
                        ? ` · ${membership.auto_renew && membership.amount > 0 ? "renews" : "expires"} ${new Date(membership.expires_at).toLocaleDateString()}`
                        : ""
                    }`
                  : polling
                    ? "Waiting for confirmation…"
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
                {cancellingRenew ? "Turning off auto-renew…" : "Turn off auto-renew"}
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
                  : "Not minted yet"
              }
            />
            <StatusCard
              title="Wallet"
              body={
                wallet?.wallet_address
                  ? `${wallet.wallet_address} · ${wallet.network ?? "network TBD"}`
                  : "Provisioning…"
              }
            />
            <StatusCard
              title="Community"
              body={
                community
                  ? `${community.status}${
                      community.circle_member_id
                        ? ` · ${community.circle_member_id}`
                        : ""
                    }`
                  : "Pending"
              }
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className="rounded-[6px] border border-[#171717]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#171717]"
            >
              Back to plans
            </Link>
            <Link
              href="/join"
              className="rounded-[6px] border border-[#E2B45F] bg-[#171717] px-5 py-2.5 text-sm font-medium text-white"
            >
              Join the chat
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
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
