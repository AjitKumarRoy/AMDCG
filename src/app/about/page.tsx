import { Metadata } from 'next';
import { AboutPageClient } from '@/components/aboutPage/AboutPageClient'; // Import the new client component

// --- SEO for the About Page ---
export const metadata: Metadata = {
  title: "About SMART-25 | International AI Conference",
  description: "Learn about the mission, organizers, and thematic areas of the SMART-25 conference. A joint initiative by IIT Bhilai, Villa College, and St. Mother Theresa Engineering College.",
  alternates: {
    canonical: "https://smart25.org/about", // Use your actual domain
  },
  openGraph: {
    title: "About the SMART-25 AI Conference",
    description: "Discover the vision behind SMART-25, a conference dedicated to accelerating SDGs through Artificial Intelligence.",
    url: "https://smart25.org/about",
    images: [
      {
        url: 'https://smart25.org/og-image-about.jpg', // A dedicated OG image for this page
        width: 1200,
        height: 630,
        alt: 'About the SMART-25 Conference',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "About SMART-25 | International AI Conference",
    description: "Learn about the mission and organizers of the SMART-25 conference on AI for Sustainable Development Goals.",
    images: ['https://smart25.org/og-image-about.jpg'],
  },
};

// This is now a simple Server Component
export default function AboutPage() {
  return <AboutPageClient />;
}