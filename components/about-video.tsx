import Image from "next/image";
import type { ReactNode } from "react";

import { AnimatedButton, FadeIn } from "@/components/motion";

const videoMaxWidth = "min(100vw - 2rem, var(--hero-video-max-width, 960px))";

/** Half the rendered video height — used for overlap math (272/960 of width). */
export const videoHalfHeight = `calc(${videoMaxWidth} * 272 / 960)`;

/** Half height for 960×540 video cards. */
export const videoHalfHeight540 = `calc(${videoMaxWidth} * 270 / 960)`;

/** Extra gap between hero copy and the overlapping video. */
export const videoContentGap = "var(--hero-video-bottom-gap)";

/** Bottom spacer inside hero sections for the overlapping video card. */
export function heroVideoSpacerHeight(halfHeight: string) {
  return `calc(${halfHeight} + var(--hero-video-bottom-gap))`;
}

const heroGradient =
  "linear-gradient(180deg, #FFFFFF, #C8A360, #E2B45F)";

type OverlappingVideoHeroSectionProps = {
  id?: string;
  halfHeight: string;
  video: ReactNode;
  children: ReactNode;
  contentClassName?: string;
};

/** Hero shell with a video card that overlaps the next section. */
export function OverlappingVideoHeroSection({
  id,
  halfHeight,
  video,
  children,
  contentClassName = "",
}: OverlappingVideoHeroSectionProps) {
  return (
    <section
      id={id}
      className="relative overflow-x-clip font-inter"
      style={{ background: heroGradient }}
    >
      <div
        className={`relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-start px-4 pt-24 text-center sm:pt-28 md:px-6 md:pt-32 lg:px-8 lg:pt-[220px] ${contentClassName}`}
        style={{ paddingBottom: heroVideoSpacerHeight(halfHeight) }}
      >
        {children}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-4 md:px-6 lg:px-8">
        {video}
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M1 1L9 6L1 11V1Z" fill="white" />
    </svg>
  );
}

export function AboutVideoCard() {
  return (
    <FadeIn
      hero
      delay={0.35}
      className="relative mx-auto w-full max-w-[var(--hero-video-max-width,960px)] px-0"
    >
      <div className="relative aspect-960/544 overflow-hidden rounded-[16px] bg-[#171717] shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:rounded-[24px] flex items-center justify-center">
        <Image
          src="/thumbnail.svg"
          alt="Story Tree video thumbnail"
          // fill
          width={330}
          height={186}
          priority
          className=" object-center w-[100px] md:w-[330px] h-auto "
          // sizes="(max-width: 360px) 10vw, 360px"
        />

        <AnimatedButton
          type="button"
          className="absolute bottom-4 left-1/2 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-[6px] bg-[#FFFFFF40] px-3 py-2 backdrop-blur-sm sm:gap-2.5 sm:px-4 sm:py-2.5 md:bottom-8"
        >
          <PlayIcon />
          <span className="text-xs font-medium text-white sm:text-sm">
            Watch the video
          </span>
        </AnimatedButton>
      </div>
    </FadeIn>
  );
}
