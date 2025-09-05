"use client";
import { motion } from 'framer-motion';

interface ScrollingNotificationProps {
  text: string;
}

export const ScrollingNotification = ({ text }: ScrollingNotificationProps) => {
  // Using a slightly more spaced-out separator for a cleaner look
  const duplicatedText = Array(3).fill(text).join('   •   ');

  return (
    // UPDATED: New background and text colors
    <div className="bg-gradient-to-r from-slate-900 to-cyan-950 text-cyan-300 py-3 overflow-hidden whitespace-nowrap">
      <motion.div
        // UPDATED: Refined font styling for a more premium feel
        className="text-base font-medium tracking-wider"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 20, // Increased duration for a slower, more elegant scroll
          repeat: Infinity,
        }}
      >
        {duplicatedText}
      </motion.div>
    </div>
  );
};