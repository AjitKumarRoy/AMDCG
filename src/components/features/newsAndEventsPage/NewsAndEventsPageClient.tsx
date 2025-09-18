"use client";

import { useState, useMemo, useEffect } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { FilterBar } from './FilterBar';
import { NoticeCard } from './NoticeCard';
import { NoItemsCard } from '@/components/ui/NoItemsCard';
import { Button } from '@/components/ui/Button';


const INITIAL_LOAD = 9;
const LOAD_MORE_COUNT = 3;



// ---  Import all the necessary date functions ---
import { 
  isAfter, isBefore, subMonths, subYears, 
  isWithinInterval, startOfWeek, endOfWeek, subWeeks, 
  startOfMonth, endOfMonth, startOfYear, endOfYear,
  format
} from 'date-fns';

export function NewsAndEventsPageClient({ items }: { items: any[] }) {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('All Time');
   const [displayCount, setDisplayCount] = useState(INITIAL_LOAD);

  const filteredItems = useMemo(() => {
  // 1. Split the search query into individual words
  const searchWords = searchQuery.toLowerCase().split(' ').filter(word => word);
  
  return items.filter(item => {
    const matchesType = selectedType === 'All' || item.type === selectedType;

    let matchesDate = true;
    const itemDate = new Date(item.date);
    const now = new Date();

    switch (selectedDateRange) {
      case 'Upcoming':
          matchesDate = isAfter(itemDate, now);
          break;
      case 'This Week':
        matchesDate = isWithinInterval(itemDate, { start: startOfWeek(now), end: endOfWeek(now) });
        break;
      case 'Last Week':
        matchesDate = isWithinInterval(itemDate, { start: startOfWeek(subWeeks(now, 1)), end: endOfWeek(subWeeks(now, 1)) });
        break;
      case 'Last Month':
        matchesDate = isWithinInterval(itemDate, { start: startOfMonth(subMonths(now, 1)), end: endOfMonth(subMonths(now, 1)) });
        break;
      case 'Last 6 Months':
        matchesDate = isAfter(itemDate, subMonths(now, 6)) && isBefore(itemDate, now);
        break;
      case 'Last Year':
        matchesDate = isWithinInterval(itemDate, { start: startOfYear(subYears(now, 1)), end: endOfYear(subYears(now, 1)) });
        break;
      default:
        matchesDate = true;
        break;
    }

    let matchesSearch = true;
    if (searchWords.length > 0) {
      // 2. Create a single block of text to search within for each item
      const itemContent = `
        ${item.title} 
        ${item.type} 
        ${format(new Date(item.date), 'MMMM yyyy')}
      `.toLowerCase();

      // 3. Check if EVERY search word is included in the item's content
      matchesSearch = searchWords.every(word => itemContent.includes(word));
    }
    
    return matchesType && matchesSearch && matchesDate;
  });
}, [items, selectedType, searchQuery, selectedDateRange]);


 // --- 3. Slice the filtered items for display ---
  const itemsToDisplay = useMemo(() => {
    return filteredItems.slice(0, displayCount);
  }, [filteredItems, displayCount]);

  // --- 4. Handle Load More click ---
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + LOAD_MORE_COUNT);
  };

  // --- 5. Reset display count when filters change ---
  // This useEffect ensures that if filters change, we reset to the initial load count
  // so the user starts fresh with the new filtered results.
  useEffect(() => {
    setDisplayCount(INITIAL_LOAD);
  }, [selectedType, searchQuery, selectedDateRange]);


  const pageBanner = '/images/pagesBanner/banner6.png';

  return (
    <div>
      <PageHero 
        title="News & Events"
        backgroundImage={pageBanner} // Add a nice background
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
        />


        {itemsToDisplay.length > 0 ? (
          <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {itemsToDisplay.map((item) => (
                <NoticeCard key={item._id} item={item} />
              ))}
            </div>
            {/* --- 6. Load More Button --- */}
            {filteredItems.length > itemsToDisplay.length && (
              <div className="mt-12 text-center">
                <Button variant="primary" onClick={handleLoadMore}>
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <NoItemsCard 
            title="No Items Found"
            message="No items matched your current filters. Try adjusting your search."
          />
        )}


        

      </div>
    </div>
  );
}