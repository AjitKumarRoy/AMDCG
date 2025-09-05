"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import collaboratorsData from '@/data/homePage/collaborators.json';
import { Handshake } from 'lucide-react';

export function Collaborators() {
  const [emblaRef] = useEmblaCarousel(
    { align: 'start', loop: true },
    [
      AutoScroll({
        speed: 0.7,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      })
    ]
  );

  return (
    <Section>
      <Title icon={Handshake} as="h2">Our Collaborators & Partners</Title>
      <div className="mt-12">
        <div className="embla-collaborators" ref={emblaRef}>
          <div className="embla-collaborators__container">
            {collaboratorsData.map((collaborator) => (
              <div className="embla-collaborators__slide" key={collaborator.id}>
                {/* --- THIS IS THE NEW CARD DESIGN --- */}
                <Link 
                  href={collaborator.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative block h-48 w-full overflow-hidden rounded-2xl shadow-lg border border-white/30 hover:border-amber-300/70"
                >
                  <Image
                    src={collaborator.logoUrl}
                    alt={`${collaborator.name} logo`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  
                  {/* Title positioned at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-bold text-white text-lg drop-shadow-md font-heading transition-colors duration-300 group-hover:text-amber-400">
                      {collaborator.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}