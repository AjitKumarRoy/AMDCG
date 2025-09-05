"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Users } from 'lucide-react';
import { TeamMember } from '@/types';

const getInitials = (name: string): string => {
  const cleanedName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, '');
  return cleanedName.split(' ').map(part => part[0]).slice(0, 3).join('').toUpperCase();
};

// Animation variants for the grid container (staggered effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Animation variants for each card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const CoreTeam = ({ members }: { members: TeamMember[] }) => {
  return (
    // Now wrapped in the reusable Section component
    <Section>
      <Title icon={Users} as="h2">Core Members & Mentors</Title>
      
      <motion.div 
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {members.map(member => (
          // Each card is now a motion.div
          <motion.div 
            key={member.id} 
            variants={cardVariants}
            className="h-full w-full rounded-2xl border border-white/10  bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] p-6 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 flex-shrink-0">
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill className="rounded-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800">
                    <span className="text-2xl font-bold text-cyan-400">{getInitials(member.name)}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-xl font-heading">{member.name}</h3>
                <p className="text-cyan-400 text-base">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.affiliation}</p>
              </div>
            </div>
            <p className="mt-4 text-slate-300 text-sm">{member.bio}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};