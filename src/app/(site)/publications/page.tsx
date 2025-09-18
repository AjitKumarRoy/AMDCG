import type { Metadata } from 'next';
import { PublicationsPageClient } from '@/components/features/publicationsPage/PublicationsPageClient';
import { JournalArticle, ConferencePaper, BookChapter, Patent } from '@/lib/models';
import dbConnect from '@/lib/dbConnect';

export const metadata: Metadata = {
  title: "Publications",
  description: "Browse the extensive list of publications from the AMDCG, including journal articles, conference papers, book chapters, and patents.",
  keywords: ['AMDCG Publications', 'IIT Bhilai Publications', 'Materials Science Research', 'Journal Articles', 'Patents'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/publications`,
  },
  openGraph: {
    title: "Publications | AMDCG",
    description: "Browse the extensive list of publications from the AMDCG research group.",
    url: `https://research.iitbhilai.ac.in/amdcg/publications`,
    images: [
      {
        url: '/og-image-publications.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'AMDCG Publications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Publications | AMDCG",
    description: "Browse the extensive list of publications from the AMDCG research group.",
    images: ['/og-image-publications.jpg'],
  },
};


async function getPublications() {
  await dbConnect();

  // Fetch all four types in parallel
  const [journalArticles, conferencePapers, bookChapters, patents] = await Promise.all([
    JournalArticle.find({}).sort({ year: -1 }),
    ConferencePaper.find({}).sort({ year: -1 }),
    BookChapter.find({}).sort({ year: -1 }),
    Patent.find({}).sort({ year: -1 })
  ]);

  // Add a 'type' property to each to distinguish them
  const allPublications = [
    ...journalArticles.map(p => ({ ...p.toObject(), type: 'Journal Article' })),
    ...conferencePapers.map(p => ({ ...p.toObject(), type: 'Conference Presentaton' })),
    ...bookChapters.map(p => ({ ...p.toObject(), type: 'Book Chapter' })),
    ...patents.map(p => ({ ...p.toObject(), type: 'Patent' }))
  ];

  // Sort the combined list by year, newest first
  allPublications.sort((a, b) => b.year - a.year);

  return JSON.parse(JSON.stringify(allPublications));
}

export default async function PublicationsPage() {
  const publications = await getPublications();

  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AMDCG Publications",
    "description": "A list of publications by the Advanced Materials Development and Characterization Group.",
    "itemListElement": publications.map((pub: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://research.iitbhilai.ac.in/amdcg/publications/${pub.slug}`, // Generic slug link
      "name": pub.title
    }))
  };

  
 return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PublicationsPageClient publications={publications} />
    </>
  );
}