"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { CommunityJoinForm } from "@/components/community-join-form";
import {
  FadeIn,
  HoverLift,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const socialLinks = [
  { href: "#", icon: "/insta.svg", label: "Instagram" },
  { href: "#", icon: "/x.svg", label: "X" },
  { href: "#", icon: "/youtube.svg", label: "YouTube" },
  { href: "#", icon: "/discord.svg", label: "Discord" },
];

export function Footer() {
  return (
    <footer className="relative font-inter">
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, rgba(171, 160, 139, 0.5) 35%, rgba(189, 167, 124, 0.5) 65%, #E2B45F 100%)",
        }}
      >
        <Image
          src="/treeL.svg"
          alt=""
          width={400}
          height={800}
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 hidden h-[90%] w-auto opacity-40 sm:block"
        />
        <Image
          src="/treeR.svg"
          alt=""
          width={400}
          height={800}
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 hidden h-[90%] w-auto opacity-40 sm:block"
        />

        <div className="relative mx-auto max-w-[1440px] px-4 pt-16 pb-16 md:px-6 md:pt-20 md:pb-20 lg:px-8 lg:pt-[100px] lg:pb-[100px]">
          <FadeIn className="mb-12 flex justify-center md:mb-16 lg:mb-[120px]">
            <HoverLift>
              <Image
                src="/footerImg.png"
                alt="Story Tree community collage"
                width={960}
                height={544}
                className="w-full md:w-auto rounded-[16px] object-cover md:rounded-[24px]"
              />
            </HoverLift>
          </FadeIn>

          <div className="grid items-start gap-10 md:gap-12 lg:grid-cols-2 lg:gap-24">
            <StaggerContainer className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <StaggerItem>
                <Image
                  src="/storyTreeLogo.svg"
                  alt="Story Tree"
                  width={120}
                  height={80}
                  className="h-14 w-auto lg:h-16"
                />
              </StaggerItem>
              <StaggerItem>
                <h2 className="mt-4 max-w-[620px] text-[28px] font-bold leading-tight text-white sm:text-[32px] lg:text-[40px]">
                  A Global Audience Participation & Equity Platform for African
                  & Diasporic Cinema.
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-5 max-w-[630px] text-base leading-[24px] text-white/90">
                  A direct-to-audience initiative utilizing the power of Web3
                  and Blockchain Technology, to build the world&apos;s largest
                  community of African film lovers.
                </p>
              </StaggerItem>
            </StaggerContainer>

            <FadeIn
              direction="left"
              delay={0.1}
              className="mx-auto flex w-full max-w-[420px] flex-col items-stretch text-center lg:ml-auto lg:max-w-[480px] lg:items-end lg:text-right"
            >
              <p className="text-base text-white">
                The audience is out there. Let&apos;s prove it.
              </p>

              <CommunityJoinForm
                source="footer"
                submitLabel="Join The Community"
                inputClassName="w-full rounded-[6px] border border-white/60 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/70 outline-none focus:border-white"
                buttonClassName="w-full rounded-[6px] bg-white px-5 py-3.5 text-sm font-medium text-[#171717]"
              />

              <div className="mt-8 flex w-full justify-center gap-3 lg:justify-end">
                {socialLinks.map(({ href, icon, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={href}
                      aria-label={label}
                      className="flex h-[67px] w-[67px] shrink-0 items-center justify-center rounded-xl border border-white/20 transition-opacity hover:opacity-80"
                    >
                      <Image src={icon} alt="" width={67} height={67} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* <div className="relative z-10 bg-black">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white sm:flex-row md:px-6 lg:px-8">
          <p>© 2026 StoryTree. All rights reserved.</p>
          <p>A record of StoryTree</p>
        </div>
      </div> */}
    </footer>
  );
}
