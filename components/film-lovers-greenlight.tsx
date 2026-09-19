import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const paragraphClassName =
  "text-sm leading-[24px] text-[#171717]/85 sm:text-base";

const introParagraphs = [
  "Support the making of kinds of African stories and films you\u2019ve always wanted to see.",
];

const greenlightCards = {
  top: {
    title: "You are the Greenlight:",
    description:
      "Through our Script-to-Screen competitions, you decide which stories deserve to be told.",
  },
  middle: [
    {
      title: "You are a part of the filmmaking experience:",
      description:
        "From visiting sets to participating as extras, we are tearing down the wall between the audience and the art.",
    },
    {
      title: "You are the Investor:",
      description:
        "By supporting projects you like directly, you don\u2019t just watch the success, you share in the profits.",
    },
  ],
  bottom: {
    title: "You are the Community:",
    description:
      "Whether it\u2019s through the FilmTalk Africa podcast, the StoryTree Film Club, where you discover powerful African and Diasporic stories, told by visionary directors, or our in-person StoryTree Connect meetups in cities across the globe, you are finally in a room with people who love the craft as much as you do.",
  },
};

function GreenlightCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="h-full rounded-[8px] bg-white p-5 text-left sm:p-6 md:p-8">
      <h3 className="text-sm font-bold text-[#171717] sm:text-base md:text-lg">
        {title}
      </h3>
      <p className={`mt-3 sm:mt-4 ${paragraphClassName}`}>{description}</p>
    </article>
  );
}

export function FilmLoversGreenlight() {
  return (
    <section
      className="relative z-10 py-16 font-inter md:py-28 lg:py-32"
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

          <h2 className="mt-1 text-[26px] font-bold leading-tight text-[#171717] sm:text-[32px] md:text-[40px]">
            Lets Greenlight Our Own Stories...
          </h2>
        </FadeIn>

        <StaggerContainer className="mx-auto mt-[10px] max-w-[820px] space-y-5 md:space-y-6">
          {introParagraphs.map((paragraph) => (
            <StaggerItem key={paragraph.slice(0, 32)}>
              <p className={`${paragraphClassName} text-center`}>{paragraph}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="mt-10 flex flex-col gap-2 text-left md:mt-16">
          <StaggerItem>
            <p className={`${paragraphClassName} font-semibold pb-3 text-center`}>
              When you join StoryTree, you aren&apos;t just a subscriber. You are a
              stakeholder in the future of African storytelling.{" "}
            </p>
          </StaggerItem>
          <StaggerItem>
            <GreenlightCard {...greenlightCards.top} />
          </StaggerItem>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {greenlightCards.middle.map((card) => (
              <StaggerItem key={card.title}>
                <GreenlightCard {...card} />
              </StaggerItem>
            ))}
          </div>

          <StaggerItem>
            <GreenlightCard {...greenlightCards.bottom} />
          </StaggerItem>
        </StaggerContainer>

        <FadeIn delay={0.15} className="mt-10 text-center md:mt-16">
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
