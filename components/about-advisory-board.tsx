"use client";

import Image from "next/image";
import { useState } from "react";

import { advisoryBoardProfiles } from "@/components/about-profile-data";
import { AboutProfileGrid } from "@/components/about-profile-grid";
import { ProfileModal } from "@/components/about-profile-modal";
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

export function AboutAdvisoryBoard() {
  const [selectedProfile, setSelectedProfile] = useState<
    (typeof advisoryBoardProfiles)[number] | null
  >(null);

  return (
    <>
      <section
        id="advisory-board"
        className="font-inter pt-24 pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32"
        style={{
          background:
            "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 55%, #E2B45F 100%)",
        }}
      >
        <div className="mx-auto max-w-[1232px] px-4 text-center md:px-6 lg:px-8">
          <StaggerContainer>
            <StaggerItem>
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
            </StaggerItem>

            <StaggerItem>
              <h2 className="mt-1 text-[32px] font-bold text-[#171717] md:text-[40px]">
                Advisory Board
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="mx-auto mt-6 max-w-[760px] text-base leading-[24px] text-[#171717]/80 md:mt-8 md:text-base">
                To guide the StoryTree vision, we have assembled industry leaders
                who are actively shaping the development of StoryTree and anchoring
                The Griot Room, the StoryTree exclusive channel. They provide deep
                mentorship, masterclasses, training, and strategic counsel on
                Africa & diasporic filmmaking.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <AboutProfileGrid
            profiles={advisoryBoardProfiles}
            onSelect={setSelectedProfile}
          />

          <FadeIn delay={0.1} className="mt-12 md:mt-16">
            <AnimatedLink
              href="/join"
              className="inline-block rounded-[8px] border border-[#171717] bg-[#E8D1A0]/40 px-8 py-3 text-sm font-medium text-[#171717] hover:bg-[#E8D1A0]/60"
            >
              Join The Community
            </AnimatedLink>
          </FadeIn>
        </div>
      </section>

      <ProfileModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </>
  );
}
