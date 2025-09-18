import type { Metadata } from 'next';
import { ResearchPageClient } from '@/components/features/researchPage/ResearchPageClient';
import { Project } from '@/lib/models';
import dbConnect from '@/lib/dbConnect';

export const metadata: Metadata = {
  title: "Research Projects",
  description: "Explore the diverse portfolio of research projects undertaken by the AMDCG, spanning materials science, additive manufacturing, and more.",
  keywords: ['Research Projects', 'AMDCG', 'IIT Bhilai', 'Materials Science', 'Additive Manufacturing', 'Metallurgy'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/research`,
  },
  openGraph: {
    title: "Research Projects | AMDCG",
    description: "Explore the diverse portfolio of research projects at the Advanced Materials Development and Characterization Group.",
    url: `https://research.iitbhilai.ac.in/amdcg/research`,
    images: [
      {
        url: '/og-image-research.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'AMDCG Research Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Research Projects | AMDCG",
    description: "Explore the diverse portfolio of research projects at the AMDCG.",
    images: ['/og-image-research.jpg'],
  },
};

// This function fetches data directly on the server
async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ startDate: -1 });
  return JSON.parse(JSON.stringify(projects));
}

export default async function ResearchPage() {
  const projects = await getProjects();

  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AMDCG Research Projects",
    "description": "A list of research projects conducted by the Advanced Materials Development and Characterization Group.",
    "itemListElement": projects.map((project: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://research.iitbhilai.ac.in/amdcg/projects/${project.slug}`,
      "name": project.title
    }))
  };
  
   return (
    <>

    {/* this script will inject structuredData into the head, this is only for seo purpose */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />



      <ResearchPageClient projects={projects} />
    </>
  );
}