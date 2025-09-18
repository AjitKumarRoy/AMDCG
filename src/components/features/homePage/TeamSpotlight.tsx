"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title'; 
import piData from '@/data/homePage/headSpotlight.json';
import { Linkedin, GraduationCap, Twitter, Award } from 'lucide-react';

const iconMap = {
  Linkedin: Linkedin,
  GraduationCap: GraduationCap,
  Twitter: Twitter,
  Award: Award
};

export function TeamSpotlight() {
  return (
    <Section className="border border-white/10 rounded-2xl bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]"> 
      <Title icon={Award} as="h2" className='mb-6'>
          Principal Investigator
      </Title>
      
      <motion.div 
        className="relative h-full w-full overflow-hidden rounded-2xl py-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* --- UPDATED IMAGE CONTAINER --- */}
        <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56">
          <Image
            src={piData.image}
            alt={piData.name}
            fill
            className="rounded-2xl object-cover ring-2  ring-amber-500/50"
          />
          {/* The old social links overlay has been removed from here */}
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-white font-heading">{piData.name}</h3>
          <p className="text-base text-amber-500">{piData.title}</p>
          <blockquote className="mt-4 border-l-4 border-slate-700 pl-4 text-left text-slate-300 italic">
            &#34;{piData.message}&#34;
          </blockquote>
        </div>

        {/* --- NEW SOCIAL ICONS SECTION --- */}
        <div className="mt-8 flex items-center justify-center gap-6">
          {piData.socials.map((social) => {
            const Icon = iconMap[social.icon as keyof typeof iconMap];
            return (
              <Link 
                key={social.name} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 transition-colors hover:text-sky-400 p-2 rounded-lg hover:bg-white/10"
              >
                <Icon className="h-6 w-6" />
              </Link>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}