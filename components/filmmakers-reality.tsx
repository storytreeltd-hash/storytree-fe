import Image from "next/image";

import { AnimatedLink, FadeIn } from "@/components/motion";

const paragraphClassName =
  "text-sm leading-[24px] text-[#171717]/85 sm:text-base";

const realitySections = [
  {
    title: "1. The Follower Trap:",
    description:
      "You\u2019re told you need a massive social media following before your project is bankable. This has created a broken system where your value as a director is measured by your metrics as an influencer. Truth is that not every visionary is comfortable in front of a camera building a brand, and many are simply too busy in the edit suite or on set to play the algorithm\u2019s game. We believe your job is to create, not to spend years performing for likes. We are building the community so you don\u2019t have to, letting you focus on the craft while we provide the crowd.",
    imageSrc: "/makerss1.png",
  },
  {
    title: "2. The Creative Compromise/Budget Paradox:",
    description:
      "You come up with brilliant story idea. Right from the start, you can tell this will need a large canvas, the scope has to be big to service the story. How am I going to raise the funds for this, you ask yourself. For most filmmakers, this is where the idea gets pushed aside. You\u2019ve been told African films can only recoup small budgets. We don\u2019t have a viable audience they say.",
    imageSrc: "/maker2.png",
  },
  {
    title: "3. This leaves our filmmakers, with only one path:",
    description:
      "Western Grants. Because these grants fund the majority of our prestige cinema, our stories are being filtered through foreign lenses to satisfy foreign tastes. Our stories are being miniaturized and niched because no one has done the hard work of proving our own market. StoryTree is a community that makes the journey to funding easy. A community that is at once your funders, audience and promoters. We exists, so your story visions, wont have any limitations. Allowing to create cinema that can stand toe to toe, with the best films being made anywhere in the world.",
    imageSrc: "/makerss3.png",
  },
  {
    title: "4. The Ownership Gap:",
    description:
      "In the current ecosystem, success for an African filmmaker often means being commissioned by a global streamer to create an original. But there is a hidden cost to these deals: you are often treated as a service provider rather than a partner. You hand over your IP for a one-off fee, and while the film might go on to become a global hit or spawn a franchise, you are locked out of the long-term rewards. You take the creative risk, but the streamer keeps the upside, the data, and the legacy. This model doesn't build sustainable careers; it builds a cycle of starting from scratch every time you want to tell a story.",
    imageSrc: "/makers4.png",
  },
];

function FilmmakersSectionImage({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="relative mx-auto mt-6 overflow-hidden rounded-lg md:mt-8 md:rounded-xl">
      <Image
        src={imageSrc}
        alt="Film crew on a beach at golden hour"
        width={1176}
        height={308}
        className="h-auto w-full"
      />
    </div>
  );
}

export function FilmmakersReality() {
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

          <h2 className="mx-auto mt-1 max-w-[720px] text-[26px] font-bold leading-tight text-[#171717] sm:text-[32px] md:text-[40px]">
            Here Is The Reality We Are Changing
          </h2>
        </FadeIn>

        <div className="mt-10 space-y-10 text-left sm:mt-12 sm:space-y-12 md:mt-16 md:space-y-16">
          {realitySections.map((section, index) => (
            <FadeIn key={section.title} delay={0.05 + index * 0.05}>
              <h3 className="text-base font-bold text-[#171717] sm:text-lg md:text-xl">
                {section.title}
              </h3>
              <p className={`mt-4 ${paragraphClassName}`}>{section.description}</p>
              <FilmmakersSectionImage imageSrc={section.imageSrc} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-10 text-center sm:mt-12 md:mt-16">
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
