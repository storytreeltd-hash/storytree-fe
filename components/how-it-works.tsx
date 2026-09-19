"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

import { FadeIn } from "@/components/motion";
import { scrollToHash } from "@/lib/scroll-to-hash";

const workItems = [
  {
    src: "/works1.svg",
    title: "StoryTree Connect",
    subtitle: "Community meetups",
    href: "/events#storytree-connect",
    className:
      "left-1/2 top-[3%] -translate-x-1/2 sm:top-[2%] lg:top-0",
  },
  {
    src: "/works2.svg",
    title: "Script-to-Screen",
    subtitle: "Development/Mentorship",
    href: "/programs#script-to-screen",
    className:
      "right-[2%] top-[16%] sm:right-[-4%] sm:top-[20%] lg:top-[20%] lg:right-[6%]",
  },
  {
    src: "/works3.svg",
    title: "Web3 & Blockchain",
    subtitle: "The technology of StoryTree",
    href: "/how-it-works#web3-blockchain",
    className:
      "right-[2%] bottom-[16%] sm:right-[-4%] sm:bottom-[20%] lg:bottom-[23%] lg:right-[6%]",
  },
  {
    src: "/works4.svg",
    title: "Community",
    subtitle: "Connect & discuss",
    href: "/community#community",
    className:
      "bottom-[3%] left-1/2 -translate-x-1/2 sm:bottom-[2%] lg:bottom-0",
  },
  {
    src: "/works5.svg",
    title: "FilmTalk Africa",
    subtitle: "Everything Africa & diasporic filmmaking",
    href: "/community#filmtalk-africa",
    className:
      "bottom-[16%] left-[2%] sm:bottom-[20%] sm:left-[-4%] lg:bottom-[20%] lg:left-[6%]",
  },
  {
    src: "/works6.svg",
    title: "Film Club",
    subtitle: "Watch & share",
    href: "/community#film-club",
    className:
      "left-[2%] top-[16%] sm:left-[-4%] sm:top-[20%] lg:top-[20%] lg:left-[6%]",
  },
];

function WorkItem({
  src,
  title,
  subtitle,
  href,
  className,
  index,
}: {
  src: string;
  title: string;
  subtitle: string;
  href: string;
  className: string;
  index: number;
}) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const path = href.slice(0, hashIndex) || "/";
    const id = href.slice(hashIndex + 1);

    if (pathname === path) {
      event.preventDefault();
      scrollToHash(id);
      window.history.pushState(null, "", href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ scale: 1.05 }}
      className={`absolute z-10 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[260px] ${className}`}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="flex flex-col items-center text-center transition-opacity hover:opacity-90"
      >
        <Image
          src={src}
          alt=""
          width={100}
          height={100}
          className="h-[72px] w-[72px] sm:h-[80px] sm:w-[80px] lg:h-[100px] lg:w-[100px]"
        />
        <h3 className="mt-2.5 text-xs font-bold leading-tight text-[#171717] sm:mt-3 sm:text-sm md:text-[14px] lg:text-xl">
          {title}
        </h3>
        <p className="mt-1 text-[10px] leading-snug text-[#171717]/55 sm:mt-1 sm:text-xs md:text-xs lg:text-base ">
          {subtitle}
        </p>
      </Link>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 font-inter pt-24 pb-24 lg:scroll-mt-[6.5rem] lg:pt-[100px] lg:pb-[100px]"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />

          <h2 className="mt-1 text-[28px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            How it works
          </h2>

          <p className="mx-auto mt-4 max-w-[640px] text-base leading-[24px] text-[#171717]/55 md:mt-6 md:text-lg">
            StoryTree brings together the people who create stories, support them,
            and help turn them into films through a simple and connected process.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="relative mx-auto mt-12 h-[455px] w-full max-w-[328px] sm:mt-14 sm:h-[480px] sm:max-w-[360px] md:h-[560px] md:max-w-[440px] lg:mt-20 lg:h-[780px] lg:max-w-[900px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/worksTree.svg"
              alt=""
              width={293}
              height={350}
              aria-hidden
              className="h-auto w-[104px] sm:w-[150px] md:w-[200px] lg:w-[293px]"
            />
          </motion.div>

          {workItems.map((item, index) => (
            <WorkItem key={item.src} {...item} index={index} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
