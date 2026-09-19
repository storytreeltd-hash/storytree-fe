import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const introParagraphs = [
  "The Workroom is a collaborative channel in the community where filmmakers refine story and finetune script. A laboratory designed to polish projects at any stage into the best possible version. It is an active laboratory designed to polish projects, at any stage, into the best scale possible.",
  "The workroom bridges the gap between great ideas and brilliant execution by pulling projects from two distinct pipelines within our community.",
];

const pipelines = [
  {
    title: "The Competition Pipeline:",
    description:
      "Winning stories from our internal community Script to Screen competitions are funneled here to be fine-tuned and prepared for production.",
  },
  {
    title: "The Independent Pipeline:",
    description:
      "Independent filmmakers can open up their own external stories to the Workroom, gaining direct access to industry veterans, seasoned professionals, and community members to workshop, refine, and elevate their projects.",
  },
];

export function ProgramsWorkroom() {
  return (
    <section
      id="project-development-workroom"
      className="relative z-10 py-16 font-inter md:py-28 lg:py-32"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #FFFFFF 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />

          <h2 className="mt-1 text-[26px] font-bold leading-tight text-[#171717] sm:text-[32px] md:text-[40px]">
            Project Development Workroom
          </h2>
        </FadeIn>

        <StaggerContainer className="mx-auto mt-8 max-w-[900px] space-y-5 md:mt-12 md:space-y-6">
          {introParagraphs.map((paragraph) => (
            <StaggerItem key={paragraph.slice(0, 32)}>
              <p className="text-left text-sm leading-[24px] text-[#171717]/85 sm:text-base">
                {paragraph}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="mt-10 flex flex-col items-stretch gap-4 text-left md:mt-16 md:flex-row md:items-start md:justify-center md:gap-2">
          {pipelines.map((pipeline, index) => (
            <StaggerItem
              key={pipeline.title}
              className={index === 0 ? "w-full md:w-[334px]" : "w-full md:w-[442px]"}
            >
              <div className="rounded-[8px] bg-white p-5 sm:p-6 md:p-8">
                <h3 className="text-sm font-bold text-[#171717] sm:text-base md:text-lg">
                  {pipeline.title}
                </h3>
                <p className="mt-3 text-sm leading-[24px] text-[#171717]/85 sm:mt-4 sm:text-base">
                  {pipeline.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.15} className="mt-10 text-center md:mt-16">
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
