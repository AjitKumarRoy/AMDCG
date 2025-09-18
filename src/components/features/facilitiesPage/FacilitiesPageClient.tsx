"use client";

import { useState} from 'react';
import { type Facility as IFacility } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { NoItemsCard } from '@/components/ui/NoItemsCard';
import { FacilityCard } from './FacilityCard';
import { FacilityDetailsModal } from './FacilityDetailsModal'; // 1. Import the new modal

type FacilityWithId = IFacility & { _id: string };

const pageBanner = '/images/pagesBanner/banner6.png';

export function FacilitiesPageClient({ facilities }: { facilities: FacilityWithId[] }) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityWithId | null>(null);

  const filteredFacilities = facilities; 

  return (
    <div>
      <PageHero 
        title="Our Research Facilities"
        backgroundImage={pageBanner}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredFacilities.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((facility) => (
              <FacilityCard 
                key={facility._id} 
                facility={facility}
                onViewDetails={() => setSelectedFacility(facility)}
              />
            ))}
          </div>
        ) : (
          <NoItemsCard title="No Facilities Found" message="Please check back later." />
        )}
      </div>

      {/* --- 2. USE THE NEW MODAL COMPONENT --- */}
      <FacilityDetailsModal 
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />
    </div>
  );
}