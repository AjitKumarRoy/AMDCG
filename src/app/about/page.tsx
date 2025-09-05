import type { Metadata } from 'next';
import { AboutPageClient } from '@/components/aboutPage/AboutPageClient';

// --- NEW, CORRECTED METADATA FOR THE AMDCG ABOUT PAGE ---
export const metadata: Metadata = {
  title: "About AMDCG",
  description: "Learn about the mission, vision, and the dedicated team of the Advanced Materials Development and Characterization Group (AMDCG) at IIT Bhilai. Discover our focus on materials science and strategic applications.",
  alternates: {
    canonical: "https://research.iitbhilai.ac.in/amdcg/about",
  },
  openGraph: {
    title: "About AMDCG | Advanced Materials Development and Characterization Group",
    description: "Discover the mission, vision, and team behind AMDCG, a leading materials science research group at IIT Bhilai.",
    url: "https://research.iitbhilai.ac.in/amdcg/about",
    images: [
      {
        url: '/og-image.jpg', // A dedicated OG image for this page
        width: 1200,
        height: 630,
        alt: 'About the AMDCG Research Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About AMDCG | Advanced Materials Development and Characterization Group",
    description: "Discover the mission, vision, and team behind AMDCG, a leading materials science research group at IIT Bhilai.",
    images: ['/og-image.jpg'],
  },
};

export default function AboutPage() {
  // --- ADDED STRUCTURED DATA FOR THE ABOUT PAGE ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About AMDCG | Advanced Materials Development and Characterization Group",
    "url": "https://research.iitbhilai.ac.in/amdcg/about",
    "description": "Learn about the mission, vision, and team of the AMDCG research group.",
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
      <AboutPageClient />
    </>
  );
}