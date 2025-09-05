"use client";

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useLoading } from '@/context/LoadingContext';

const logo = "/images/logos/amdcg-logo2.png";

// Animation variants (these remain the same)
const loaderVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeOut" } },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeIn" } },
  exit: { opacity: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const contentVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { scale: 1.2, opacity: 0, transition: { duration: 0.7, ease: "easeIn" } },
};

const dotVariants: Variants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

export default function InitialLoader() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 dark:from-gray-900 dark:to-black text-white z-[9999]"
          variants={loaderVariants}
          initial="visible"
          animate="visible"
          exit="exit"
        >
          
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={200}
              className="rounded-full shadow-2xl border-2 border-white/20 sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]"
            />
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-lg md:text-xl font-jakarta font-medium">AMDCG</span>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    variants={dotVariants}
                    animate="animate"
                    // Removed custom prop as delay is now handled within the variant
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}