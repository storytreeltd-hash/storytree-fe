"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, type FormEvent } from "react";

import { getSafeAdminRedirect } from "@/lib/admin-redirect";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/auth-errors";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { isFirebaseClientConfigured } from "@/lib/firebase/env";

const inputClassName =
  "w-full rounded-[6px] border border-[#171717]/20 bg-white px-4 py-3 text-sm text-[#171717] placeholder:text-[#171717]/50 outline-none focus:border-[#E2B45F]";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!isFirebaseClientConfigured()) {
        setError("Firebase is not configured. Check your environment variables.");
        return;
      }

      const auth = getFirebaseAuth();
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        let message = "Unable to sign in.";

        try {
          const contentType = response.headers.get("content-type") ?? "";

          if (contentType.includes("application/json")) {
            const data = (await response.json()) as { error?: string };
            message = data.error ?? message;
          } else {
            const text = (await response.text()).trim();
            if (text) {
              message = text;
            }
          }
        } catch {
          // Keep the default message when the response cannot be parsed.
        }

        setError(message);
        return;
      }

      const redirectTo = getSafeAdminRedirect(searchParams.get("from"));
      router.push(redirectTo);
      router.refresh();
    } catch (caughtError) {
      setError(getFirebaseAuthErrorMessage(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/logoB.svg"
            alt="Story Tree"
            width={120}
            height={80}
            className="mx-auto h-12 w-auto"
          />
        </Link>
        <h1 className="mt-6 text-[28px] font-bold text-[#171717]">Admin Login</h1>
        <p className="mt-2 text-sm text-[#171717]/70">
          Sign in with your Firebase admin account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 rounded-[12px] bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:p-8">
        <label className="block text-left text-sm font-medium text-[#171717]">
          Email
          <input
            type="email"
            name="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className={`mt-2 ${inputClassName}`}
          />
        </label>

        <label className="mt-4 block text-left text-sm font-medium text-[#171717]">
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className={`mt-2 ${inputClassName}`}
          />
        </label>

        {error ? (
          <p className="mt-4 rounded-[6px] bg-red-50 px-3 py-2 text-left text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-[6px] border border-[#E2B45F] bg-[#171717] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#171717]/60">
        <Link href="/" className="underline underline-offset-2 hover:text-[#171717]">
          Back to site
        </Link>
      </p>
    </div>
  );
}
