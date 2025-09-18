"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

interface PageHeroProps {
  title: string;
  backgroundImage: string;
}

export const PageHero = ({ title, backgroundImage }: PageHeroProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    // --- 1. REDUCED HEIGHT ---
    <div className="relative w-full h-48 text-white overflow-hidden">
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* --- 2. REDESIGNED BREADCRUMB --- */}
      <nav className="absolute top-4 left-4 sm:left-6 z-20">
        <div className="flex items-center text-sm font-medium rounded-full border border-slate-700 bg-black/20 backdrop-blur-sm p-1">
          <Link href="/" className="flex items-center gap-1.5 px-3 py-1 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const name = capitalize(segment.replace(/-/g, ' '));
            
            return (
              <Fragment key={href}>
                <ChevronRight className="h-4 w-4 text-slate-600" />
                {isLast ? (
                  <span className="px-3 py-1 text-white bg-slate-700/50 rounded-full">{title}</span>
                ) : (
                  <Link href={href} className="px-3 py-1 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-full transition-colors">
                    {name}
                  </Link>
                )}
              </Fragment>
            );
          })}
        </div>
      </nav>
      
      <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-center">{title}</h1>
      </div>
    </div>
  );
};