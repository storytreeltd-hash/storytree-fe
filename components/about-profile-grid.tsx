"use client";

import type { Profile } from "@/components/about-profile-data";
import { AboutProfileCard } from "@/components/about-profile-card";
import { StaggerContainer, StaggerItem } from "@/components/motion";

type AboutProfileGridProps = {
  profiles: Profile[];
  onSelect: (profile: Profile) => void;
  keyPrefix?: string;
};

export function AboutProfileGrid({
  profiles,
  onSelect,
  keyPrefix,
}: AboutProfileGridProps) {
  return (
    <StaggerContainer className="mx-auto mt-12 flex max-w-[406px] flex-wrap justify-center gap-x-4 gap-y-6 md:mt-16 lg:max-w-[828px]">
      {profiles.map((profile) => (
        <StaggerItem
          key={keyPrefix ? `${keyPrefix}-${profile.id}` : profile.id}
          className="shrink-0"
        >
          <AboutProfileCard profile={profile} onSelect={onSelect} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
