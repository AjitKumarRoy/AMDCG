import type { Metadata } from 'next';
import { TeamPageClient } from '@/components/teamPage/TeamPageClient';
import teamPageInfo from '@/data/teamPage/team.json';
import coreMembersData from '@/data/teamPage/coreMembers.json';
// import studentMembersData from '@/data/teamPage/studentMembers.json';


// --- NEW, CORRECTED METADATA FOR THE AMDCG TEAM PAGE ---
export const metadata: Metadata = {
  title: teamPageInfo.hero.title, // "Our Team & Mentors"
  description: `Meet the dedicated faculty, coordinators, and scholars of the Advanced Materials Development and Characterization Group (AMDCG) at IIT Bhilai.`,
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/team`,
  },
  openGraph: {
    title: `${teamPageInfo.hero.title} | AMDCG`,
    description: 'Discover the passionate minds driving the future of materials science and engineering at AMDCG, IIT Bhilai.',
    url: `https://research.iitbhilai.ac.in/amdcg/team`,
    images: [
      {
        url: '/og-image-team.jpg', // A dedicated OG image for the team page
        width: 1200,
        height: 630,
        alt: 'The Team and Mentors of the AMDCG Research Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${teamPageInfo.hero.title} | AMDCG`,
    description: 'Discover the passionate minds driving the future of materials science and engineering at AMDCG, IIT Bhilai.',
    images: ['/og-image-team.jpg'],
  },
};

export default function TeamPage() {
  // --- NEW, CORRECTED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `${teamPageInfo.hero.title} | AMDCG`,
    "url": `https://research.iitbhilai.ac.in/amdcg/team`,
    "description": "Meet the dedicated faculty, coordinators, and student members who form the core of the AMDCG research group at IIT Bhilai.",
    "mainEntity": {
      "@type": "Organization",
      "name": "AMDCG: Advanced Materials Development and Characterization Group",
      "url": "https://research.iitbhilai.ac.in/amdcg/"
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