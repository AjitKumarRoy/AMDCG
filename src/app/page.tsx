import { Metadata } from 'next';

// Import Section Components
import { HeroSection } from '@/components/homePage/HeroSection';
import { LatestNewsTicker } from '@/components/homePage/LatestNewsTicker';
import { Notices } from '@/components/homePage/Notices';
import { AboutSection } from '@/components/homePage/AboutSection';
// import { MissionVison } from '@/components/homePage/MissionVison';
import { ResearchThemes } from '@/components/homePage/ResearchThemes';
import { LatestNews } from '@/components/homePage/LatestNews';
import { TeamSection } from "@/components/homePage/TeamSection";
import { LatestProjects } from '@/components/homePage/LatestProjects';
import { RecentPublications } from '@/components/homePage/RecentPublications';
import { Collaborators } from '@/components/homePage/Collaborators';
import { FaqAndCTA } from '@/components/homePage/FaqAndCTA';



// --- NEW, CORRECTED METADATA FOR ORBI ---
export const metadata: Metadata = {
  title: {
    default: 'ORBI: Orbital Research & Beyond Innovations',
    template: '%s | ORBI',
  },
  description: "ORBI is a multidisciplinary research group at NERIST dedicated to pioneering sustainable innovations through cutting-edge research in Artificial Intelligence, Aerospace, and Robotics.",
  keywords: ['ORBI', 'Orbital Research', 'NERIST', 'Arunachal Pradesh', 'Aerospace Engineering', 'Artificial Intelligence', 'Robotics', 'Sustainable Technology', 'Space Technology', 'R&D'],
  authors: [{ name: 'ORBI - NERIST', url: 'https://orbi.nerist.ac.in' }],
  
  openGraph: {
    title: 'ORBI: Orbital Research & Beyond Innovations',
    description: 'A multidisciplinary research group pioneering sustainable innovations in AI, Aerospace, and Robotics.',
    url: 'https://orbi.nerist.ac.in',
    siteName: 'ORBI Research Group',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ORBI: Orbital Research & Beyond Innovations',
    description: 'A multidisciplinary research group pioneering sustainable innovations in AI, Aerospace, and Robotics.',
    images: ['/og-image.jpg'],
  },
};

export default function Homepage() {

  // --- NEW, CORRECTED STRUCTURED DATA FOR ORBI ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ORBI: Orbital Research & Beyond Innovations",
    "url": "https://orbi.nerist.ac.in",
    "logo": "https://orbi.nerist.ac.in/images/logos/orbi-black-background.PNG",
    "description": "ORBI is a multidisciplinary research group at NERIST dedicated to pioneering sustainable innovations through cutting-edge research in Artificial Intelligence, Aerospace, and Robotics.",
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "North Eastern Regional Institute of Science and Technology (NERIST)",
      "url": "https://www.nerist.ac.in/"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NH 52A",
      "addressLocality": "Nirjuli",
      "addressRegion": "Arunachal Pradesh",
      "postalCode": "791109",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://twitter.com/your-handle", // Replace with your social media links
      "https://linkedin.com/company/your-handle"
    ]
  };



  return (
    <>
     {/* This script injects the structured data into the page's <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    
    <div className="bg-slate-950 bg-[repeating-linear-gradient(45deg,rgba(100,116,139,0.1),rgba(100,116,139,0.1)_1px,transparent_1px,transparent_2rem),repeating-linear-gradient(-45deg,rgba(100,116,139,0.1),rgba(100,116,139,0.1)_1px,transparent_1px,transparent_2rem)]">
  
      <HeroSection />
      <LatestNewsTicker />
      <Notices />
      <AboutSection />
      {/* <MissionVison /> */}
      <ResearchThemes />
      <LatestNews />
      <TeamSection />
      <LatestProjects />
      <RecentPublications />
      <Collaborators /> 
      <FaqAndCTA />
    </div>
    </>
  );
}