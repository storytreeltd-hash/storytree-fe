import type { Metadata } from "next";

import { CommunityHero } from "@/components/community-hero";
import { CommunityIntro } from "@/components/community-intro";
import {
  CommunityFilmClub,
  CommunityFilmTalkAfrica,
  CommunityMagazine,
  CommunityStore,
} from "@/components/community-sections";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Community | Story Tree",
  description:
    "StoryTree brings together film lovers, filmmakers, critics, industry professionals, and supporters into a vibrant ecosystem built around discovery, conversation, and culture.",
};

export default function CommunityPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <div className="relative -mt-20 lg:-mt-[6.5rem]">
        <CommunityHero />
      </div>
      <CommunityIntro />
      <CommunityFilmTalkAfrica />
      <CommunityFilmClub />
      <CommunityMagazine />
      <CommunityStore />
      <Footer />
    </div>
  );
}
