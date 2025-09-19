import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type Announcement as IAnnouncement } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Calendar, Link as LinkIcon, Download } from 'lucide-react';
import { format } from 'date-fns';

type AnnouncementPageProps = {
  params: { slug: string };
};

async function getAnnouncementBySlug(slug: string): Promise<IAnnouncement & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/notices/announcements/slug/${slug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

// This function now generates more detailed SEO metadata
export async function generateMetadata({ params }: AnnouncementPageProps): Promise<Metadata> {
  const announcement = await getAnnouncementBySlug(params.slug);
  if (!announcement) return { title: 'Announcement Not Found' };

  const description = announcement.description || `Announcement from AMDCG: ${announcement.title}`;
  const keywords = ['Announcement', 'AMDCG', 'IIT Bhilai', ...(announcement.title.split(' '))];

  return {
    title: announcement.title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/announcements/${announcement.slug}`,
    },
    openGraph: {
      title: announcement.title,
      description: description,
      url: `https://research.iitbhilai.ac.in/amdcg/announcements/${announcement.slug}`,
      images: [
        {
          url: announcement.image || '/og-image-news.jpg',
          width: 1200,
          height: 630,
          alt: announcement.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: announcement.title,
      description: description,
      images: [announcement.image || '/og-image-news.jpg'],
    },
  };
}


const pageBanner = '/images/pagesBanner/banner6.png';
const placeholderImage = '/images/Notices/announcement/placeholder_announcement.png';

export default async function AnnouncementPage({ params }: AnnouncementPageProps) {
  const announcement = await getAnnouncementBySlug(params.slug);

  if (!announcement) {
    notFound();
  }
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": announcement.title,
    "datePublished": announcement.date,
    "description": announcement.description,
  };


  const imageUrl = announcement.image || placeholderImage;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero 
        title="Announcement"
        backgroundImage={pageBanner} 
      />

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- NEW TWO-COLUMN HEADER --- */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-800">
                <Image src={imageUrl} alt={announcement.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col">
              <div className="flex items-center gap-4 text-slate-400 text-sm mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(announcement.date), 'PPP')}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
                {announcement.title}
              </h1>
            </div>
          </div>

          {announcement.description && (
            <div className="max-w-4xl text-slate-300 leading-relaxed space-y-4 border-t border-slate-800 pt-8">
              <p>{announcement.description}</p>
            </div>
          )}

          <div className="max-w-4xl mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
            {announcement.externalLink && (
              <Button href={announcement.externalLink} target="_blank" variant="secondary" className="inline-flex">
                <LinkIcon className="h-4 w-4" />
                <span>Read More</span>
              </Button>
            )}
            {announcement.fileUrl && (
              <Button href={announcement.fileUrl} target="_blank" variant="primary" className="inline-flex">
                <Download className="h-4 w-4" />
                <span>Download Attachment</span>
              </Button>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}