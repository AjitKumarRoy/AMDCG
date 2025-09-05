import { Metadata } from 'next';
import { PublicationsPageClient } from '@/components/publicationsPage/publicationsClient';

// --- SEO for the Paper Submission Page ---
export const metadata: Metadata = {
  title: "Paper Submission | SMART-25 AI Conference",
  description: "Submit your paper to the SMART-25 conference. View guidelines, formatting requirements, and access the official submission portals for abstracts and full papers.",
  keywords: ["paper submission", "submit abstract", "conference submission", "SMART-25", "IEEE format", "double-blind review", "publication partners", "SCOPUS"],
  alternates: {
    canonical: "https://smart25.org/paper-submission", // Use your actual domain
  },
  openGraph: {
    title: "Submit Your Paper to the SMART-25 AI Conference",
    description: "Find all the guidelines and links needed to submit your original research for the SMART-25 international conference.",
    url: "https://smart25.org/paper-submission",
    images: [
      {
        url: 'https://smart25.org/og-image.jpg', // A dedicated OG image for this page
        width: 1200,
        height: 630,
        alt: 'Paper Submission for SMART-25 Conference',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Paper Submission | SMART-25 AI Conference",
    description: "Submit your research on AI for Sustainable Development Goals to SMART-25. View guidelines and access the submission portal.",
    images: ['https://smart25.org/og-image.jpg'],
  },
};

// This is now a simple Server Component
export default function PaperSubmissionPage() {
  return <PublicationsPageClient />;
}