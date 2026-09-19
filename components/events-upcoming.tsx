import Image from "next/image";

import {
  AnimatedLink,
  FadeIn,
  StaggerContainer,
  StaggerItem,
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

const featuredEvent = {
  title: "Special Ecosystem Events",
  description:
    "Panel discussions, live Q&As with industry veterans, and sudden community project greenlight celebrations.",
  imageSrc: "/eventt1.png",
  imageWidth: 1121,
  imageHeight: 202,
  imageAlt: "Special ecosystem events",
};

const upcomingEvents = [
  {
    title: "FilmClub",
    description:
      "Dates, locations, and secure viewing link drops for our quarterly hybrid screening and networking events.",
    imageSrc: "/eventt2.png",
    imageWidth: 549,
    imageHeight: 202,
    imageAlt: "FilmClub event",
  },
  {
    title: "StoryTree Connect",
    description:
      "Host country announcements, voting windows, and scheduling details for our annual flagship physical meetup",
    imageSrc: "/eventt3.png",
    imageWidth: 549,
    imageHeight: 202,
    imageAlt: "StoryTree Connect event",
  },
];

function EventCard({
  title,
  description,
  imageSrc,
  imageWidth,
  imageHeight,
  imageAlt,
  className,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  className?: string;
}) {
  return (
    <article
      className={`overflow-hidden rounded-[8px] p-2 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${className ?? ""}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="h-auto w-full"
      />
      <div className="pt-4 text-left">
        <h3 className="text-base font-bold text-[#171717] md:text-lg">{title}</h3>
        <p className="mt-3 text-sm leading-[24px] text-[#171717]/85 md:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}

export function EventsUpcoming() {
  return (
    <section
      id="upcoming-events"
      className="relative z-10 py-16 font-inter md:py-28 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[1120px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-[8px] border border-[#171717]/10 bg-[#0D0D0D1A] px-3 py-2 backdrop-blur-sm md:px-4">
            <Image
              src="/storyTree.svg"
              alt="Story Tree"
              width={100}
              height={24}
              className="h-6 w-auto brightness-0"
            />
            <ChevronDownIcon />
          </div>

          <h2 className="mt-6 text-[28px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            Upcoming Events
          </h2>

          <p className="mt-3 text-sm leading-[24px] text-[#171717]/85 sm:text-base">
            From this page, you can stay updated on:
          </p>
        </FadeIn>

        <StaggerContainer className="mt-10 flex flex-col gap-2 md:mt-12">
          <StaggerItem>
            <EventCard {...featuredEvent} />
          </StaggerItem>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <StaggerItem key={event.title}>
                <EventCard {...event} className="h-full" />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeIn delay={0.15} className="mt-10 sm:mt-12 md:mt-14">
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
