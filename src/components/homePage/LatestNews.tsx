"use client";

import { useMemo } from 'react';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';  
import { Button } from '@/components/ui/Button';  
import newsData from '@/data/Notices/news.json';
import { ArrowRight, Newspaper, Inbox } from 'lucide-react';
import { Carousel } from '@/components/ui/Carousel1';
import { NewsCard } from '@/components/ui/NewsCard';
import { NoItemsCard } from '@/components/ui/NoItemsCard';

export function LatestNews() {
  const latestNews = useMemo(() => 
    newsData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20),
    []
  );

  return (
    <Section>
      <div className="flex items-center justify-between">
        <Title icon={Newspaper} as="h2" className="mb-0">
          Latest News & Updates
        </Title>
        <span className="hidden md:inline-flex">
          <Button href="/news-events" variant="secondary" >
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        </span>
      </div>

      {latestNews.length > 0 ? (
        <Carousel>
          {latestNews.map((newsItem) => (
            <NewsCard key={newsItem.id} newsItem={newsItem} />
          ))}
        </Carousel>
      ) : (
        // --- REPLACED THE OLD DIV WITH THE NEW COMPONENT ---
        <NoItemsCard 
          icon={Inbox} 
          title="No News Updates" 
          message="Please check back later for the latest updates." 
        />
      )}

      <div className="mt-20 text-center md:hidden">
        <Button href="/news-events" variant="secondary" className="inline-flex">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}