import type { Metadata } from 'next';
import { TeamPageClient } from '@/components/teamPage/TeamPageClient';
import teamPageInfo from '@/data/teamPage/team.json';
import coreMembersData from '@/data/teamPage/coreMembers.json';
// import studentMembersData from '@/data/teamPage/studentMembers.json';


// --- NEW, CORRECTED METADATA FOR THE TEAM PAGE ---
export const metadata: Metadata = {
  title: teamPageInfo.hero.title, // e.g., "Our Team & Mentors"
  description: `Meet the dedicated faculty, coordinators, student members, and mentors from leading institutions like NERIST, ISRO, and DRDO who guide ORBI's research and innovation.`,
  alternates: {
    canonical: `https://orbi.nerist.ac.in/team`,
  },
  openGraph: {
    title: `${teamPageInfo.hero.title} | ORBI`,
    description: 'Discover the passionate minds driving the future of aerospace, AI, and robotics at ORBI.',
    url: `https://orbi.nerist.ac.in/team`,
    images: [
      {
        url: '/og-image-team.jpg', // A dedicated OG image for this page
        width: 1200,
        height: 630,
        alt: 'The Team and Mentors of the ORBI Research Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${teamPageInfo.hero.title} | ORBI`,
    description: 'Discover the passionate minds driving the future of aerospace, AI, and robotics at ORBI.',
    images: ['/og-image-team.jpg'],
  },
};

export default function TeamPage() {
  // --- NEW, CORRECTED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `${teamPageInfo.hero.title} | ORBI`,
    "url": `https://orbi.nerist.ac.in/team`,
    "description": "Meet the dedicated faculty, coordinators, student members, and mentors who form the core of the ORBI research group at NERIST.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ORBI: Orbital Research & Beyond Innovations",
      "url": "https://orbi.nerist.ac.in/"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TeamPageClient 
        hero={teamPageInfo.hero} 
        coreMembers={coreMembersData} 
        // studentMembers={studentMembersData} 
      />
    </>
  );
}