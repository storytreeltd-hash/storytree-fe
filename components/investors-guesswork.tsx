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
  "In the global venture landscape, Proof of Concept is everything. Yet, for decades, the African film industry, representing a continent of 1.25 billion people and a massive, high-spending diaspora, has been overlooked due to a perceived lack of data.To the traditional investor, the African film space has often felt like a gut feeling business. High risk, fragmented distribution, and unquantifiable audiences.",
  "StoryTree is changing the math. We have replaced guesswork with a Participation Ecosystem. We don\u2019t just hope an audience exists; we have gathered them into a single, measurable community. Here is how we are de-risking the African cinematic opportunity:",
];

const investorCards = {
  top: {
    title: "Pre-Validated Greenlighting:",
    description:
      "Through our Script-to-Screen competitions and Film Club feedback loops, projects are vetted by the end-user before significant capital is deployed. We don\u2019t fund and hope; we fund what the audience has already demanded.",
  },
  acquisition: {
    title: "Low-Cost Acquisition:",
    description:
      "We are building a global following so filmmakers don\u2019t have to. This built-in marketing machine significantly lowers the P&A (Print and Advertising) costs for every project under the StoryTree umbrella.",
  },
  discovery: {
    title: "Discovery:",
    description: "Identifying high-potential IP and talent early.",
  },
  data: {
    title: "Aggregated Audience Data:",
    description:
      "StoryTree acts as a data engine. We track engagement, preferences, and spending habits across the continent and the diaspora, providing the Proof of Audience that has been missing from the African film cap table.",
  },
  production: {
    title: "Production:",
    description:
      "Streamlining the path from script to screen with industry veterans.",
  },
  distribution: {
    title: "Distribution:",
    description:
      "Tapping into a global, loyal community ready to watch and promote.",
  },
  bottom: {
    title: "Vertical Integration:",
    description:
      "By controlling the ecosystem from Discovery (Script-to-Screen) to Production (The Workroom) to Distribution (The Film Club and Connect), we reduce leakage and ensure that the value created stays within the ecosystem. You end up with two revenue strands: the platform and the films.",
  },
};

function InvestorCard({
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

export function InvestorsGuesswork() {
  return (
    <section
      className="relative z-10 pb-16 pt-[200px] font-inter md:pb-28 md:pt-[400px] lg:pb-32"
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

          <h2 className="mx-auto mt-1 max-w-[820px] text-[26px] font-bold leading-tight text-[#171717] sm:text-[32px] md:text-[40px]">
            We&apos;ve Removed The Guesswork and Hope From Investing in Film
          </h2>
        </FadeIn>

        <StaggerContainer className="mx-auto mt-8 max-w-[820px] space-y-5 md:mt-12 md:space-y-6">
          {introParagraphs.map((paragraph) => (
            <StaggerItem key={paragraph.slice(0, 32)}>
              <p className={`${paragraphClassName} text-left`}>{paragraph}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="mt-10 flex flex-col gap-2 text-left md:mt-16">
          <StaggerItem>
            <InvestorCard {...investorCards.top} />
          </StaggerItem>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <StaggerItem className="md:col-span-2">
              <InvestorCard {...investorCards.acquisition} />
            </StaggerItem>
            <StaggerItem className="md:col-span-1">
              <InvestorCard {...investorCards.discovery} />
            </StaggerItem>
          </div>

          <StaggerItem>
            <InvestorCard {...investorCards.data} />
          </StaggerItem>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <StaggerItem>
              <InvestorCard {...investorCards.production} />
            </StaggerItem>
            <StaggerItem>
              <InvestorCard {...investorCards.distribution} />
            </StaggerItem>
          </div>

          <StaggerItem>
            <InvestorCard {...investorCards.bottom} />
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
