"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Title } from '@/components/ui/Title'; 
import { Button } from '@/components/ui/Button';
import researchThemesData from "@/data/homePage/researchThemes.json";
import { Atom, Hexagon, Layers, ShieldCheck, ArrowRight, Network } from "lucide-react";

// Map icon names from JSON to actual React components
const iconMap = {
  Hexagon: Hexagon,
  Layers: Layers,
  Atom: Atom,
  ShieldCheck: ShieldCheck,
};

// Animation variants for the grid container (staggered effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Animation variants for each card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ResearchThemes() {
  return (
    <Section>
      <Title icon={Network} as="h4" className='mb-6'>
                {`Core Research Areas`}
       </Title>
      {/* className="rounded-2xl bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]" */}
      <motion.div 
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {researchThemesData.map((theme) => {
          const IconComponent = iconMap[theme.icon as keyof typeof iconMap];
          return (
            <motion.div key={theme.id} variants={cardVariants} className="group">
              
                <div className="relative h-full w-full rounded-2xl border border-white/10 p-6 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] transition-all duration-300 hover:scale-105 hover:border-amber-500/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 mb-6">
                    <IconComponent className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white font-heading">{theme.title}</h3>
                  <p className="text-slate-400 mb-6">{theme.description}</p>
                  
                  
                <div className="mt-6">
                  <Button href={theme.link} variant="secondary" className="inline-flex">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                </div>
             
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}