import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  HoverLift,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

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

export function AboutTeam() {
  return (
    <section
      id="team"
      className="font-inter pt-24 pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 55%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[1232px] px-4 text-center md:px-6 lg:px-8">
        <StaggerContainer>
          <StaggerItem>
            <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-[8px] border border-[#171717]/10 bg-[#0D0D0D1A] px-3 py-2 backdrop-blur-sm md:px-4">
              <Image
                src="/storyTree.svg"
                alt="Story Tree"
                width={100}
                height={24}
                className="h-6 w-auto brightness-0"
              />
              <ChevronDownIcon />
            </div>
          </StaggerItem>

          <StaggerItem>
            <h2 className="mt-1 text-[32px] font-bold text-[#171717] md:mt-1 md:text-[40px]">
              Meet the Team
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="mx-auto mt-6 max-w-[770px] text-left text-base leading-[24px] text-[#171717]/80 md:mt-8 md:text-lg">
              StoryTree is built by people who believe that African stories
              deserve to be bold, ambitious, entertaining, and world-class. <br /> <br /> This
              is a platform for everyone who believes in the power of African
              storytelling. We’re always looking for passionate people to join
              the journey. Get in touch to learn about open roles and
              opportunities to be part of the team.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn className="mt-10 md:mt-14">
          <HoverLift>
            <Image
              src="/team.svg"
              alt="Story Tree team in a meeting"
              width={1232}
              height={307}
              className="h-auto w-full rounded-[20px] object-cover shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:rounded-[24px]"
            />
          </HoverLift>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 md:mt-12">
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
