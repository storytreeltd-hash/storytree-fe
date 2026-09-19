import Image from "next/image";

import { AnimatedLink, FadeIn } from "@/components/motion";
import {
  AboutVideoCard,
  OverlappingVideoHeroSection,
  videoHalfHeight,
} from "@/components/about-video";

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#4ADE80"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CommunityHero() {
  return (
    <OverlappingVideoHeroSection
      halfHeight={videoHalfHeight}
      video={<AboutVideoCard />}
    >
      <FadeIn hero>
        <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-[8px] border border-[#171717]/10 bg-[#0D0D0D1A] px-3 py-2 backdrop-blur-sm md:px-4">
          <span className="text-sm text-[#171717] md:text-xl">Welcome to</span>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={100}
            height={24}
            className="h-6 w-auto"
          />
          <ChevronDownIcon />
        </div>
      </FadeIn>

      <FadeIn hero delay={0.1}>
        <h1 className="mx-auto mt-6 max-w-[600px] text-[26px] font-extrabold leading-[1.15] tracking-tight text-[#171717] sm:mt-8 sm:text-[32px] md:mt-10 md:text-[44px] lg:text-[48px]">
          Where African Cinema Finds Its Community
        </h1>
      </FadeIn>

      <FadeIn hero delay={0.2}>
        <p className="mx-auto mt-4 max-w-[750px] text-sm leading-[23px] text-[#171717]/80 sm:mt-6 sm:text-base md:text-lg">
          StoryTree brings together film lovers, filmmakers, critics, industry
          professionals, and supporters into a vibrant ecosystem built around
          discovery, conversation, and culture.
        </p>
      </FadeIn>

      <FadeIn hero delay={0.3} className="mt-6 md:mt-10">
        <AnimatedLink
          href="/join"
          className="inline-block rounded-[8px] border border-[#171717] px-8 py-3 text-sm font-medium text-[#171717]"
        >
          Join The Community
        </AnimatedLink>
      </FadeIn>
    </OverlappingVideoHeroSection>
  );
}
