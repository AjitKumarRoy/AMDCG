import type { Metadata } from 'next';
import { NewsAndEventsPageClient } from '@/components/features/newsAndEventsPage/NewsAndEventsPageClient';
import { NewsArticle, Announcement, Recruitment, Event } from '@/lib/models';
import dbConnect from '@/lib/dbConnect';
import { 
  type NewsArticle as INewsArticle, 
  type Announcement as IAnnouncement, 
  type Recruitment as IRecruitment, 
  type Event as IEvent 
} from '@/types';

type NoticeItem = (INewsArticle | IAnnouncement | IRecruitment | IEvent) & { _id: string };

export const metadata: Metadata = {
  title: "News & Events",
  description: "Stay up-to-date with the latest news, announcements, recruitment opportunities, and events from the AMDCG.",
  keywords: ['AMDCG News', 'AMDCG Events', 'IIT Bhilai Announcements', 'Materials Science Events', 'Research Recruitment'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/news-events`,
  },
  openGraph: {
    title: "News & Events | AMDCG",
    description: "Stay up-to-date with the latest updates from the AMDCG research group.",
    url: `https://research.iitbhilai.ac.in/amdcg/news-events`,
    images: [
      {
        url: '/og-image-news-events.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'AMDCG News & Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "News & Events | AMDCG",
    description: "Stay up-to-date with the latest updates from the AMDCG research group.",
    images: ['/og-image-news-events.jpg'],
  },
};

async function getAllNotices() {
  await dbConnect();

  const [newsArticles, announcements, recruitments, events] = await Promise.all([
    NewsArticle.find({}).sort({ date: -1 }),
    Announcement.find({}).sort({ date: -1 }),
    Recruitment.find({}).sort({ date: -1 }),
    Event.find({}).sort({ date: -1 })
  ]);

  const allItems = [
    ...newsArticles.map(item => ({ ...item.toObject(), type: 'News Article' })),
    ...announcements.map(item => ({ ...item.toObject(), type: 'Announcement' })),
    ...recruitments.map(item => ({ ...item.toObject(), type: 'Recruitment' })),
    ...events.map(item => ({ ...item.toObject(), type: 'Event' }))
  ];

  allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return JSON.parse(JSON.stringify(allItems));
}

export default async function NewsAndEventsPage() {
  const allItems = await getAllNotices();

  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AMDCG News & Events",
    "description": "A list of news, announcements, recruitments, and events from the AMDCG research group.",
    "itemListElement": allItems.map((item: NoticeItem, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://research.iitbhilai.ac.in/amdcg/news-events/${item.slug}`, // Generic link
      "name": item.title
    }))
  };
  
 return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NewsAndEventsPageClient items={allItems} />
    </>
  );
}