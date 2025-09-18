"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { type EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface ImageCarouselProps {
  images: string[];
  options?: EmblaOptionsType;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel();
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback((index: number) => {
    if (!mainApi || !thumbApi) return;
    mainApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);
  }, [mainApi, onSelect]);

  const scrollPrev = useCallback(() => mainApi && mainApi.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi && mainApi.scrollNext(), [mainApi]);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg" ref={mainRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div className="relative flex-shrink-0 w-full aspect-video" key={index}>
              <Image src={src} alt={`Facility image ${index + 1}`} fill className="object-contain" />
            </div>
          ))}
        </div>
        <Button variant="secondary"  className="absolute left-2 top-1/2 -translate-y-1/2" onClick={scrollPrev}>
          <ChevronLeft />
        </Button>
        <Button variant="secondary"  className="absolute right-2 top-1/2 -translate-y-1/2" onClick={scrollNext}>
          <ChevronRight />
        </Button>
      </div>
      
      <div className="overflow-hidden" ref={thumbRef}>
        <div className="flex gap-2">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all ${
                index === selectedIndex ? 'ring-2 ring-amber-500' : 'opacity-50 hover:opacity-100'
              }`}
            >
              <Image src={src} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};