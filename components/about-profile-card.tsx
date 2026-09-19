"use client";

import Image from "next/image";

import type { Profile } from "@/components/about-profile-data";
import { HoverLift } from "@/components/motion";

type AboutProfileCardProps = {
  profile: Profile;
  onSelect: (profile: Profile) => void;
};

export function AboutProfileCard({ profile, onSelect }: AboutProfileCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(profile)}
      className="w-[195px] shrink-0 cursor-pointer text-left"
    >
      <HoverLift>
        <div className="flex flex-col items-center text-center">
          <Image
            src={profile.image}
            alt={profile.name}
            width={195}
            height={195}
            className="h-[195px] w-[195px] rounded-[13px] object-cover"
          />
          <p className="mt-2 text-base font-bold text-[#171717]">
            {profile.name}
          </p>
          <p className="text-[10px] text-[#171717]">
            {profile.title}
          </p>
        </div>
      </HoverLift>
    </button>
  );
}
