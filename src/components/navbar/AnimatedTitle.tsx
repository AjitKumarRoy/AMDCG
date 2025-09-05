"use client";

import { TypeAnimation } from 'react-type-animation';

export const AnimatedTitle = () => {
  return (
    <TypeAnimation
      sequence={[
        'AMDCG',
        3000, // Pause for 3 seconds
        '', // Deletes 'SMART-25'
        500,
      ]}
      wrapper="span"
      speed={20}
      className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent font-display"
      repeat={Infinity}
    />
  );
};