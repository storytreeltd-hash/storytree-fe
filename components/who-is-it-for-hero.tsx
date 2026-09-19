"use client";

import {
  filmLoversHalfHeight,
  FilmLoversVideoCard,
} from "@/components/film-lovers-video-card";
import {
  filmmakersHalfHeight,
  FilmmakersVideoCard,
} from "@/components/filmmakers-video-card";
import {
  investorsHalfHeight,
  InvestorsVideoCard,
} from "@/components/investors-video-card";
import { OverlappingVideoHeroSection } from "@/components/about-video";
import { AnimatedLink, FadeIn } from "@/components/motion";
import {
  type WhoIsItForTabId,
  WhoIsItForTabs,
} from "@/components/who-is-it-for-tabs";

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

const heroContent: Record<
  WhoIsItForTabId,
  { heading: string; description: string }
> = {
  "film-lovers": {
    heading: "You Already Love Films, Now Be Part Of The Process",
    description:
      "For too long, audiences have been treated as spectators. StoryTree gives filmmakers, film lovers, and supporters the power to discover, shape, fund, and champion the stories they want to see.",
  },
  filmmakers: {
    heading: "You Stop, You Die.",
    description:
      "African Filmmakers keep starting from zero. StoryTree is how we change that.",
  },
  investors: {
    heading: "Now You Can Invest With Confidence",
    description:
      "For decades, investing in African cinema has felt like a leap of faith. StoryTree replaces guesswork with data, community validation, and proof of audience.",
  },
};

const videoConfig: Record<
  WhoIsItForTabId,
  { halfHeight: string; VideoCard: typeof FilmLoversVideoCard }
> = {
  "film-lovers": {
    halfHeight: filmLoversHalfHeight,
    VideoCard: FilmLoversVideoCard,
  },
  filmmakers: {
    halfHeight: filmmakersHalfHeight,
    VideoCard: FilmmakersVideoCard,
  },
  investors: {
    halfHeight: investorsHalfHeight,
    VideoCard: InvestorsVideoCard,
  },
};

export function WhoIsItForHero({ activeTab }: { activeTab: WhoIsItForTabId }) {
  const content = heroContent[activeTab];
  const { halfHeight, VideoCard } = videoConfig[activeTab];

  return (
    <OverlappingVideoHeroSection
      halfHeight={halfHeight}
      video={<VideoCard />}
      contentClassName="!lg:pt-[180px]"
    >
      <FadeIn hero>
        <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-[8px] border border-[#171717]/10 bg-[#0D0D0D1A] px-3 py-2 backdrop-blur-sm md:px-4">
          <span className="text-sm text-[#171717] md:text-xl">
            Who is it for?
          </span>
          <ChevronDownIcon />
        </div>
      </FadeIn>

      <FadeIn hero delay={0.05} className="mt-6 md:mt-8">
        <WhoIsItForTabs variant="page" activeTab={activeTab} />
      </FadeIn>

      <FadeIn hero delay={0.1}>
        <h1 className="mx-auto mt-6 max-w-[700px] text-[26px] font-extrabold leading-[1.15] tracking-tight text-[#171717] sm:mt-8 sm:text-[32px] md:mt-10 md:text-[44px] lg:text-[48px]">
          {content.heading}
        </h1>
      </FadeIn>

      <FadeIn hero delay={0.2}>
        <p className="mx-auto mt-4 max-w-[720px] text-sm leading-[23px] text-[#171717]/80 sm:mt-6 sm:text-base md:text-lg">
          {content.description}
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
