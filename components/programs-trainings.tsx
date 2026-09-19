import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const introParagraph =
  "The art of filmmaking is constantly evolving, just as there is need for new entrants to learn and master their chosen craft, there is the need for established practitioners to stay sharp and keep up with trends by constantly updating their skills. Throughout the year StoryTree offers intro and refresher courses to ensure, our industry has ready crafts people to deploy on the projects that are generated. Training opportunities are announced as they become available.";

const outroParagraphs = [
  "Facilitated by some of the best industry practitioners from across the globe, we aim for the training programmes to be highly practical. Providing training across critical specialisations including;",
  "First Features our training and mentorship opportunity for first time film director is our premier training initiative, offering emerging filmmakers a path to getting their film projects produced through the community.",
];

export function ProgramsTrainings() {
  return (
    <section
      id="trainings"
      className="relative z-10 py-16 font-inter md:py-28 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[920px] px-4 text-center">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />

          <h2 className="mt-1 text-[28px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            Trainings
          </h2>
        </FadeIn>

        <FadeIn delay={0.05} className="mt-8 sm:mt-10 md:mt-12">
          <blockquote className="border-l-2 border-[#212E6D] bg-white px-4 py-5 sm:px-6 sm:py-6">
            <p className="text-center text-sm italic leading-[24px] text-[#171717]/70 font-sans md:text-base">
              &ldquo;An industry that hopes to scale sustainably cannot survive
              on mediocrity; it requires masters of individual crafts.&rdquo;
            </p>
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 text-left sm:mt-10 md:mt-12">
          <p className="text-sm leading-[24px] text-[#171717]/85 sm:text-base">
            {introParagraph}
          </p>
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="mt-8 sm:mt-10 md:mt-12 flex flex-col md:flex-row gap-2"
        >
          <Image
            src="/train1.png"
            alt="Film crew on a beach at golden hour"
            width={1176}
            height={308}
            className="h-auto w-full md:w-1/2"
          />
          <Image
            src="/train2.png"
            alt="Film crew on a beach at golden hour"
            width={1176}
            height={308}
            className="h-auto w-full md:w-1/2"
          />
        </FadeIn>

        <StaggerContainer className="mt-8 space-y-5 text-left sm:mt-10 sm:space-y-6 md:mt-12">
          {outroParagraphs.map((paragraph) => (
            <StaggerItem key={paragraph.slice(0, 32)}>
              <p className="text-sm leading-[24px] text-[#171717]/85 sm:text-base">
                {paragraph}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.2} className="mt-8 text-center sm:mt-10 md:mt-12">
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
