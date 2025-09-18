"use client";

import { useState, useMemo, useEffect } from 'react';
import { type BlogPost as IBlogPost } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { BlogPostCard } from './BlogPostCard';
import { NoItemsCard } from '@/components/ui/NoItemsCard';
import { FilterBar } from './FilterBar';
import { Button } from '@/components/ui/Button';
import { isAfter, isBefore, subMonths, subYears, isWithinInterval, startOfWeek, endOfWeek, subWeeks, startOfMonth, endOfMonth, startOfYear, endOfYear, format } from 'date-fns';

type PostWithId = IBlogPost & { _id: string };


const INITIAL_LOAD = 9;
const LOAD_MORE_COUNT = 3;


const pageBanner = '/images/pagesBanner/banner6.png';

export function BlogPageClient({ posts }: { posts: PostWithId[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('All Time');
   const [displayCount, setDisplayCount] = useState(INITIAL_LOAD);

  const filteredPosts = useMemo(() => {
    const searchWords = searchQuery.toLowerCase().split(' ').filter(word => word);

    return posts.filter(post => {
      let matchesSearch = true;
      if (searchWords.length > 0) {
        const postContent = `
          ${post.title} ${post.author} ${post.tags?.join(' ')} 
          ${post.publishedAt ? format(new Date(post.publishedAt), 'MMMM yyyy') : ''}
        `.toLowerCase();
        matchesSearch = searchWords.every(word => postContent.includes(word));
      }
      
       let matchesDate = true;
    // --- ADDED A CHECK HERE ---
    // Only apply date filters if the post has a published date
    if (post.publishedAt) {
      const postDate = new Date(post.publishedAt);
      const now = new Date();

      switch (selectedDateRange) {
        case 'This Week': matchesDate = isWithinInterval(postDate, { start: startOfWeek(now), end: endOfWeek(now) }); break;
        case 'Last Week': matchesDate = isWithinInterval(postDate, { start: startOfWeek(subWeeks(now, 1)), end: endOfWeek(subWeeks(now, 1)) }); break;
        case 'Last Month': matchesDate = isWithinInterval(postDate, { start: startOfMonth(subMonths(now, 1)), end: endOfMonth(subMonths(now, 1)) }); break;
        case 'Last 6 Months': matchesDate = isAfter(postDate, subMonths(now, 6)) && isBefore(postDate, now); break;
        case 'Last Year': matchesDate = isWithinInterval(postDate, { start: startOfYear(subYears(now, 1)), end: endOfYear(subYears(now, 1)) }); break;
        default: matchesDate = true; break;
      }
    }
    
    return matchesSearch && matchesDate;
  });
}, [posts, searchQuery, selectedDateRange]);



// Reset display count when filters change
  useEffect(() => {
    setDisplayCount(INITIAL_LOAD);
  }, [searchQuery, selectedDateRange]);

  // Slice the array to only show the visible items
  const postsToDisplay = filteredPosts.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + LOAD_MORE_COUNT);
  };

  return (
    <div>
      <PageHero 
        title="Our Blog"
        backgroundImage={pageBanner}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
        />

        
        {postsToDisplay.length > 0 ? (
          <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsToDisplay.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>

            {/* --- "LOAD MORE" BUTTON --- */}
            {displayCount < filteredPosts.length && (
              <div className="mt-12 text-center">
                <Button variant="primary" onClick={handleLoadMore}>
                  Load More Posts
                </Button>
              </div>
            )}
          </>
        ) : (
          <NoItemsCard 
            title="No Posts Found"
            message="No blog posts matched your current filters. Please check back later."
          />
        )}
      </div>
    </div>
  );
}