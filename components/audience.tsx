import Image from "next/image";

import { AudienceStats } from "@/components/audience-stats";
import {
  AnimatedLink,
  FadeIn,
  HoverLift,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

export function Audience() {
  return (
    <section
      className="font-inter pt-24 pb-24 lg:pt-[100px] lg:pb-[100px]"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <StaggerContainer className="text-center lg:text-left lg:col-span-7">
            <StaggerItem>
              <h2 className="mx-auto max-w-[620px] text-[28px] font-bold leading-tight text-[#171717] sm:text-[32px] md:text-[40px] lg:mx-0 lg:leading-[1.15]">
                They say &ldquo;African films do not have a viable audience&rdquo;
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="mx-auto mt-6 max-w-[460px] text-base leading-[24px] text-[#171717]/80 md:text-base lg:mx-0">
                But the facts say otherwise and we are building the worlds largest
                community of African film lovers to prove it.
              </p>
            </StaggerItem>

            <StaggerItem>
              <AudienceStats />
            </StaggerItem>
          </StaggerContainer>

          <FadeIn direction="right" delay={0.1} className="lg:col-span-5">
            <HoverLift>
              <div className="w-full">
                <Image
                  src="/audiencee.png"
                  alt="Story Tree community collage"
                  width={1452}
                  height={816}
                  className="w-full  object-cover"
                />
              </div>
            </HoverLift>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="mt-16 text-center lg:mt-20">
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
