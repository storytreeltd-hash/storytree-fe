import Image from "next/image";

import { AnimatedLink, FadeIn } from "@/components/motion";

const paragraphClassName =
  "text-sm leading-[24px] text-[#171717]/85 sm:text-base";

export function FilmmakersReady() {
  return (
    <section
      className="relative z-10 py-16 font-inter md:py-28 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F5EDD8 45%, #E2B45F 100%)",
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
        </FadeIn>

        <FadeIn delay={0.05} className="mt-8 sm:mt-10 md:mt-12">
          <p className={`mx-auto text-left max-w-[820px] ${paragraphClassName}`}>
            They said there was no infrastructure to support your vision. We say
            No! We are the infrastructure. StoryTree is where you find your
            crew, where you find your funding, and where you finally find the
            creative freedom to tell our stories, our way. Join us and help us
            prove what we&apos;ve known all along: creativity is in abundance
            and the audience exists.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 sm:mt-10 md:mt-12">
          <div className="relative mx-auto overflow-hidden rounded-lg md:rounded-xl">
            <Image
              src="/makerr.png"
              alt="Film crew on a beach at golden hour"
              width={1176}
              height={308}
              className="h-auto w-full rounded-lg md:rounded-xl"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8 text-center sm:mt-10 md:mt-12">
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
