// FILE: src/components/sections/UnderConstructionSection.tsx
"use client"; // This component uses Framer Motion for animations

import React from "react";
import { motion, Variants } from "framer-motion";
import { FiTool, FiClock } from "react-icons/fi"; // Icons for visual flair

// Animation variants for the section
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 10, stiffness: 100, delay: 0.1 },
  },
};

// Animation variants for individual elements
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function UnderConstructionSection() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-20 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
        className="max-w-xl mx-auto text-center bg-white dark:bg-gray-900 p-8 md:p-12 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <FiTool className="text-6xl text-blue-500 dark:text-blue-400 mx-auto animate-bounce-slow" />
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 leading-tight"
        >
          Pardon Us!
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6"
        >
          This page is currently under construction. We&apos;re working hard to bring you exciting new content and features!
        </motion.p>
        <motion.div variants={itemVariants} className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-md">
          <FiClock className="mr-2 text-xl" />
          <span>Expected completion: Soon!</span>
        </motion.div>
      </motion.div>
    </section>
  );
}