"use client";

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Users } from 'lucide-react';
import { TeamMember } from '@/types';

// Animation variants for the list container
const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }, // A slightly faster stagger
    },
};

// Animation variants for each list item
const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

export const StudentMembers = ({ members }: { members: TeamMember[] }) => {
  return (
    // Wrapped in the reusable Section component
    <Section>
      <Title icon={Users} as="h2">Student Members</Title>
      
      <motion.ul 
        className="mt-12 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
        variants={listContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {members.map(member => (
          <motion.li 
            key={member.id}
            className="border-l-4  pl-4 py-1  rounded-r-lg border border-white/10  bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]"
            variants={listItemVariants}
          >
            <div className='w-full rounded-2xl '>
              <p className="font-bold text-white font-heading text-xl">{member.name}</p>
              <p className="text-cyan-400 text-base">{member.role}</p>
              <p className="text-slate-400 text-sm">{member.affiliation}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
};