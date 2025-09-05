"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface ScrollableCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export const ScrollableCard = ({ imageSrc, title, description }: ScrollableCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-150 w-80 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      {/* 1. Image Area (30% of height) */}
      <div className="relative h-[50%] w-full flex-none">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 2. Text Content Area (70% of height) */}
      <div className="flex h-[50%] flex-grow flex-col p-6">
        <h3 className="mb-2 flex-none text-xl font-bold text-gray-800">{title}</h3>

        {/* Scrollable Description Container */}
        <div className="relative flex-grow overflow-hidden">
          <p
            className="h-full overflow-y-scroll pr-4 text-gray-600 
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {description}
          </p>

          {/* 3. The Hover Affordance (Gradient + Icon) */}
          <AnimatePresence>
            {!isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white to-transparent"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-400"
              >
                <FaChevronDown />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};