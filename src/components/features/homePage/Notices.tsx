"use client";

import { Section } from "@/components/ui/Section";
import { AnnouncementRecruitment } from "./AnnouncementRecruitment";
import { UpcomingEvents } from "./UpcomingEvents";
import { type Announcement, type Recruitment, type Event } from '@/types';

// Define the props for the component
interface NoticesProps {
  announcements: Announcement[];
  recruitments: Recruitment[];
  events: Event[];
}

export function Notices({ announcements, recruitments, events }: NoticesProps) {
  return (
    <Section>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <AnnouncementRecruitment 
          announcements={announcements} 
          recruitments={recruitments} 
        />
        <UpcomingEvents events={events} />
      </div>
    </Section>
  );
}