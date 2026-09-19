import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const storyParagraphs = [
  "StoryTree was developed directly out of a critical industry need by award winning filmmaker and CEO Steve Gukas, through his production company, Natives Filmworks.",
  "Natives Filmworks has been an active player in the African production industry, producing some of its most landmark films which include; Namibia The Struggle For Liberation (Directed by acclaimed director Charles Burnett, Starring Danny Glover and Carl Lumbly) A Place in the Stars, 93 Days, and Living in Bondage: Breaking Free.",
  "Through his First Features Projects, a pan-Nigeria script-to-screen training/mentorship initiative, for first time feature filmmakers, which has delivered 12 stand out titles such as Kill Boro and The Lost Days, he mentors emerging filmmakers, while championing bold storytelling and strengthening the future of Nigerian and African cinema. All 12 films have gone on to be acquired by Amazon PrimeVideo.",
  "Through this journey, the structural problems of the African film ecosystem became completely apparent. Independent filmmakers are starved of sustainable funding, and audiences are treated as passive consumers, who never get the kinds of stories they want to see, because of the limitations of the filmmakers.",
  "By utilizing a blend of audience funding and crowd equity to fund, distribute, and promote high-end African cinema, we shift the power back to the ecosystem. We gather a unified community of film lovers to establish a definitive Proof of Audience first, ensuring that African stories are championed, funded, and owned by the people who care about them most.",
  "The success of any film, depends on one thing: The Audience. But we have over time being told we do not have a viable audience. Nothing can be further from the truth.",
];

export function AboutStory() {
  return (
    <section
      id="about-story"
      className="relative z-10 pb-24 pt-[200px] font-inter md:pb-28 md:pt-[410px] lg:pb-32"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 55%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[900px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0"
          />

          <h2 className="mt-1 text-[32px] font-bold text-[#171717] md:text-[40px]">
            Our Story
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-10 space-y-6 text-left md:mt-12">
          {storyParagraphs.map((paragraph) => (
            <StaggerItem key={paragraph.slice(0, 32)}>
              <p className="text-base leading-[24px] text-[#0D0D0DB2] ">
                {paragraph}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.1} className="mt-12 md:mt-16 md:px-[44px]">
          <blockquote className="flex gap-4 text-left md:gap-5">
            <Image
              src="/quote.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden
              className="h-10 w-10 shrink-0 md:h-12 md:w-12"
            />
            <p className="text-lg font-bold leading-[24px] text-[#171717] md:text-xl">
              StoryTree is built as a proof of audience platform. To prove that
              not only do we have the audience, we ones that will champion and
              support the emergence of a thriving African cinema. StoryTree is
              pulling this audience into a community and providing a platform
              for the to discover, support and promote powerful African films
              and filmmakers.
            </p>
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12 text-center md:mt-16">
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
