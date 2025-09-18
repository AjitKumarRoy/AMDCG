import type { Metadata } from 'next';
import { FacilitiesPageClient } from '@/components/features/facilitiesPage/FacilitiesPageClient';
import { Facility } from '@/lib/models';
import dbConnect from '@/lib/dbConnect';

export const metadata: Metadata = {
  title: "Our Facilities",
  description: "Explore the state-of-the-art research facilities and equipment available at the AMDCG, including characterization, processing, and testing instruments.",
  keywords: ['AMDCG Facilities', 'IIT Bhilai Labs', 'Research Equipment', 'Materials Characterization', 'SEM', 'XRD'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/facilities`,
  },
  openGraph: {
    title: "Our Facilities | AMDCG",
    description: "Explore the state-of-the-art research facilities and equipment available at the AMDCG.",
    url: `https://research.iitbhilai.ac.in/amdcg/facilities`,
    images: [
      {
        url: '/og-image-facilities.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'AMDCG Research Facilities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Our Facilities | AMDCG",
    description: "Explore the state-of-the-art research facilities and equipment available at the AMDCG.",
    images: ['/og-image-facilities.jpg'],
  },
};


async function getFacilities() {
  await dbConnect();
  const facilities = await Facility.find({});
  return JSON.parse(JSON.stringify(facilities));
}

export default async function FacilitiesPage() {
  const facilities = await getFacilities();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AMDCG Research Facilities",
    "description": "A list of research equipment and facilities available at the AMDCG.",
    "itemListElement": facilities.map((facility: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Thing", // Using a generic 'Thing' as equipment doesn't have its own page
        "name": facility.name,
        "description": facility.description,
        "image": facility.image
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FacilitiesPageClient facilities={facilities} />
    </>
  );
}