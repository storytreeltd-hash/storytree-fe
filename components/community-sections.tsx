import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const sectionBackground =
  "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 55%, #E2B45F 100%)";

type GalleryImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type CommunityContentSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  introContent: ReactNode;
  outroParagraphs?: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  galleryImages?: GalleryImage[];
  containerClassName?: string;
};

function CommunityContentSection({
  id,
  title,
  subtitle,
  introContent,
  outroParagraphs,
  imageSrc = "/screen.png",
  imageAlt = "Film crew on a beach at golden hour",
  imageWidth = 1176,
  imageHeight = 308,
  galleryImages,
  containerClassName = "max-w-[785px]",
}: CommunityContentSectionProps) {
  return (
    <section
      id={id}
      className="relative z-10 scroll-mt-20 py-16 font-inter md:py-28 lg:scroll-mt-[6.5rem] lg:py-32"
      style={{ background: sectionBackground }}
    >
      <div
        className={`mx-auto px-4 text-center md:px-6 lg:px-8 ${containerClassName}`}
      >
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />

          <h2 className="mt-1 text-[28px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-2 text-sm leading-[24px] text-[#171717]/85 sm:text-base md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 text-left sm:mt-10 md:mt-12">
          {introContent}
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8 sm:mt-10 md:mt-12">
          {galleryImages?.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {galleryImages.map((item) => (
                <div key={item.src} className="overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width ?? 250}
                    height={item.height ?? 200}
                    className="mx-auto h-auto w-full max-w-[250px]"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="h-auto w-full"
            />
          )}
        </FadeIn>

        {outroParagraphs?.length ? (
          <StaggerContainer className="mt-8 space-y-5 text-left sm:mt-10 sm:space-y-6 md:mt-12">
            {outroParagraphs.map((paragraph) => (
              <StaggerItem key={paragraph.slice(0, 32)}>
                <p className="text-sm leading-[24px] text-[#171717]/85 sm:text-base">
                  {paragraph}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : null}

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

const paragraphClassName =
  "text-sm leading-[24px] text-[#171717]/85 sm:text-base";

export function CommunityFilmTalkAfrica() {
  return (
    <CommunityContentSection
      id="filmtalk-africa"
      title="FilmTalk Africa"
      introContent={
        <p className={paragraphClassName}>
          Catch up on everything African & Diasporic cinema. Join our host Steve
          Gukas as he has conversations with the who-is-who of global African
          filmmaking. From exclusives on new films making great strides and
          upcoming projects, to industry trends and aspirations. Enjoy great
          conversations as a consummate filmmaker drills for the essence of our
          industry with fellow practitioners in what is always sure to be
          insightful and entertaining.
        </p>
      }
      imageSrc="/filmTalkk.png"
    />
  );
}

export function CommunityFilmClub() {
  return (
    <CommunityContentSection
      id="film-club"
      title="Film Club"
      introContent={
        <div className="space-y-5 sm:space-y-6">
          <p className={paragraphClassName}>
            You know this feeling: you see a headline about a Kenyan director
            winning an award at Cannes, or a Senegalese film getting a standing
            ovation in Berlin, and your heart swells with pride. You go to
            search for it, ready to play, eager to see our continent reflected
            back at you...
          </p>
          <p className={paragraphClassName}>
            And then, you hit the wall. It&apos;s not on your streaming apps.
            It&apos;s not at the local cinema. If you&apos;re in the diaspora,
            it&apos;s playing in a boutique theater three cities away for one
            night only. If you&apos;re on the continent, the global platforms
            have decided your region doesn&apos;t have the buying power to
            justify the license.
          </p>
          <p className={paragraphClassName}>
            We are completely tearing down that wall. The StoryTree FilmClub is
            our direct answer to these systemic discovery and access problems.
            We hand-curate the very best of African and diasporic films, invite
            key crew members and directors for live Q&As, and turn every single
            gathering into a high-energy networking event.
          </p>
        </div>
      }
      outroParagraphs={[
        "Using dedicated secure screening platforms, we provide screening passes to screening rooms for members to watch the film ahead of the physical screening. A physical and virtual screening takes place on the appointed meet date, with the filmmakers in attendance. The community discusses the films, followed by a Q&A with the filmmakers. The locations of these physical screenings vary, but could be anywhere in the world.",
        "The official FilmClub calendar drops regularly across our social media platforms and directly inside the community chat room.",
      ]}
      imageSrc="/comClub.png"
    />
  );
}

export function CommunityMagazine() {
  return (
    <CommunityContentSection
      id="magazine"
      title="Magazine"
      subtitle="We are rewriting how our history is documented."
      introContent={
        <p className={paragraphClassName}>
          The StoryTree Magazine is our curated digital editorial space, serving
          as the definitive, premium archive for African and diasporic film
          information and evolving culture trends. We move far past standard
          press releases to deliver sharp, uncompromising film reviews,
          deep-dive filmmaker profiles, historical retrospectives, and stunning
          visual essays. Built by the community, for the community, this is
          where our legacy is preserved and shared with absolute excellence.
        </p>
      }
      imageSrc="/comMagazine.png"
    />
  );
}

export function CommunityStore() {
  return (
    <CommunityContentSection
      id="store"
      title="Store"
      containerClassName="max-w-[860px]"
      introContent={
        <p className={`text-center ${paragraphClassName}`}>
          Wear the movement. The StoryTree Store is the exclusive home for all
          official community merchandise, limited-edition apparel, and special
          film memorabilia drops.
        </p>
      }
      galleryImages={[
        {
          src: "/black.png",
          alt: "StoryTree black t-shirt",
          width: 250,
          height: 200,
        },
        {
          src: "/red.png",
          alt: "StoryTree red t-shirt",
          width: 250,
          height: 200,
        },
        {
          src: "/white.png",
          alt: "StoryTree white t-shirt",
          width: 250,
          height: 200,
        },
      ]}
    />
  );
}
