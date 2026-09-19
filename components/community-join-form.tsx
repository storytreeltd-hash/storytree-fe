"use client";

import { useState, type FormEvent } from "react";

type CommunityJoinFormProps = {
  source: "join-page" | "footer";
  submitLabel?: string;
  inputClassName: string;
  buttonClassName: string;
  errorClassName?: string;
  successClassName?: string;
};

export function CommunityJoinForm({
  source,
  submitLabel = "Join The Community",
  inputClassName,
  buttonClassName,
  errorClassName = "mt-4 rounded-[6px] bg-red-500/15 px-3 py-2 text-left text-sm text-red-100",
  successClassName = "mt-4 rounded-[6px] bg-green-500/15 px-3 py-2 text-left text-sm text-green-100",
}: CommunityJoinFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/community/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ name, email, phone, source }),
      });

      const data = (await response.json()) as { error?: string };

      if (response.status === 409) {
        setError(data.error ?? "This email is already registered.");
        return;
      }

      if (!response.ok) {
        setError(data.error ?? "Unable to join. Please try again.");
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
    } catch {
      setError("Unable to join. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col">
      <input
        type="text"
        name="name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
        className={inputClassName}
      />
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        className={`mt-3 ${inputClassName}`}
      />
      <input
        type="tel"
        name="phone"
        required
        autoComplete="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Enter your phone number"
        className={`mt-3 ${inputClassName}`}
      />

      {error ? <p className={errorClassName}>{error}</p> : null}
      {success ? (
        <p className={successClassName}>
          You&apos;re in! Welcome to the Story Tree community.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-5 sm:mt-6 ${buttonClassName} disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {isSubmitting ? "Joining..." : submitLabel}
      </button>
    </form>
  );
}
