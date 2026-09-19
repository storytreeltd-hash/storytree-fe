"use client";

import Image from "next/image";
import { useState } from "react";

import { ambassadorProfiles } from "@/components/about-profile-data";
import { AboutProfileGrid } from "@/components/about-profile-grid";
import { ProfileModal } from "@/components/about-profile-modal";
import { StaggerContainer, StaggerItem } from "@/components/motion";

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

export function AboutAmbassadors() {
  const [selectedProfile, setSelectedProfile] = useState<
    (typeof ambassadorProfiles)[number] | null
  >(null);

  return (
    <>
      <section
        id="ambassadors"
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
                StoryTree Ambassadors
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="mx-auto mt-6 max-w-[820px] text-base leading-[24px] text-[#171717]/80 md:mt-8 md:text-lg">
                Carrying the StoryTree movement to the world, we have aligned with
                influential industry powerhouse talents. Voices and advocates who
                embody our vision. Our Ambassadors are the champions of the
                community.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <AboutProfileGrid
            profiles={ambassadorProfiles}
            onSelect={setSelectedProfile}
            keyPrefix="ambassador"
          />
        </div>
      </section>

      <ProfileModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </>
  );
}
