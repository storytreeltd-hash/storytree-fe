import Image from "next/image";

import {
  AnimatedButton,
  AnimatedLink,
  FadeIn,
  HoverLift,
} from "@/components/motion";

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#4ADE80"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M1 1L9 6L1 11V1Z" fill="#171717" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden font-sans md:min-h-screen">
      <div className="absolute inset-0 isolate">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          className="object-cover object-center saturate-[0.9] contrast-[1.05]"
          sizes="100vw"
        />

        <div
          className="absolute inset-0 z-1"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(172, 146, 98, 0.55) 27%, rgba(200, 163, 96, 0.68) 49%, rgba(226, 180, 95, 0.82) 100%)",
          }}
        />

        <div
          className="absolute inset-0 z-2"
          style={{
            background:
              "linear-gradient(180deg, rgba(18, 12, 8, 0.72) 0%, rgba(28, 20, 14, 0.35) 22%, transparent 48%)",
          }}
        />

        <div
          className="absolute inset-0 z-3"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 14% 6%, rgba(255, 244, 210, 0.55) 0%, rgba(255, 230, 170, 0.2) 35%, transparent 58%)",
          }}
        />

        <div
          className="absolute inset-0 z-4"
          style={{
            background:
              "linear-gradient(0deg, rgba(32, 22, 14, 0.5) 0%, rgba(50, 38, 26, 0.18) 28%, transparent 52%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1440px] items-center px-4 pb-12 pt-24 md:min-h-screen md:px-6 md:pb-16 md:pt-28 lg:px-8 lg:pb-16 lg:pt-28">
        <div className="grid w-full items-center gap-10 md:gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <FadeIn hero delay={0.05}>
              <div className="flex flex-wrap items-center justify-center gap-2 rounded-[8px] border border-white/20 bg-black/25 px-3 py-2 backdrop-blur-sm md:px-4 lg:justify-start">
                <span className="text-base text-white md:text-xl">Welcome to</span>
                <Image
                  src="/storyTree.svg"
                  alt="Story Tree"
                  width={100}
                  height={24}
                  className="h-6 w-auto"
                />
                <ChevronDownIcon />
              </div>
            </FadeIn>

            <FadeIn hero delay={0.15}>
              <h1 className="mt-6 max-w-[560px] text-[32px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[36px] md:text-[48px] lg:max-w-none font-inter">
                Building the world&apos;s largest community of African film lovers
              </h1>
            </FadeIn>

            <FadeIn hero delay={0.25}>
              <p className="mt-4 text-lg leading-[23px] text-white/90 md:text-xl">
                ...a proof of audience for our films
              </p>
            </FadeIn>

            <FadeIn hero delay={0.35} className="mt-8">
              <AnimatedLink
                href="/who-is-it-for"
                className="inline-block rounded-[6px] bg-white px-6 py-3 text-sm font-medium text-[#171717]"
              >
                Who Is It For?
              </AnimatedLink>
            </FadeIn>
          </div>

          <FadeIn hero delay={0.2} direction="left" className="relative w-full">
            <HoverLift>
              <div className="relative overflow-hidden rounded-[16px] md:rounded-[24px]">
                <Image
                  src="/footerImg.png"
                  alt="Story Tree film collage"
                  width={960}
                  height={544}
                  className="aspect-960/544 w-full object-cover"
                  priority
                />

                <AnimatedButton
                  type="button"
                  className="absolute bottom-4 left-1/2 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/80 px-3 py-2 backdrop-blur-sm sm:bottom-5 sm:left-5 sm:translate-x-0 sm:gap-2.5 sm:px-4 sm:py-2.5"
                >
                  <PlayIcon />
                  <span className="text-xs font-medium text-[#171717] sm:text-sm">
                    Watch the video
                  </span>
                </AnimatedButton>
              </div>
            </HoverLift>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
