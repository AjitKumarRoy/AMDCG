"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { type Facility as IFacility } from '@/types';

type FacilityWithId = IFacility & { _id: string };

interface FacilityCardProps {
  facility: FacilityWithId;
  onViewDetails: () => void; // Callback to open the modal
}

const placeholderImage = '/images/placeholder-facility.jpg';

export function FacilityCard({ facility, onViewDetails }: FacilityCardProps) {
  const imageUrl = facility.image || placeholderImage;

  return (
    <div className="h-full w-full rounded-2xl border border-slate-800 bg-black/20 overflow-hidden shadow-2xl backdrop-blur-md flex flex-col group">
      <div className="relative w-full aspect-video overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={facility.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-grow flex flex-col p-6">
        <div className="flex-grow">
          <p className="text-sm font-semibold text-sky-400">{facility.category}</p>
          <h3 className="mt-2 text-md font-bold text-white font-heading line-clamp-2">{facility.name}</h3>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800">
          <Button variant="secondary" onClick={onViewDetails} className="w-full">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}