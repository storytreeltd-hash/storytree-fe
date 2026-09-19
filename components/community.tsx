import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const keywords = ["Discovery", "Funding", "Promotions", "Distribution"];

export function Community() {
  return (
    <section
      className="font-inter pt-24 pb-24 lg:pt-[224px] lg:pb-[224px]"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <StaggerContainer className="mx-auto max-w-[1440px] px-4 text-center md:px-6 lg:px-8">
        <StaggerItem>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />
        </StaggerItem>

        <StaggerItem>
          <h2 className="mx-auto mt-1 max-w-[820px] text-[24px] font-bold leading-tight text-[#171717] sm:text-[28px] md:text-[40px] md:leading-[1.2]">
            A Global Audience Participation & Equity Platform for African &
            Diasporic Cinema.
          </h2>
        </StaggerItem>

        <StaggerItem>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-[24px] text-[#171717]/80 md:text-lg">
            Utilizing a blend of audience funding and crowd equity to fund,
            distribute, and promote high-end African cinema, shifting the power
            back to the industry.
          </p>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-bold text-[#171717] md:text-base">
            {keywords.map((keyword, index) => (
              <span key={keyword} className="inline-flex items-center">
                {index > 0 && <span className="mx-2 font-normal">•</span>}
                {keyword}
              </span>
            ))}
          </p>
        </StaggerItem>
      </StaggerContainer>

      <FadeIn className="mt-6 w-full">
        <Image
          src="/globalAudience.png"
          alt="Story Tree community crowd"
          width={2592}
          height={296}
          className="h-[140px] w-full object-cover object-center sm:h-[180px] md:h-[220px] lg:h-[280px]"
          sizes="100vw"
        />
      </FadeIn>

      <FadeIn className="mx-auto max-w-[1440px] px-4 pt-12 text-center md:px-6 lg:px-8 lg:pt-14">
        <AnimatedLink
          href="/join"
          className="inline-block rounded-[8px] border border-[#171717] px-8 py-3 text-sm font-medium text-[#171717]"
        >
          Join The Community
        </AnimatedLink>
      </FadeIn>
    </section>
  );
}
