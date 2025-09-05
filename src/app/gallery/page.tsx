import { Metadata } from 'next';
import { GalleryPageClient } from '@/components/galleryPage/GalleryClient';

// --- SEO for the Program Schedule Page ---
export const metadata: Metadata = {
  title: "Program Schedule | SMART-25 AI Conference",
  description: "The detailed program schedule for the SMART-25 conference is being finalized. Check back soon for the full lineup of keynotes, technical sessions, and events.",
  keywords: ["conference schedule", "program", "event timeline", "SMART-25 schedule", "keynote times"],
  alternates: {
    canonical: "https://smart25.org/program-schedule", // Use your actual domain
  },
  openGraph: {
    title: "Program Schedule for SMART-25 (To Be Announced)",
    description: "The full schedule of events for the SMART-25 AI Conference will be released soon. Stay tuned for details on keynotes, panels, and technical sessions.",
    url: "https://smart25.org/program-schedule",
    images: [
      {
        url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
        width: 1200,
        height: 630,
        alt: 'Program Schedule for SMART-25 Conference',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Program Schedule | SMART-25 AI Conference",
    description: "The detailed program schedule for the SMART-25 conference is being finalized. Check back soon for updates.",
    images: ['https://smart25.org/og-image.jpg'],
  },
};

// This is now a simple Server Component
export default function SchedulePage() {
  return <GalleryPageClient />;
}