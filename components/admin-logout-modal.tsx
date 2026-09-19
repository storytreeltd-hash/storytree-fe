"use client";

import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import { getFirebaseAuth } from "@/lib/firebase/client";
import { isFirebaseClientConfigured } from "@/lib/firebase/env";

type AdminLogoutModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AdminLogoutModal({ open, onClose }: AdminLogoutModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, isSubmitting]);

  async function handleConfirm() {
    setIsSubmitting(true);

    try {
      if (isFirebaseClientConfigured()) {
        await signOut(getFirebaseAuth());
      }

      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      window.location.href = "/admin/login";
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        disabled={isSubmitting}
        className="absolute inset-0 bg-[#98A2B3]/40 backdrop-blur-[1px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        className="relative w-full max-w-[420px] rounded-[16px] bg-white px-8 pb-8 pt-10 text-center shadow-[0_20px_60px_rgba(16,24,40,0.18)]"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#667085] transition-colors hover:bg-[#F9FAFB] disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M5 5l8 8M13 5l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2
          id="logout-modal-title"
          className="text-[28px] font-bold leading-tight text-[#101828]"
        >
          Want to log out?
        </h2>
        <p className="mx-auto mt-3 max-w-[300px] text-sm leading-relaxed text-[#667085]">
          Are you sure you want to log out of your account?
        </p>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="mt-8 w-full rounded-[10px] bg-[#F04438] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#D92D20] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
}
