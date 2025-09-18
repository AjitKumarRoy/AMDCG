import { Metadata } from 'next';

// Import Section Components
import { HeroSection } from '@/components/features/homePage/HeroSection';
import { LatestNewsTicker } from '@/components/features/homePage/LatestNewsTicker';
import { Notices } from '@/components/features/homePage/Notices';
import { AboutSection } from '@/components/features/homePage/AboutSection';
// import { MissionVison } from '@/components/features/homePage/MissionVison';
import { ResearchThemes } from '@/components/features/homePage/ResearchThemes';
import { LatestNews } from '@/components/features/homePage/LatestNews';
import { TeamSection } from "@/components/features/homePage/TeamSection";
import { LatestProjects } from '@/components/features/homePage/LatestProjects';
import { RecentPublications } from '@/components/features/homePage/RecentPublications';
import { Collaborators } from '@/components/features/homePage/Collaborators';
import { FaqAndCTA } from '@/components/features/homePage/FaqAndCTA';



// --- NEW, CORRECTED METADATA FOR AMDCG ---
export const metadata: Metadata = {
  title: {
    default: 'AMDCG: Advanced Materials Development and Characterization Group',
    template: '%s | AMDCG',
  },
  description: "AMDCG is an active research group at IIT Bhilai focused on the design and development of novel materials for strategic applications in the space, defense, and bio-medical sectors.",
  keywords: ['AMDCG', 'IIT Bhilai', 'Materials Science', 'Metallurgy', 'Additive Manufacturing', 'Mechanical Engineering', 'Novel Materials', 'High Entropy Alloys', 'Alloy Design'],
  authors: [{ name: 'AMDCG - IIT Bhilai', url: 'https://research.iitbhilai.ac.in/amdcg/' }], // Replace with your final domain
  
  openGraph: {
    title: 'AMDCG: Advanced Materials Development and Characterization Group',
    description: 'An active research group at IIT Bhilai focused on designing novel materials for strategic applications.',
    url: 'https://research.iitbhilai.ac.in/amdcg/', // Replace with your final domain
    siteName: 'AMDCG Research Group',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AMDCG Research Group Banner' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMDCG: Advanced Materials Development and Characterization Group',
    description: 'An active research group at IIT Bhilai focused on designing novel materials for strategic applications.',
    images: ['/og-image.jpg'],
  },
};



// A helper function to safely fetch data from our API
async function fetchData(endpoint: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Failed to fetch ${endpoint}: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

export default async function Homepage() {
  // Fetch all data in parallel for maximum performance
  const [
    projects, 
    team, 
    publications, 
    announcements, 
    recruitments, 
    upcomingEvents, 
    newsTickerItems, 
    newsArticles
  ] = await Promise.all([
    fetchData('projects'),
    fetchData('team'),
    fetchData('publications/journal-articles'), 
    // fetchData('publications/conference-papers'), 
    // fetchData('publications/book-chapters'), 
    // fetchData('publications/patents'), 
    fetchData('notices/announcements'),
    fetchData('notices/recruitments'),
    fetchData('notices/events'),
    fetchData('notices/news-ticker'),
    fetchData('notices/news'),
  ]);





  // --- NEW, CORRECTED STRUCTURED DATA FOR AMDCG ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AMDCG: Advanced Materials Development and Characterization Group",
    "url": "https://research.iitbhilai.ac.in/amdcg/", // Replace with your final domain
    "logo": "https://research.iitbhilai.ac.in/amdcg/images/logos/amdcg-logo.png",
    "description": "AMDCG is an active research group at IIT Bhilai focused on the design and development of novel materials for strategic applications in the space, defense, and bio-medical sectors.",
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Bhilai (IIT Bhilai)",
      "url": "https://research.iitbhilai.ac.in/amdcg/"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Research Lab-414, ED-2, Department of Mechanical Engineering, IIT Bhilai",
      "addressLocality": "Bhilai",
      "addressRegion": "Chhattisgarh",
      "postalCode": "491001",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/company/amdcg-iitbhilai/"
      // Add other social media links here
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
      <LatestNewsTicker newsTicker={newsTickerItems} />
      <Notices 
          announcements={announcements} 
          recruitments={recruitments} 
          events={upcomingEvents}  />
      <AboutSection />
      {/* <MissionVison /> */}
      <ResearchThemes />
      <LatestNews newsArticles={newsArticles} />
      <TeamSection members={team} />
      <LatestProjects projects={projects}/>
      <RecentPublications publications={publications} />
      <Collaborators /> 
      <FaqAndCTA />
    </div>
    </>
  );
}