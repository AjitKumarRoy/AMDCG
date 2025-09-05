"use client";

import { useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { Users } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  link: string;
  image: string;
}

interface PublicationCardProps {
  publication: Publication;
}

export const PublicationCard = ({ publication }: PublicationCardProps) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const fullAuthorList = publication.authors.join(', ');

  useLayoutEffect(() => {
    if (textRef.current && containerRef.current) {
      const isOverflow = textRef.current.scrollWidth > containerRef.current.offsetWidth;
      setIsOverflowing(isOverflow);
    }
  }, [publication.authors]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] transition-all duration-300 hover:border-amber-500/50 flex flex-col group">
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-lg">
        <Image src={publication.image} alt={publication.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        
        {/* --- UPDATED AUTHOR LIST OVERLAY --- */}
        <div 
  ref={containerRef}
  // --- UPDATED: Stronger gradient for better contrast ---
  className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent"
  style={{
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  }}
>
  {/* --- UPDATED: Added drop shadow --- */}
  <Users className="h-4 w-4 flex-shrink-0 text-slate-200 drop-shadow-md" />
  <div className="overflow-hidden whitespace-nowrap">
    <p 
      ref={textRef}
      // --- UPDATED: Added drop shadow and brighter text ---
      className={`inline-block text-xs text-slate-200 drop-shadow-md ${isOverflowing ? 'animate-marquee' : ''}`}
    >
      {isOverflowing ? `${fullAuthorList} \u00A0\u00A0•\u00A0\u00A0 ${fullAuthorList}` : fullAuthorList}
    </p>
  </div>
</div>
      
      </div>
      
      <div className="flex-grow">
        <p className="mb-2 font-semibold text-amber-500 font-heading">Published: {publication.year}</p>
        <h3 className="mb-4 text-lg font-bold text-white line-clamp-3 font-heading">{publication.title}</h3>
      </div>
      <div className="mt-auto">
        <Button href={publication.link} variant="secondary" className="inline-flex w-full justify-center">
          View Publication
        </Button>
      </div>
    </div>
  );
};