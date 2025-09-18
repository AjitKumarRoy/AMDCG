import type { Metadata } from 'next';
import { ContactPageClient } from '@/components/features/contactPage/ContactPageClient';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the AMDCG research group at IIT Bhilai. We welcome inquiries about collaborations, research opportunities, and more.",
  keywords: ['Contact AMDCG', 'IIT Bhilai Contact', 'Materials Science Collaboration', 'Dr. Jose Immanuel R'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/contact`,
  },
  openGraph: {
    title: "Contact Us | AMDCG",
    description: "Get in touch with the AMDCG research group at IIT Bhilai.",
    url: `https://research.iitbhilai.ac.in/amdcg/contact`,
    images: [
      {
        url: '/og-image-contact.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'Contact the AMDCG Research Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Us | AMDCG",
    description: "Get in touch with the AMDCG research group at IIT Bhilai.",
    images: ['/og-image-contact.jpg'],
  },
};

export default function ContactPage() {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact AMDCG",
    "description": "Contact information for the Advanced Materials Development and Characterization Group at IIT Bhilai.",
    "url": "https://research.iitbhilai.ac.in/amdcg/contact",
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
      <ContactPageClient />
    </>
  );
}