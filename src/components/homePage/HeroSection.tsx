"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import heroData from '@/data/homePage/hero.json';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  // --- UPDATED: Removed the Fade plugin to enable swiping ---
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const selected = emblaApi.selectedScrollSnap();
      const slideCount = emblaApi.scrollSnapList().length;
      setSelectedIndex(selected);
      setPrevIndex((selected - 1 + slideCount) % slideCount);
      setNextIndex((selected + 1) % slideCount);
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative h-[70vh] lg:h-[90vh] w-full group/container overflow-x-hidden">
      <div className="embla-hero h-full" ref={emblaRef}>
        <div className="embla-hero__container h-full">
          {heroData.map((slide) => (
            <div className="embla-hero__slide" key={slide.id}>
              <Image src={slide.image} alt={slide.title} fill className="object-cover" priority={slide.id === 1} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />

      <div className="absolute top-1/2 -translate-y-1/2 left-0 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={selectedIndex}
              // --- UPDATED: Responsive font sizes ---
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroData[selectedIndex].title}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

        {/* --- UPDATED: Responsive and rounded arrow buttons --- */}
      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-white transition-all duration-300 opacity-0 group-hover/container:opacity-70 hover:!opacity-100 hover:bg-amber-500/20 hover:border-amber-500" aria-label="Previous slide">
        <ArrowLeft className="mx-auto h-6 w-6" />
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-white transition-all duration-300 opacity-0 group-hover/container:opacity-70 hover:!opacity-100 hover:bg-amber-500/20 hover:border-amber-500" aria-label="Next slide">
        <ArrowRight className="mx-auto h-6 w-6" />
      </button>

      {/* --- UPDATED: Responsive thumbnail navigation --- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4">
        <ThumbnailCircle onClick={() => scrollTo(prevIndex)} imageUrl={heroData[prevIndex].image} isActive={false} />
        <ThumbnailCircle onClick={() => {}} imageUrl={heroData[selectedIndex].image} isActive={true} />
        <ThumbnailCircle onClick={() => scrollTo(nextIndex)} imageUrl={heroData[nextIndex].image} isActive={false} />
      </div>
    </section>
  );
};

// --- UPDATED: Responsive thumbnail circle sub-component ---
const ThumbnailCircle = ({ onClick, imageUrl, isActive }: { onClick: () => void; imageUrl: string; isActive: boolean }) => (
  <button
    onClick={onClick}
    className={`relative rounded-full overflow-hidden shadow-2xl transition-all duration-300 ease-out
      ${isActive 
        ? 'w-16 h-16 sm:w-20 sm:h-20 border-2 sm:border-4 border-amber-500' 
        : 'w-12 h-12 sm:w-16 sm:h-16 border-2 border-white/50 hover:scale-110'}`}
  >
    <Image src={imageUrl} alt="Slide thumbnail" fill className="object-cover" />
  </button>
);