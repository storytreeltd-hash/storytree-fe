import Image from "next/image";

import { FadeIn } from "@/components/motion";

export function ProgramsFocusGroup() {
  return (
    <section
      id="focus-group"
      className="relative min-h-[420px] overflow-hidden font-inter sm:min-h-[480px] md:min-h-[640px] lg:min-h-screen"
    >
      <div className="absolute inset-0 isolate">
        <Image
          src="/focusGroup.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 " />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[900px] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[480px] sm:py-20 md:min-h-[640px] md:px-6 md:py-28 lg:min-h-screen">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-7 w-auto sm:h-8 md:h-9"
          />

          <h2 className="mt-1 text-[28px] font-bold text-white sm:text-[32px] md:text-[40px]">
            Focus Group
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6 sm:mt-8 md:mt-10">
          <p className="text-sm leading-[24px] text-white/90 sm:text-base">
            Our community becomes your focus group. Through our test screenings,
            filmmakers get crucial feedback on knotty issues. Whether it&apos;s
            that ending you are not sure of or a plot twist check, you get first
            hand feedback from your audience. This takes away doubt and allows
            you to embark on the roll out of your film with confidence.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
