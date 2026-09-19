import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { MediaGallery } from "@/components/media-gallery";
import { MediaHero } from "@/components/media-hero";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Media | Story Tree",
  description:
    "Explore the people, projects, events, and conversations shaping the StoryTree ecosystem and the future of African cinema.",
};

export default function MediaPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <div className="relative -mt-20 lg:-mt-[6.5rem]">
        <MediaHero />
      </div>
      <MediaGallery />
      <Footer />
    </div>
  );
}
