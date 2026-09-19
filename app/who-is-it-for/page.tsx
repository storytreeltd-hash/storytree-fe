import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhoIsItForContent } from "@/components/who-is-it-for-content";

export const metadata: Metadata = {
  title: "Film Lovers | Story Tree",
  description:
    "StoryTree gives film lovers the power to discover, shape, fund, and champion the African stories they want to see.",
};

export default function FilmLoversPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <WhoIsItForContent activeTab="film-lovers" />
      <Footer />
    </div>
  );
}
