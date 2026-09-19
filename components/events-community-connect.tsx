"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  AnimatedButton,
  AnimatedLink,
  FadeIn,
} from "@/components/motion";

const connectActivities = [
  {
    title: "Ecosystem Screenings:",
    description:
      "Large-scale physical premieres of our community-backed and curated films, experienced on the big screen with the exact audience that helped bring them to life.",
    width: "md:w-[462px]",
  },
  {
    title: "In-Person Masterclasses:",
    description:
      "Rigorous, hands-on workshops and roundtable discussions led by the industry veterans and professionals from our training programs.",
    width: "md:w-[334px]",
  },
  {
    title: "Industry Networking:",
    description:
      "Curated social events, debates, and mixers that connect local filmmakers with international creators and investors.",
    width: "md:w-[403px]",
  },
  {
    description:
      "A dedicated networking space where independent filmmakers, writers, and technical talent can pitch projects face-to-face, attach crew, and form cross-border co-productions.",
    width: "md:w-[393px]",
  },
];

const paragraphClassName =
  "text-sm leading-[24px] text-[#171717]/85 sm:text-base";

function ConnectActivityCard({
  title,
  description,
}: {
  title?: string;
  description: string;
}) {
  return (
    <article className="h-full rounded-xl bg-white p-5 text-left md:p-6">
      <p className={paragraphClassName}>
        {title ? (
          <span className="font-bold text-[#171717]">{title} </span>
        ) : null}
        {description}
      </p>
    </article>
  );
}

export function EventsCommunityConnect() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="storytree-connect"
      className="relative z-10 scroll-mt-20 py-16 font-inter md:py-28 lg:scroll-mt-[6.5rem] lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[950px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />

          <h2 className="mt-1 text-[28px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            Community Connect
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 sm:mt-10 md:mt-12 text-left">
          <p className={paragraphClassName}>
            StoryTree Connect is our flagship community connect activity. From
            film festivals to cities across the globe, it affords members an
            in-person meetup opportunity. This is usually in an informal
            setting, allowing members to let down their hair and interact. It
            also features screening of platform films, updates on community
            activities as well as upcoming projects and activities.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8 sm:mt-10 md:mt-12">
          <Image
            src="/comCommunity.png"
            alt="Film crew on a beach at golden hour"
            width={1176}
            height={308}
            className="h-auto w-full rounded-lg md:rounded-xl"
          />
        </FadeIn>

        <div className="mt-8 sm:mt-10 md:mt-12">
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
              key="community-connect-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden text-left"
            >
              <div className="pt-10 md:pt-14">
                <h3 className="text-lg font-bold text-[#171717] md:text-xl">
                  A Nomadic, Community-Voted Gathering
                </h3>
                <p className={`mt-4 ${paragraphClassName}`}>
                  To reflect our borderless ecosystem, StoryTree Connect
                  doesn&apos;t have a permanent home. Every year, potential host
                  countries and cities are pitched, debated, and voted on
                  directly by the community through our governance mechanisms.
                  Whether we gather in Nairobi, Accra, Lagos, or a major
                  diaspora hub, the destination is entirely a collective choice
                  based on where our community wants to meet next.
                </p>

                <h3 className="mt-10 text-lg font-bold text-[#171717] md:mt-14 md:text-xl">
                  What Happens at Connect?
                </h3>
                <p className={`mt-4 ${paragraphClassName}`}>
                  The annual meetup is designed to turn digital relationships
                  into real-world infrastructure and creative partnerships:
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  <ul className="flex flex-col gap-2 md:flex-row md:items-stretch">
                    {connectActivities.slice(0, 2).map((activity) => (
                      <li
                        key={activity.title ?? activity.description.slice(0, 32)}
                        className={`w-full ${activity.width}`}
                      >
                        <ConnectActivityCard {...activity} />
                      </li>
                    ))}
                  </ul>
                  <ul className="flex flex-col gap-2 md:flex-row md:items-stretch">
                    {connectActivities.slice(2).map((activity) => (
                      <li
                        key={activity.title ?? activity.description.slice(0, 32)}
                        className={`w-full ${activity.width}`}
                      >
                        <ConnectActivityCard {...activity} />
                      </li>
                    ))}
                  </ul>
                </div>

                <p className={`mt-10 md:mt-14 ${paragraphClassName}`}>
                  StoryTree Connect is the physical anchor of our platform, a
                  place to watch incredible cinema, build secure professional
                  networks, and strengthen the offline ties that keep our
                  community growing.
                </p>

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
