"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useLayoutEffect, useState } from "react";

const STORAGE_KEY = "storytree-preloader-seen";
const WELCOME_BG = "#000000";

const INTRO_LOGO_SRC = "/storyTreeLogo.svg";
const LOGO_SIZE = 220;

const ease = [0.76, 0, 0.24, 1] as const;
const enterEase = [0.22, 1, 0.36, 1] as const;

const TIMING = {
  welcomeEnter: 900,
  exit: 1200,
} as const;

type Phase = "welcome" | "exit";

type SitePreloaderProps = {
  children: React.ReactNode;
};

function shouldSkipPreloader() {
  if (typeof window === "undefined") {
    return true;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

function IntroLogoHalf({ side }: { side: "left" | "right" }) {
  const halfWidth = LOGO_SIZE / 2;

  return (
    <div
      className="overflow-hidden"
      style={{ width: halfWidth, height: LOGO_SIZE }}
      aria-hidden
    >
      <Image
        src={INTRO_LOGO_SRC}
        alt=""
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        priority
        className="max-w-none select-none"
        style={{
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          marginLeft: side === "right" ? -halfWidth : 0,
        }}
        draggable={false}
      />
    </div>
  );
}

export function SitePreloader({ children }: SitePreloaderProps) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("welcome");

  useLayoutEffect(() => {
    if (shouldSkipPreloader()) {
      return;
    }

    setActive(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const finishPreloader = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setActive(false);
    document.body.style.overflow = "";
  }, []);

  const handleEnter = useCallback(() => {
    setPhase("exit");
    window.setTimeout(finishPreloader, TIMING.exit + 120);
  }, [finishPreloader]);

  const isExiting = phase === "exit";
  const exitDuration = TIMING.exit / 1000;
  const exitTransition = { duration: exitDuration, ease };

  return (
    <>
      {children}

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key="site-preloader"
            className="fixed inset-0 z-200 overflow-hidden"
            style={{ backgroundColor: isExiting ? "transparent" : WELCOME_BG }}
            role="dialog"
            aria-modal="true"
            aria-label="Welcome to Story Tree"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {isExiting ? (
              <>
                <motion.div
                  className="absolute inset-y-0 left-0 z-10 flex w-1/2 items-center justify-end"
                  style={{ backgroundColor: WELCOME_BG }}
                  initial={{ x: 0 }}
                  animate={{ x: "-100%" }}
                  transition={exitTransition}
                >
                  <IntroLogoHalf side="left" />
                </motion.div>

                <motion.div
                  className="absolute inset-y-0 right-0 z-10 flex w-1/2 items-center justify-start"
                  style={{ backgroundColor: WELCOME_BG }}
                  initial={{ x: 0 }}
                  animate={{ x: "100%" }}
                  transition={exitTransition}
                >
                  <IntroLogoHalf side="right" />
                </motion.div>
              </>
            ) : null}

            <AnimatePresence>
              {phase === "welcome" ? (
                <motion.div
                  key="welcome"
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
                  style={{ backgroundColor: WELCOME_BG }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  <motion.div
                    className="flex flex-1 flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 14, scale: 0.965 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: TIMING.welcomeEnter / 1000,
                      ease: enterEase,
                    }}
                  >
                    <Image
                      src={INTRO_LOGO_SRC}
                      alt="Story Tree"
                      width={LOGO_SIZE}
                      height={LOGO_SIZE}
                      priority
                      className="h-auto w-[min(68vw,220px)] select-none"
                      draggable={false}
                    />
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={handleEnter}
                    className="mb-40 rounded-[6px] border border-[#C8A360] bg-white px-8 py-2.5 text-sm font-medium text-[#171717] transition hover:bg-[#F5F2EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A360]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: TIMING.welcomeEnter / 1000,
                      delay: 0.25,
                      ease: enterEase,
                    }}
                  >
                    Enter
                  </motion.button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
