"use client";

import { useState, useMemo, useEffect } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { FilterBar } from './FilterBar';
import { PublicationCard } from './PublicationCard';
import { NoItemsCard } from '@/components/ui/NoItemsCard';
import { Button } from '@/components/ui/Button';
import { 
  type JournalArticle,
  type ConferencePaper,
  type BookChapter,
  type Patent
} from '@/types';


type PublicationItem = (JournalArticle | ConferencePaper | BookChapter | Patent) & { _id: string, type: string };

const INITIAL_LOAD = 9;
const LOAD_MORE_COUNT = 3;

export function PublicationsPageClient({ publications }: { publications: PublicationItem[] }) {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
   const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);

     const filteredPublications = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    return publications.filter(p => {
      const matchesTypeFilter = selectedType === 'All' || p.type === selectedType;
      const matchesYearFilter = selectedYear === 'All' || p.year.toString() === selectedYear;

      // --- UPDATED SEARCH LOGIC ---
      const matchesSearch = lowerCaseQuery === '' || 
        p.title.toLowerCase().includes(lowerCaseQuery) ||
        p.authors.some((author: string) => author.toLowerCase().includes(lowerCaseQuery)) ||
        p.type.toLowerCase().includes(lowerCaseQuery);
      
      return matchesTypeFilter && matchesYearFilter && matchesSearch;
    });
  }, [publications, selectedType, selectedYear, searchQuery]);


  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_LOAD);
  }, [selectedType, selectedYear, searchQuery]);

  // Slice the array to only show the visible items
  const visiblePublications = filteredPublications.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + LOAD_MORE_COUNT);
  };



  const pageBanner = '/images/pagesBanner/banner6.png';

  return (
    <div>
      <PageHero 
        title="Our Publications"
        backgroundImage={pageBanner} 
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

         <FilterBar 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />


        {visiblePublications.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePublications.map((pub) => (
              <PublicationCard key={pub._id} publication={pub} />
            ))}
          </div>
        ) : (
          <NoItemsCard 
            title="No Publications Found"
            message="No publications matched your current filter."
          />
        )}



        {/* --- "LOAD MORE" BUTTON --- */}
        {visibleCount < filteredPublications.length && (
          <div className="mt-12 text-center">
            <Button variant="primary" onClick={handleLoadMore}>
              Load More Publications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}