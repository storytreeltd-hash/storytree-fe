"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  AnimatedButton,
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const paragraphs = [
  "Everything starts with a bold idea and ends with an audience. We are breaking down the traditional, closed-door walls of participation, in film funding, production and distribution, to take stories from the idea all the way to the screen. By anchoring the entire pipeline within our ecosystem, we ensure filmmakers are empowered to deliver films that will compare favourably, with the best the best out there.",
  "The idea is to bring to our community only the most captivating stories, whatever the genre. Equally important is the telling of the story, so part of our quest is not only to find great stories but visionary directors well. The goal is to find a combination that will deliver, compelling films.",
  "Our approach to projects is strictly curatorial: choosing with great care the stories and films that make it to the platform. Only the very best will do. We strive to achieve a level of consistency and quality that builds a fierce bond with our community, so that the StoryTree logo comes to represent a stamp of quality on everything it's on.",
];

const selectionCriteria = [
  {
    title: "Voice & Originality:",
    description:
      "Originality of the story and distinctiveness of the creator's voice.",
  },
  {
    title: "Team Strength:",
    description:
      "The creative caliber and track record of the director, writer, and key cast.",
  },
  {
    title: "Production Viability:",
    description:
      "Realistic execution alignment within the proposed budget range.",
  },
  {
    title: "Global Resonance:",
    description:
      "Cultural authenticity paired with international appeal.",
  },
  {
    title: "Amplification Potential:",
    description:
      "The inherent capacity to generate word-of-mouth, social media discussion, and deep community engagement.",
  },
];

const lifecycleSteps = [
  {
    title: "Submission:",
    description:
      "Creators submit their bold, visionary stories to the StoryTree platform.",
  },
  {
    title: "Streamlining:",
    description:
      "The Advisory Board reviews the submissions, filtering them through our strict selection criteria to present only top-tier projects.",
  },
  {
    title: "Community Voting:",
    description:
      "The StoryTree community exercises its voice. Through governance mechanisms built into the FAN membership/token model, members vote to back the projects they want to see made.",
  },
  {
    title: "Greenlight & Crowdfunding:",
    description:
      "Once voted through, the project is officially greenlit. Funding is raised through community equity offering, completely accessible via local currencies.",
  },
  {
    title: "Blockchain & Tokenization:",
    description:
      "Every financial contribution is recorded transparently on the blockchain, converting local currency funding into fractionalized token ownership for the invested community members.",
  },
  {
    title: "Production & Monitoring:",
    description:
      "As the film goes into production, the project is steered by the expertise of the Advisory Board and monitored transparently by the community.",
  },
  {
    title: "Distribution:",
    description:
      "The final product is delivered directly to the ecosystem, distributed according to the strategic decisions of the community that invested in its creation.",
  },
];

function CriteriaCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="rounded-[8px] bg-white p-5 text-left md:p-6">
      <h4 className="text-sm font-bold text-[#171717] sm:text-base">{title}</h4>
      <p className="mt-3 text-sm leading-[24px] text-[#171717]/85 sm:text-base">
        {description}
      </p>
    </li>
  );
}

export function ProgramsScriptToScreen() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="script-to-screen"
      className="relative z-10 scroll-mt-20 py-16 font-inter md:py-28 lg:scroll-mt-[6.5rem] lg:py-40"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F5EDD8 55%, #E2B45F 100%)",
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

          <h2 className="mt-1 text-[28px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            Script to Screen
          </h2>

          <p className="mt-0 text-sm leading-[24px] text-[#171717]/85 md:text-lg">
            ...the story is everything
          </p>
        </FadeIn>

        <StaggerContainer className="mt-8 space-y-5 text-left sm:mt-10 sm:space-y-6 md:mt-12">
          {paragraphs.map((paragraph) => (
            <StaggerItem key={paragraph.slice(0, 32)}>
              <p className="text-sm leading-[24px] text-[#171717]/85 sm:text-base">
                {paragraph}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 md:mt-16">
          <AnimatedButton
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((open) => !open)}
            className="inline-block rounded-[8px] border border-[#171717] px-8 py-3 text-sm font-medium text-[#171717]"
          >
            {expanded ? "Show Less" : "Find Out More"}
          </AnimatedButton>
        </div>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="script-to-screen-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden text-left"
            >
              <div className="pt-10 text-left md:pt-14">
                <h3 className="text-lg font-bold text-[#171717] md:text-xl">
                  StoryTree Selection Criteria
                </h3>
                <p className="mt-4 text-sm leading-[24px] text-[#171717]/85 sm:text-base">
                  To maintain this standard, every project is rigorously vetted
                  against five core pillars:
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {selectionCriteria.slice(0, 3).map((criterion) => (
                      <CriteriaCard key={criterion.title} {...criterion} />
                    ))}
                  </ul>
                  <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {selectionCriteria.slice(3).map((criterion) => (
                      <CriteriaCard key={criterion.title} {...criterion} />
                    ))}
                  </ul>
                </div>

                <h3 className="mt-10 text-lg font-bold text-[#171717] md:mt-14 md:text-xl">
                  The Lifecycle: How It Works
                </h3>
                <p className="mt-4 text-sm leading-[24px] text-[#171717]/85 sm:text-base">
                  The entire journey is decentralized, transparent, and driven
                  by a continuous loop between our experts and our audience:
                </p>

                <ol className="mt-6 list-none space-y-4 md:mt-8 md:space-y-5">
                  {lifecycleSteps.map((step, index) => (
                    <li
                      key={step.title}
                      className="text-sm leading-[24px] text-[#171717]/85 sm:text-base"
                    >
                      <span className="font-bold text-[#171717]">
                        {index + 1}. {step.title}
                      </span>{" "}
                      {step.description}
                    </li>
                  ))}
                </ol>

                <div className="mt-10 text-center md:mt-14">
                  <AnimatedLink
                    href="/join"
                    className="inline-block rounded-[8px] border border-[#171717] px-8 py-3 text-sm font-medium text-[#171717]"
                  >
                    Join The Community
                  </AnimatedLink>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
