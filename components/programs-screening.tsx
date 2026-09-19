import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const paragraphs = [
  "At the moment, brilliant, high-end stories struggle to find their audience at home because the conventional distribution network is severely fractured. To make matters worse, filmmakers are forced to navigate rampant piracy concerns, where a single leak onto messaging apps or unauthorized download sites can completely drain a project’s lifecycle revenue before it even has a chance to scale. This risk makes global distribution incredibly punitive for independent creators.",
  "Our Screenings rewrite this entirely through the deployment of secure, decentralized technology. StoryTree offers a secure network that protects intellectual property from day one, allowing us to seamlessly host hybrid screenings, blending elite, real-world premier pop-ups with gated, encrypted virtual access for our global community. However the film is screened, we ensure peace of mind for filmmakers, while bringing the community",
];

const features = [
  "Film Club",
  "Premiere Screenings",
  "Private Screening Rooms",
];

export function ProgramsScreening() {
  return (
    <section
      id="screenings"
      className="relative z-10 py-16 font-inter md:py-28 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
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
            Screening
          </h2>
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

        <FadeIn delay={0.1} className="mt-8 sm:mt-10 md:mt-12">
          <Image
            src="/screening.png"
            alt="Film crew on a beach at golden hour"
            width={1176}
            height={308}
            className="h-auto w-full rounded-lg md:rounded-xl"
          />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-5 sm:mt-6 md:mt-[60px]">
          <ul className="flex flex-col gap-1 text-xs text-[#171717]/85 sm:text-sm md:hidden">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <p className="hidden text-base leading-[24px] text-[#171717]/85 md:block">
            {features.join(" · ")}
          </p>
        </FadeIn>

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
