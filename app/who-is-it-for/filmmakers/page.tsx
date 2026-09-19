import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhoIsItForContent } from "@/components/who-is-it-for-content";

export const metadata: Metadata = {
  title: "Filmmakers | Story Tree",
  description:
    "StoryTree supports filmmakers with the tools, community, and infrastructure to bring African stories to the world.",
};

export default function FilmmakersPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <WhoIsItForContent activeTab="filmmakers" />
      <Footer />
    </div>
  );
}
