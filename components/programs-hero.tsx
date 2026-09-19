import Image from "next/image";

import { AnimatedLink, FadeIn } from "@/components/motion";
import { AboutVideoCard } from "@/components/about-video";

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

export function ProgramsHero() {
  return (
    <section
      id="programs"
      className="relative min-h-0 scroll-mt-20 font-inter md:min-h-[600px] lg:min-h-screen lg:scroll-mt-[6.5rem]"
      style={{
        background: "linear-gradient(180deg, #FFFFFF, #C8A360, #E2B45F)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center px-4 pb-12 pt-24 sm:pt-28 md:min-h-[600px] md:px-6 md:pb-20 md:pt-32 lg:min-h-screen lg:px-8 lg:pt-[140px]">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="text-center lg:text-left">
            <FadeIn hero>
              <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-[8px] border border-[#171717]/10 bg-[#0D0D0D1A] px-3 py-2 backdrop-blur-sm md:px-4 lg:mx-0">
                <span className="text-sm text-[#171717] md:text-xl">
                  Welcome to
                </span>
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
              <h1 className="mx-auto mt-6 max-w-[540px] text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#171717] sm:text-[32px] md:mt-10 md:text-[44px] lg:mx-0 lg:text-[48px]">
                Turning Great Stories Into Great Films
              </h1>
            </FadeIn>

            <FadeIn hero delay={0.2}>
              <p className="mx-auto mt-4 max-w-[520px] text-sm leading-[23px] text-[#171717]/80 sm:mt-6 sm:text-base md:text-lg lg:mx-0">
                StoryTree programs are designed to support filmmakers at every
                stage of the journey from idea and development to production,
                audience building, and distribution.
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
          </div>

          <div className="w-full">
            <AboutVideoCard />
          </div>
        </div>
      </div>
    </section>
  );
}
