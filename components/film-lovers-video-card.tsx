import Image from "next/image";

import {
  videoContentGap,
  videoHalfHeight540,
} from "@/components/about-video";
import { AnimatedButton, FadeIn } from "@/components/motion";

export const filmLoversHalfHeight = videoHalfHeight540;
export const filmLoversContentGap = videoContentGap;

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

export function FilmLoversVideoCard() {
  return (
    <FadeIn
      hero
      delay={0.35}
      className="relative mx-auto w-full max-w-[var(--hero-video-max-width,960px)] px-0"
    >
      <div className="relative aspect-960/540 overflow-hidden rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:rounded-[24px]">
        <Image
          src="/filmLoverss.png"
          alt="Film lovers in a cinema"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 960px"
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
