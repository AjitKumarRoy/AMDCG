"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  viewportClassName?: string;
}

export const Carousel = ({ children, options, viewportClassName = 'embla' }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi, setScrollProgress]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className="relative group/container mt-12">
      <div className={viewportClassName}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {React.Children.map(children, (child, index) => (
              <div className="embla__slide" key={index}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg bg-white/10 border border-white/10 backdrop-blur-sm text-white transition-all duration-300 opacity-40 group-hover/container:opacity-80 hover:!opacity-100 hover:bg-amber-500/20 hover:border-amber-500" aria-label="Previous slide">
        <ArrowLeft className="mx-auto h-6 w-6" />
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg bg-white/10 border border-white/10 backdrop-blur-sm text-white transition-all duration-300 opacity-40 group-hover/container:opacity-80 hover:!opacity-100 hover:bg-amber-500/20 hover:border-amber-500" aria-label="Next slide">
        <ArrowRight className="mx-auto h-6 w-6" />
      </button>

      <div className="absolute bottom-[-3rem] left-1/2 -translate-x-1/2 w-full max-w-xs h-1 rounded-full bg-slate-800">
        <motion.div 
          className="h-1 rounded-full bg-amber-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};