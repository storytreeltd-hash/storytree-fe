"use client";

import Image from "next/image";

import { AnimatedLink, FadeIn } from "@/components/motion";
import { WhoIsItForTabs } from "@/components/who-is-it-for-tabs";

export function WhoIsItFor() {
  return (
    <section
      className="relative overflow-hidden font-inter pt-24 pb-24 lg:pt-[180px] lg:pb-[180px]"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <Image
        src="/whoL.svg"
        alt=""
        width={400}
        height={800}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 hidden h-[60%] w-auto opacity-60 sm:block lg:opacity-100"
      />
      <Image
        src="/whoR.svg"
        alt=""
        width={400}
        height={800}
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 hidden h-[60%] w-auto opacity-60 sm:block lg:opacity-100"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />

          <h2 className="mt-1 text-[28px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            Who is it for?
          </h2>

          <p className="mx-auto mt-4 max-w-[590px] text-base leading-[24px] text-[#171717]/70">
            People who crave representation, people who want to see their most
            authentic selves reflected back at them, in the stories we tell.
            People who want to see visionary, high-end African and Diasporic
            films, that can compete globally.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 sm:mt-10">
          <WhoIsItForTabs variant="home" />
        </FadeIn>

        <FadeIn delay={0.12} className="mt-10 flex justify-center lg:mt-12">
          <Image
            src="/filmm.png"
            alt="Film lovers at a beach production scene"
            width={881}
            height={326}
            className="h-auto w-full max-w-[881px] rounded-lg object-cover"
          />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 lg:mt-12">
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
