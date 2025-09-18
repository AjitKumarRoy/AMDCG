import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type Event as IEvent } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, Link as LinkIcon, Download } from 'lucide-react';
import { format } from 'date-fns';

type EventPageProps = {
  params: { slug: string };
};

async function getEventBySlug(slug: string): Promise<IEvent & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/notices/events/slug/${slug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

// This function now generates more detailed SEO metadata
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: 'Event Not Found' };

  const description = event.description || `Event: ${event.title} on ${new Date(event.date).toLocaleDateString()}`;
  const keywords = ['Event', 'AMDCG', 'IIT Bhilai', ...(event.title.split(' '))];

  return {
    title: event.title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/events/${event.slug}`,
    },
    openGraph: {
      title: event.title,
      description: description,
      url: `https://research.iitbhilai.ac.in/amdcg/events/${event.slug}`,
      images: [
        {
          url: event.image || '/og-image-events.jpg',
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: description,
      images: [event.image || '/og-image-events.jpg'],
    },
  };
}

const pageBanner = '/images/pagesBanner/banner6.png';
const placeholderImage = '/images/Notices/event/placeholder_event.png';



export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": event.date,
    "description": event.description,
    "location": {
      "@type": "Place",
      "name": event.location
    },
    "organizer": {
      "@type": "Organization",
      "name": "AMDCG - IIT Bhilai"
    }
  };


  const imageUrl = event.image || placeholderImage;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero 
        title="Event Details"
        backgroundImage={pageBanner} 
      />

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- NEW TWO-COLUMN HEADER --- */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-800">
                <Image src={imageUrl} alt={event.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col">
              <p className="text-sm font-semibold text-amber-400">Event</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white font-heading">
                {event.title}
              </h1>
              <div className="mt-4 text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span>{format(new Date(event.date), 'PPP')}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {event.description && (
            <div className="max-w-4xl text-slate-300 leading-relaxed space-y-4 border-t border-slate-800 pt-8">
              <p>{event.description}</p>
            </div>
          )}

          <div className="max-w-4xl mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
            {event.externalLink && (
              <Button href={event.externalLink} target="_blank" variant="primary" className="inline-flex">
                <LinkIcon className="h-4 w-4" />
                <span>View More</span>
              </Button>
            )}
            {event.fileUrl && (
              <Button href={event.fileUrl} target="_blank" variant="secondary" className="inline-flex">
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