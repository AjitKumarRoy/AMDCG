"use client";

import { Section } from "@/components/ui/Section";
import { AnnouncementRecruitment } from "./AnnouncementRecruitment";
import { UpcomingEvents } from "./UpcomingEvents";

export function Notices() {
  return (
    <Section>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <AnnouncementRecruitment />
        <UpcomingEvents />
      </div>
    </Section>
  );
}