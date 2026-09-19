import Image from "next/image";

import { AnimatedLink, FadeIn } from "@/components/motion";

const paragraphClassName =
  "text-sm leading-[24px] text-[#171717]/85 sm:text-[20px] font-semibold";

const closingLines = [
  "StoryTree is where capital meets culture.",
];

export function InvestorsReady() {
  return (
    <section
      className="relative z-10 py-16 font-inter md:py-28 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[900px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />

          <h2 className="mx-auto mt-1 max-w-[1000px] text-[26px] font-bold leading-tight text-[#171717] sm:text-[32px] md:text-[38px]">
            We have proof of the most critical element for the success of any
            film - the Audience. Now you can invest with confidence.
          </h2>
        </FadeIn>

        <FadeIn
          delay={0.05}
          className="mx-auto mt-8 max-w-[820px] space-y-5 sm:mt-10 md:mt-12 md:space-y-1"
        >
          {closingLines.map((line) => (
            <p key={line} className={paragraphClassName}>
              {line}
            </p>
          ))}
        </FadeIn>

        <FadeIn delay={0.1} className="mt-4 md:mt-5">
          <div className="relative mx-auto overflow-hidden rounded-lg md:rounded-xl">
            <Image
              src="/comCommunity.png"
              alt="Film crew on a beach at golden hour"
              width={1176}
              height={308}
              className="h-auto w-full"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-4 md:mt-5">
          <p className="text-base text-[#0D0D0DB2] ">
             Find out how you can be part of the story
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8 text-center sm:mt-10 md:mt-12">
          <AnimatedLink
            href="/join"
            className="inline-block rounded-[8px] border border-[#171717] bg-[#E8D1A0]/40 px-8 py-3 text-sm font-medium text-[#171717] hover:bg-[#E8D1A0]/60"
          >
            Join The Community
          </AnimatedLink>
        </FadeIn>
      </div>
    </section>
  );
}
