"use client";

import { useMemo } from 'react';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
// import publicationsData from '@/data/publications/journalArticle.json';
import { ArrowRight, FileText, Inbox } from 'lucide-react'; 
import { Carousel } from '@/components/ui/Carousel1';
import { PublicationCard } from '@/components/ui/PublicationCard';
import { NoItemsCard } from '@/components/ui/NoItemsCard';
import { type JournalArticle as IJournalArticle } from '@/types';

type PublicationWithId = IJournalArticle & { _id: string };

export function RecentPublications({ publications }: { publications: PublicationWithId[] }) {
  const recentPublications = useMemo(() => 
    publications
      .sort((a, b) => b.year - a.year) // Sort by year, newest first
      .slice(0, 20), // Take the latest 20
    [publications]
  );

  return (
    <Section>
      <div className="flex items-center justify-between">
        <Title icon={FileText} as="h2" className="mb-0 ">
          Recent Publications
        </Title>
        
        <span className="hidden md:inline-flex">
          <Button href="/publications" variant="secondary" >
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        </span>
      </div>

      {recentPublications.length > 0 ? (
        <Carousel>
          {recentPublications.map((publication) => (
            <PublicationCard key={publication._id} publication={publication} />
          ))}
        </Carousel>
      ) : (
        <NoItemsCard 
          icon={Inbox}
          title="No Publications Found"
          message="New publications will be featured here soon."
        />
      )}

      <div className="mt-20 text-center md:hidden">
        <Button href="/publications" variant="secondary" className="inline-flex">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}