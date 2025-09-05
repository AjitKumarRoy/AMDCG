"use client";

import { Section } from "@/components/ui/Section";
import { VisionSection } from "./VisionSection";
import { MissionSection } from "./MissionSection";

export function MissionVison() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Contains both Welcome and Mission */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <MissionSection />
        </div>
        
        {/* Right Column: Team Spotlight remains the same */}
        <div className="lg:col-span-1">
          <VisionSection />
        </div>
      </div>
    </Section>
  );
}