import type { Metadata } from "next";

import { EventsCommunityConnect } from "@/components/events-community-connect";
import { EventsHero } from "@/components/events-hero";
import { EventsUpcoming } from "@/components/events-upcoming";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Events | Story Tree",
  description:
    "From screenings and masterclasses to networking and industry conversations, StoryTree events bring filmmakers, film lovers, and ecosystem builders together both online and in person.",
};

export default function EventsPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <div className="relative -mt-20 lg:-mt-[6.5rem]">
        <EventsHero />
      </div>
      <EventsCommunityConnect />
      <EventsUpcoming />
      <Footer />
    </div>
  );
}
