import { Metadata } from 'next';
import { ResearchPageClient } from '@/components/reaearchPage/ResearchPageClient';
// import pageData from '@/data/researchProjects/projects.json'; // Import data for SEO

// --- SEO for the Call for Papers Page ---
export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "Call for Papers | SMART-25 AI Conference",
    description: "Submit your research to SMART-25. We invite papers on themes like Core AI/ML, Automation, Sustainable Infrastructure, and more. Join us in accelerating SDGs through AI.",
    keywords: ["Scopus indexed conference", "Scopus indexed journal", "call for papers", "submit paper", "AI conference submission", "SMART-25 themes"],
    alternates: {
      canonical: "https://smart25.org/call-for-papers", // Use your actual domain
    },
    openGraph: {
      title: "Call for Papers: SMART-25 AI Conference",
      description: "We invite researchers and innovators to submit their original work on AI for Sustainable Development Goals. Explore our thematic areas.",
      url: "https://smart25.org/call-for-papers",
      images: [
        {
          url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
          width: 1200,
          height: 630,
          alt: 'Call for Papers - SMART-25 Conference',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Call for Papers | SMART-25 AI Conference",
      description: "Submit your research on AI, Automation, Sustainable Infrastructure, and more to the SMART-25 international conference.",
      images: ['https://smart25.org/og-image.jpg'],
    },
  };
}

// This is now a simple Server Component
export default function CallForPapersPage() {
  return <ResearchPageClient />;
}