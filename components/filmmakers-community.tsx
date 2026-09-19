import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const paragraphClassName =
  "text-sm leading-[24px] text-[#171717]/85 sm:text-base";

const introParagraph =
  "We aren\u2019t just a platform; we are a Proof of Audience. When you bring your project to StoryTree, you aren\u2019t just looking for a platform, you are entering an end to end Project Development Workroom.";

const communityCards = {
  top: [
    {
      title: "Your Built-In Tribe:",
      description:
        "We connect you directly to 1.25 billion potential fans who help shape your films, fund your films, watch and share them.",
    },
    {
      title: "The Workroom Advantage:",
      description:
        "Access a team of leading industry practitioners dedicated to helping you develop your project into a film you\u2019d be proud of.",
    },
  ],
  middle: {
    title: "Retention of Power:",
    description:
      "On StoryTree, you keep ownership of your work. You make the films you want to make, and the audience gets the films they\u2019ve been waiting to see.",
  },
  bottom: [
    {
      title: "The Script-to-Screen Greenlight:",
      description:
        "Pitch your stories directly to the community. If they love it, we greenlight it.",
    },
    {
      title: "The cast & Crew Benefit:",
      description:
        "Everyone enjoys the upside of the projects they work on. Cast & Crew get a share of the profits, everyone wins.",
    },
  ],
};

function CommunityCard({
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

export function FilmmakersCommunity() {
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
            StoryTree Is The Community of The Future.
          </h2>
        </FadeIn>

        <FadeIn delay={0.05} className="mx-auto mt-8 max-w-[820px] md:mt-12">
          <p className={`${paragraphClassName} text-left`}>{introParagraph}</p>
        </FadeIn>

        <StaggerContainer className="mt-10 flex flex-col gap-2 text-left md:mt-16">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {communityCards.top.map((card) => (
              <StaggerItem key={card.title}>
                <CommunityCard {...card} />
              </StaggerItem>
            ))}
          </div>

          <StaggerItem>
            <CommunityCard {...communityCards.middle} />
          </StaggerItem>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {communityCards.bottom.map((card) => (
              <StaggerItem key={card.title}>
                <CommunityCard {...card} />
              </StaggerItem>
            ))}
          </div>
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
