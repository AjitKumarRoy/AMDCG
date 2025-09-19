"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { 
  type NewsArticle, 
  type Announcement, 
  type Recruitment, 
  type Event 
} from '@/types';


type NoticeItem = (NewsArticle | Announcement | Recruitment | Event) & { _id: string, type: string };

const getNoticeUrl = (item: NoticeItem) => {
  if (!item.slug) return '#';
  switch (item.type) {
    case 'News Article': return `/news-events/news/${item.slug}`;
    case 'Announcement': return `/news-events/announcement/${item.slug}`;
    case 'Recruitment': return `/news-events/recruitment/${item.slug}`;
    case 'Event': return `/news-events/event/${item.slug}`;
    default: return '#';
  }
};

// Helper function to get a placeholder image based on type
const getPlaceholderImage = (type: string) => {
  switch (type) {
    case 'News Article': return '/images/Notices/news/placeholder_news.png';
    case 'Announcement': return '/images/Notices/announcement/placeholder_announcement.png';
    case 'Recruitment': return '/images/Notices/recruitment/placeholder_recruitment.png';
    case 'Event': return '/images/Notices/event/placeholder_event.png';
    default: return '/images/Notices/placeholder_news_events.png';
  }
};

export function NoticeCard({ item }: { item: NoticeItem }) {
  const imageUrl = item.image || getPlaceholderImage(item.type);


   // --- NEW: Helper function to get a badge color based on type ---
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'News Article': return 'bg-sky-800/50 text-sky-300 border-sky-500/30';
      case 'Announcement': return 'bg-purple-800/50 text-purple-300 border-purple-500/30';
      case 'Recruitment': return 'bg-green-800/50 text-green-300 border-green-500/30';
      case 'Event': return 'bg-amber-800/50 text-amber-300 border-amber-500/30';
      default: return 'bg-slate-700 text-slate-200';
    }
  };


  return (
    <Link 
      href={getNoticeUrl(item)}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full w-full rounded-2xl border border-slate-800 bg-black/20 overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1 flex flex-col group"
    >
      {/* --- Featured Image Section --- */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={item.title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex-grow flex flex-col p-6">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadgeColor(item.type)}`}>
              {item.type}
            </span>
          </div>
          <h3 className="mt-2 text-md font-bold text-white font-heading line-clamp-3">{item.title}</h3>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-sm text-slate-400">
          <span>{format(new Date(item.date), 'PPP')}</span>
          
          {/* --- Replaced div with Button component --- */}
          <Button variant="secondary" className="text-xs py-1 px-2 ">
            Read More
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}