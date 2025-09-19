import type { Metadata } from 'next';
import { GalleryPageClient } from '@/components/features/galleryPage/GalleryPageClient';
import { GalleryImage } from '@/lib/models';
import dbConnect from '@/lib/dbConnect';
import { type GalleryImage as IGalleryImage } from '@/types';

type GalleryImageId = IGalleryImage & { _id: string };

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual showcase of the AMDCG's research, equipment, events, and team members.",
  keywords: ['AMDCG Gallery', 'IIT Bhilai Labs', 'Research Photos', 'Materials Science Images'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/gallery`,
  },
  openGraph: {
    title: "Gallery | AMDCG",
    description: "A visual showcase of the AMDCG's research, equipment, events, and team members.",
    url: `https://research.iitbhilai.ac.in/amdcg/gallery`,
    images: [
      {
        url: '/og-image-gallery.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'AMDCG Research Group Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gallery | AMDCG",
    description: "A visual showcase of the AMDCG's research, equipment, events, and team members.",
    images: ['/og-image-gallery.jpg'],
  },
};

async function getGalleryData() {
  await dbConnect();
  const images = await GalleryImage.find({}).sort({ date: -1 });
  
  
  return {
    images: JSON.parse(JSON.stringify(images)),
  };
}

export default async function GalleryPage() {
  const { images } = await getGalleryData();


  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "AMDCG Research Group Gallery",
    "description": "A collection of images showcasing the research, equipment, events, and people of the AMDCG at IIT Bhilai.",
    "associatedMedia": images.map((img: GalleryImageId) => ({
      "@type": "ImageObject",
      "contentUrl": img.image,
      "name": img.title,
      "datePublished": img.date
    }))
  };
  

  
   return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GalleryPageClient images={images} />
    </>
  );
}