import Image from "next/image";

import { AnimatedLink, FadeIn } from "@/components/motion";

export function WhoIsItForQuote() {
  return (
    <section
      className="relative z-10 pb-16 pt-[200px] font-inter md:pb-28 md:pt-[400px] lg:pb-32"
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
        </FadeIn>

        <FadeIn delay={0.05} className="mt-10">
          <blockquote className="mx-auto max-w-[900px]">
            <div className="flex items-center justify-center gap-1">
              <Image
                src="/quote.svg"
                alt=""
                width={48}
                height={48}
                aria-hidden
                className="mx-auto h-8 w-8"
              />
              <p className="mt-4 text-lg font-bold leading-[24px] text-[#212E6D] sm:text-xl">
                We are way way better and way way more powerful together than we
                are apart
              </p>
              <Image
                src="/quote.svg"
                alt=""
                width={48}
                height={48}
                aria-hidden
                className="mx-auto h-8 w-8"
              />
            </div>
            <footer className="mt-6 text-base font-normal leading-[24px] text-[#171717]/80 md:mt-8 md:text-lg">
              David Oyelowo
            </footer>
          </blockquote>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 md:mt-14">
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
