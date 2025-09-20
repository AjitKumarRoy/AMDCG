"use client";

import { Tab } from '@headlessui/react';
import { Fragment, useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { NewsArticleList } from './NewsArticleList';
import { AnnouncementsList } from './AnnouncementsList';
import { RecruitmentsList } from './RecruitmentsList';
import { EventsList } from './EventsList';
import { NewsTickerList } from './NewsTickerList';
import { Loader } from 'lucide-react'; // 2. Import a loader icon
import { 
  type NewsArticle,
  type Announcement,
  type Recruitment,
  type Event,
  type NewsTicker
} from '@/types';


interface AllNewsData {
  newsArticles: (NewsArticle & { _id: string })[];
  announcements: (Announcement & { _id: string })[];
  recruitments: (Recruitment & { _id: string })[];
  events: (Event & { _id: string })[];
  newsTicker: (NewsTicker & { _id: string })[];
}

const tabs = [
  { name: 'News Articles', id: 'news-articles' },
  { name: 'Announcements', id: 'announcements' },
  { name: 'Recruitments', id: 'recruitments' },
  { name: 'Events', id: 'events' },
  { name: 'News Ticker', id: 'news-ticker' },
];



export function NewsNoticesClient({ allNewsData }: { allNewsData: AllNewsData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || tabs[0].id;
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);



  // 3. Initialize the useTransition hook
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (index: number) => {
    const newTabId = tabs[index].id;
    // 4. Wrap the navigation in startTransition
    startTransition(() => {
      router.push(`${pathname}?tab=${newTabId}`);
    });
  };

  return (
    <div className="mt-8">
      <Tab.Group selectedIndex={activeTabIndex} onChange={handleTabChange}>
        <Tab.List className="flex flex-wrap items-center gap-4 border-b border-slate-800">
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
        {/* 5. Add the conditional loading overlay */}
          {isPending && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
              <Loader className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          )}
        <Tab.Panels className="mt-6">
          <Tab.Panel><NewsArticleList articles={allNewsData.newsArticles} /></Tab.Panel>
          <Tab.Panel><AnnouncementsList announcements={allNewsData.announcements} /></Tab.Panel>
          <Tab.Panel><RecruitmentsList recruitments={allNewsData.recruitments} /></Tab.Panel>
          <Tab.Panel><EventsList events={allNewsData.events} /></Tab.Panel>
          <Tab.Panel><NewsTickerList items={allNewsData.newsTicker} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}