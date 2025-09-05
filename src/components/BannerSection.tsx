"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

//import all the images
import amdcgLogo from '../../public/images/logos/amdcg-logo2.png'
import iitLogo from '../../public/images/logos/iitbh_logo.png'

// Animation variants for the banner elements
const bannerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.5,
      delayChildren: 0.3, 
      staggerDirection: -1 
    },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 150,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 120,
      delay: 0.2 
    },
  },
};


export function BannerSection() {
  return (
    <motion.div
      // UPDATED: Removed light mode colors, used consistent theme colors
      className="bg-slate-950 bg-[repeating-linear-gradient(45deg,rgba(100,116,139,0.1),rgba(100,116,139,0.1)_1px,transparent_1px,transparent_2rem),repeating-linear-gradient(-45deg,rgba(100,116,139,0.1),rgba(100,116,139,0.1)_1px,transparent_1px,transparent_2rem)] py-6 md:py-8 px-6 flex flex-col md:flex-row items-center justify-between shadow-md relative z-30 border-b border-slate-800"
      variants={bannerVariants}
      // initial="hidden"
      // animate="visible"
    >
      {/* Left Logo - ORBI */}
      <motion.div variants={logoVariants} className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
        <Link href="/">
          <Image
            src={amdcgLogo}
            alt="AMDCG Logo"
            width={200}
            height={200}
            className="h-24 w-24 object-contain rounded-full md:h-28 md:w-28 cursor-pointer"
            priority
          />
        </Link>
      </motion.div>

      {/* Center Text - Group Name */}
      <motion.div variants={titleVariants} className="flex-grow text-center max-w-2xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-sky-500 text-transparent bg-clip-text leading-tight mb-2 font-display">
          Advanced Materials Development & Characterization Group
        </h1>
        <p className="text-base md:text-lg text-slate-300 font-semibold tracking-wider font-heading">
          INDIAN INSTITUTE OF TECHNOLOGY BHILAI
        </p>
      </motion.div>

      {/* Right Logo - NERIST */}
      <motion.div variants={logoVariants} className="flex-shrink-0 mt-4 md:mt-0 md:ml-8">
         <Link href="https://www.iitbhilai.ac.in/" target="_blank" rel="noopener noreferrer">
          <Image
            src={iitLogo}
            alt="IIT Bhilai Logo"
            width={150}
            height={150}
            className="h-24 w-24 object-contain rounded-full md:h-28 md:w-28 cursor-pointer"
            priority
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}