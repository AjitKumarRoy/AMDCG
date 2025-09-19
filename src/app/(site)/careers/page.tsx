import type { Metadata } from 'next';
import { CareersPageClient } from '@/components/features/careersPage/CareersPageClient';
import { Recruitment } from '@/lib/models';
import dbConnect from '@/lib/dbConnect';
import { type Recruitment as IRecruitment } from '@/types';

type RecruitmentId = IRecruitment & { _id: string };

// --- SEO for the Careers Page ---
export const metadata: Metadata = {
  title: "Careers",
  description: "Join our team. Explore opportunities for internships, research positions, and PhD programs at the AMDCG.",
  keywords: ['Careers', 'Jobs', 'Internships', 'PhD Program', 'AMDCG', 'IIT Bhilai'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/careers`,
  },
  openGraph: {
    title: "Careers | AMDCG",
    description: "Join our team. Explore opportunities for internships, research positions, and PhD programs at the AMDCG.",
    url: `https://research.iitbhilai.ac.in/amdcg/careers`,
    images: [
      {
        url: '/og-image-careers.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'Careers at AMDCG',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Careers | AMDCG",
    description: "Join our team. Explore opportunities for internships, research positions, and PhD programs at the AMDCG.",
    images: ['/og-image-careers.jpg'],
  },
};

// This function fetches all recruitment postings on the server
async function getRecruitments() {
  await dbConnect();
  const recruitments = await Recruitment.find({}).sort({ date: -1 });
  return JSON.parse(JSON.stringify(recruitments));
}

export default async function CareersPage() {
  const recruitments = await getRecruitments();
  
   return (
    <>


      {/* --- ADDED STRUCTURED DATA FOR EACH JOB POSTING  ///  only for seo purpose --- */}
      {recruitments.map((job: RecruitmentId) => (
        <script
          key={job._id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": job.title,
            "description": `<p>${job.description}</p>`,
            "datePosted": job.date,
            "hiringOrganization": {
              "@type": "Organization",
              "name": "AMDCG - IIT Bhilai",
              "sameAs": "https://research.iitbhilai.ac.in/amdcg/"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "IIT Bhilai",
                "addressLocality": "Bhilai",
                "addressRegion": "Chhattisgarh",
                "postalCode": "491001",
                "addressCountry": "IN"
              }
            }
          }) }}
        />
      ))}



      <CareersPageClient recruitments={recruitments} />
    </>
  );
}