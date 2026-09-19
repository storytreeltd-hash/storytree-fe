import Image from "next/image";

import { AnimatedLink, FadeIn } from "@/components/motion";

export function CommunityIntro() {
  return (
    <section
      id="community"
      className="relative z-10 scroll-mt-20 pb-16 pt-[200px] font-inter md:pb-28 md:pt-[400px] lg:scroll-mt-[6.5rem] lg:pb-32"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 55%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[785px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />

          <h2 className="mt-1 text-[28px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            Community
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 text-left sm:mt-10 md:mt-12">
          <p className="text-sm  leading-[24px] text-[#171717]/85 sm:text-base">
            Every community needs activities to keep its members engaged and
            StoryTree is not any different. From exclusive offerings, to our
            very own podcast and magazine, a film club to special events. We also
            have merchandise store that offer products that proclaim your
            belonging and and style, to memorabilia from great African and
            Diasporic films as well as the projects you support on StoryTree.
            Some of our community offerings include.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8 sm:mt-10 md:mt-12">
          <Image
            src="/comCommunity.png"
            alt="Film crew on a beach at golden hour"
            width={2592}
            height={296}
            className="h-auto w-full rounded-lg md:rounded-xl"
          />
        </FadeIn>

        <FadeIn delay={0.2} className="mt-8 text-center sm:mt-10 md:mt-12">
          <AnimatedLink
            href="/join"
            className="inline-block rounded-[8px] border border-[#171717] px-8 py-3 text-sm font-medium text-[#171717]"
          >
            Join The Community
          </AnimatedLink>
        </FadeIn>
      </div>
    </section>
  );
}
