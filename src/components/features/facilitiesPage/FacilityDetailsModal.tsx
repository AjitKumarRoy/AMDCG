"use client";

import { Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { type Facility as IFacility } from '@/types';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { X } from 'lucide-react';

type FacilityWithId = IFacility & { _id: string };

interface FacilityDetailsModalProps {
  facility: FacilityWithId | null;
  onClose: () => void;
}

export function FacilityDetailsModal({ facility, onClose }: FacilityDetailsModalProps) {
  if (!facility) return null;

  return (
    <Transition appear show={!!facility} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-3xl transform rounded-2xl bg-slate-900 border border-slate-700 p-6 text-left align-middle shadow-xl">
                {/* --- NEW CLOSE BUTTON --- */}
                <button 
                  onClick={onClose} 
                  className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <Dialog.Title as="h3" className="text-xl font-bold text-white font-heading pr-8">
                  {facility.name}
                </Dialog.Title>
                <p className="text-sm text-slate-400 mt-1">{facility.model}</p>
                
                <div className="mt-4">
                  <ImageCarousel 
                    images={[facility.image, ...(facility.images || [])]} 
                  />
                </div>

                <div className="mt-4 text-slate-300 space-y-2">
                  <p>{facility.description}</p>
                </div>

                {facility.specifications && facility.specifications.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-white">Specifications:</h4>
                    <ul className="list-disc list-inside mt-2 text-slate-400 space-y-1">
                      {facility.specifications.map((spec, i) => <li key={i}>{spec}</li>)}
                    </ul>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}