"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// --- NEW: Helper function to get a placeholder based on type ---
const getPlaceholderImage = (type: string) => {
  switch (type) {
    case 'Journal Article': return '/images/Notices/publications/placeholder_journal.png';
    case 'Conference Presentaton': return '/images/Notices/publications/placeholder_conference.png';
    case 'Book Chapter': return '/images/Notices/publications/placeholder_book.png';
    case 'Patent': return '/images/Notices/publications/placeholder_patent.png';
    default: return '/images/Notices/publications/placeholder_publications.png';
  }
};


// --- NEW: Helper function to generate the correct URL ---
const getPublicationUrl = (publication: any) => {
  if (!publication.slug) return '#';
  
  switch (publication.type) {
    case 'Journal Article': return `/publications/journal-article/${publication.slug}`;
    case 'Conference Presentaton': return `/publications/conference-presentation/${publication.slug}`;
    case 'Book Chapter': return `/publications/book-chapter/${publication.slug}`;
    case 'Patent': return `/publications/patent/${publication.slug}`;
    default: return '#';
  }
};



export function PublicationCard({ publication }: { publication: any }) {
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Journal Article': return 'bg-sky-800/50 text-sky-300 border-sky-500/30';
      case 'Conference Presentaton': return 'bg-green-800/50 text-green-300 border-green-500/30';
      case 'Book Chapter': return 'bg-purple-800/50 text-purple-300 border-purple-500/30';
      case 'Patent': return 'bg-amber-800/50 text-amber-300 border-amber-500/30';
      default: return 'bg-slate-700 text-slate-200';
    }
  };
  
   // --- UPDATED: Use the helper function for the fallback ---
  const imageUrl = publication.image || getPlaceholderImage(publication.type);
  const publicationUrl = getPublicationUrl(publication);

  return (
    <Link 
      href={publicationUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full w-full rounded-2xl border border-slate-800 bg-black/20 overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1 flex flex-col group"
    >
      {/* --- NEW IMAGE SECTION --- */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={publication.title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex-grow flex flex-col p-6">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadgeColor(publication.type)}`}>
              {publication.type}
            </span>
          </div>
          <h3 className="mt-2 text-md font-bold text-white font-heading line-clamp-3">{publication.title}</h3>
          <p className="mt-2 text-xs text-slate-400 line-clamp-2">
            {publication.authors.join(', ')}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-sm text-slate-400">
          <span>{publication.year}</span>
          <Button variant="secondary" className="text-xs py-1 px-2">
            Read More
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}