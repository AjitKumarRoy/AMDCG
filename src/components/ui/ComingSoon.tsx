"use client";

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Title } from './Title';
import { Button } from './Button';
import { Cog, FileCog, Home } from 'lucide-react';

export const ComingSoon = () => {
  return (
    <Section className='flex flex-col items-center justify-center min-h-[calc(100vh-180px)]'>
      <div className="flex flex-col items-center text-center">
        <Title icon={FileCog} as="h2">
          Page Under Development
        </Title>
        
        {/* Animated visual element */}
        <div className="relative my-12 h-48 w-48">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Cog className="h-full w-full text-slate-700/50" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center p-12"
          >
            {/* --- UPDATED COLOR --- */}
            <Cog className="h-full w-full text-amber-500/20" />
          </motion.div>
        </div>

        {/* --- UPDATED MESSAGE --- */}
        <p className="max-w-xl text-lg text-slate-300">
          Our team is currently forging this section of the AMDCG website. Please check back soon for new content on our materials science research and innovations.
        </p>

        <div className="mt-8">
          <Button href="/" variant="primary" className="inline-flex">
            <Home className="h-4 w-4" />
            <span>Go Back Home</span>
          </Button>
        </div>
      </div>
    </Section>
  );
};