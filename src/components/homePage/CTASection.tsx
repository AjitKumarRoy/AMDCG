"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import ctaData from '@/data/homePage/cta.json';
import { ArrowRight, Rocket } from 'lucide-react';

export function CTASection() {
  return (
    <Section className="border border-white/10 rounded-2xl bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
      <div className="relative z-10 flex flex-col items-center text-center p-4">
        {/* Using the reusable Title component */}
        <Title icon={Rocket} as="h2" className='mb-6'>  
          {ctaData.headline}
        </Title>
        
        <motion.p 
          className="mt-4 max-w-2xl text-lg text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {ctaData.subheadline}
        </motion.p>
        
        <motion.div 
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {ctaData.buttons.map((button) => (
            <Button 
              key={button.text} 
              href={button.link} 
              variant={button.variant as 'primary' | 'secondary'}
              className="inline-flex"
            >
              <span>{button.text}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}