"use client";

import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { JournalArticleList } from './JournalArticleList';
import { ConferencePaperList } from './ConferencePaperList';
import { BookChapterList } from './BookChapterList';
import { PatentList } from './PatentList';
import { 
    JournalArticle , 
    ConferencePaper  , 
    BookChapter  ,
    Patent
} from '@/types';

interface PublicationsItem {
  journalArticles: (JournalArticle & { _id: string })[];
  conferencePapers: (ConferencePaper & { _id: string })[];
  bookChapters: (BookChapter & { _id: string })[];
  patents: (Patent & { _id: string })[];
}

const tabs = [
  { name: 'Journal Articles', id: 'journal-articles' },
  { name: 'Conference Papers', id: 'conference-papers' },
  { name: 'Book Chapters', id: 'book-chapters' },
  { name: 'Patents', id: 'patents' },
];

export function PublicationsClient({ allPublications }: { allPublications: PublicationsItem }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || tabs[0].id;

  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);

  const handleTabChange = (index: number) => {
    const newTabId = tabs[index].id;
    router.push(`${pathname}?tab=${newTabId}`);
  };

  return (
    <div className="mt-8">
      <Tab.Group selectedIndex={activeTabIndex} onChange={handleTabChange}>
        <Tab.List className="flex items-center gap-4 border-b border-slate-800">
          {tabs.map((tab) => (
            <Tab as={Fragment} key={tab.id}>
              {({ selected }) => (
                <button
                  className={`px-4 py-2 text-sm font-semibold transition-colors focus:outline-none ${
                    selected ? 'border-b-2 border-amber-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.name}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel><JournalArticleList articles={allPublications.journalArticles} /></Tab.Panel>
          <Tab.Panel><ConferencePaperList papers={allPublications.conferencePapers} /></Tab.Panel>
          <Tab.Panel><BookChapterList chapters={allPublications.bookChapters} /></Tab.Panel>
          <Tab.Panel><PatentList patents={allPublications.patents} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}