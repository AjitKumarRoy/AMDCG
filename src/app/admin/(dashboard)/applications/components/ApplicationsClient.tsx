"use client";

import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { InternshipApplicationList } from './InternshipApplicationList';
import { PositionApplicationList } from './PositionApplicationList';
import { PhdApplicationList } from './PhdApplicationList';
import { 
    InternshipApplication , 
    PositionApplication  , 
    PhdApplication  
} from '@/types';

interface ApplicationItem {
  internshipApps: (InternshipApplication & { _id: string })[];
  positionApps: (PositionApplication & { _id: string })[];
  phdApps: (PhdApplication & { _id: string })[];
}

const tabs = [
  { name: 'Internships', id: 'internships' },
  { name: 'Positions', id: 'positions' },
  { name: 'PhD', id: 'phd' },
];

export function ApplicationsClient({ allApplications }: { allApplications: ApplicationItem }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || tabs[0].id;
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);

  const handleTabChange = (index: number) => {
    router.push(`${pathname}?tab=${tabs[index].id}`);
  };

  return (
    <div className="mt-8">
      <Tab.Group selectedIndex={activeTabIndex} onChange={handleTabChange}>
        <Tab.List className="flex items-center gap-4 border-b border-slate-800">
          {tabs.map((tab) => (
            <Tab as={Fragment} key={tab.id}>
              {({ selected }) => (
                <button
                  className={`px-4 py-2 text-sm font-semibold ${selected ? 'border-b-2 border-amber-500 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab.name}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel><InternshipApplicationList applications={allApplications.internshipApps} /></Tab.Panel>
          <Tab.Panel><PositionApplicationList applications={allApplications.positionApps} /></Tab.Panel>
          <Tab.Panel><PhdApplicationList applications={allApplications.phdApps} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}