"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

import type { Profile } from "@/components/about-profile-data";

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type ProfileModalProps = {
  profile: Profile | null;
  onClose: () => void;
};

export function ProfileModal({ profile, onClose }: ProfileModalProps) {
  useEffect(() => {
    if (!profile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [profile, onClose]);

  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-3 py-4 sm:px-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-name"
        >
          <button
            type="button"
            aria-label="Close profile"
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[min(90dvh,720px)] w-full max-w-[1200px] overflow-y-auto overscroll-contain rounded-[16px] bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:max-h-[90vh] sm:rounded-[20px] sm:p-6 md:rounded-[24px] md:p-10"
          >
            <button
              type="button"
              aria-label="Close profile"
              onClick={onClose}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] md:right-6 md:top-6 md:h-9 md:w-9"
            >
              <CloseIcon />
            </button>

            <div className="flex items-start gap-3 pr-10 sm:gap-4 sm:pr-12 md:gap-5 md:pr-14">
              <Image
                src={profile.image}
                alt={profile.name}
                width={72}
                height={72}
                className="h-14 w-14 shrink-0 rounded-[8px] object-cover sm:h-16 sm:w-16 md:h-[72px] md:w-[72px] md:rounded-[10px]"
              />
              <div className="min-w-0 pt-0.5 text-left sm:pt-1">
                <h3
                  id="profile-modal-name"
                  className="text-lg font-bold leading-tight text-[#171717] sm:text-xl md:text-2xl"
                >
                  {profile.name}
                </h3>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#171717]/55 sm:text-xs md:text-sm">
                  {profile.title}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:mt-8 sm:gap-6 md:mt-10 md:grid-cols-2 md:gap-10">
              <div className="space-y-4 text-left text-[13px] leading-[24px] text-[#171717]/75 sm:space-y-5 sm:text-sm md:text-base">
                {profile.bioLeft.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="space-y-4 border-t border-[#171717]/10 pt-5 text-left text-[13px] leading-[24px] text-[#171717]/75 sm:space-y-5 sm:text-sm md:border-t-0 md:border-l md:pt-0 md:pl-10 md:text-base">
                {profile.bioRight.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
