"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';


type Slide = {
  src: string;
  alt: string;
};

interface ImageSliderProps {
  slides: Slide[];
  options?: EmblaOptionsType;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    // Use the new, specific class name
    <div className="relative embla-imageslider">
      <div className="overflow-hidden rounded-lg border border-slate-800 embla-imageslider--fade" ref={emblaRef}>
        <div className="flex embla-imageslider__container">
          {slides.map((slide, index) => (
            <div className="relative aspect-video embla-imageslider__slide" key={index}>
              <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-colors hover:bg-white/20" 
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-colors hover:bg-white/20" 
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};