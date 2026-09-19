import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProgramsHero } from "@/components/programs-hero";
import { ProgramsFocusGroup } from "@/components/programs-focus-group";
import { ProgramsScreening } from "@/components/programs-screening";
import { ProgramsTrainings } from "@/components/programs-trainings";
import { ProgramsScriptToScreen } from "@/components/programs-script-to-screen";
import { ProgramsWorkroom } from "@/components/programs-workroom";

export const metadata: Metadata = {
  title: "Programs | Story Tree",
  description:
    "StoryTree programs are designed to support filmmakers at every stage of the journey from idea and development to production, audience building, and distribution.",
};

export default function ProgramsPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <div className="relative -mt-20 lg:-mt-[6.5rem]">
        <ProgramsHero />
      </div>
      <ProgramsScriptToScreen />
      <ProgramsWorkroom />
      <ProgramsFocusGroup />
      <ProgramsScreening />
      <ProgramsTrainings />
      <Footer />
    </div>
  );
}
