import type { Metadata } from 'next';
import { TeamPageClient } from '@/components/features/teamPage/TeamPageClient';
import { TeamMember } from '@/lib/models';
import dbConnect from '@/lib/dbConnect';

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the dedicated faculty, coordinators, and scholars of the Advanced Materials Development and Characterization Group (AMDCG) at IIT Bhilai.",
  keywords: ['AMDCG Team', 'IIT Bhilai Researchers', 'Materials Science Faculty', 'PhD Scholars'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/team`,
  },
  openGraph: {
    title: "Our Team | AMDCG",
    description: "Meet the dedicated faculty, coordinators, and scholars of the AMDCG at IIT Bhilai.",
    url: `https://research.iitbhilai.ac.in/amdcg/team`,
    images: [
      {
        url: '/og-image-team.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'The AMDCG Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Our Team | AMDCG",
    description: "Meet the dedicated faculty, coordinators, and scholars of the AMDCG at IIT Bhilai.",
    images: ['/og-image-team.jpg'],
  },
};

// This function fetches all team members on the server
async function getTeamMembers() {
  await dbConnect();
  const members = await TeamMember.find({});
  return JSON.parse(JSON.stringify(members));
}

export default async function TeamPage() {
  const allMembers = await getTeamMembers();


  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AMDCG Team Members",
    "description": "A list of the core team, scholars, and alumni of the AMDCG research group.",
    "itemListElement": allMembers.map((member: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Person",
        "name": member.name,
        "url": `https://research.iitbhilai.ac.in/amdcg/team/${member.slug}`
      }
    }))
  };
  
    return (
    <>

    {/* this script will be injected into the head, this is only for seo purpose */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />



      <TeamPageClient members={allMembers} />
    </>
  );
}