"use client";

import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { motion } from "framer-motion";
import { Milestone } from "lucide-react";

const milestones = [
  { year: "2020", title: "Group Founded", description: "AMDCG was established at IIT Bhilai with a focus on novel materials." },
  { year: "2021", title: "First Major Grant", description: "Received significant funding for research in additive manufacturing." },
  { year: "2022", title: "Key Equipment Acquired", description: "Installed a state-of-the-art Scanning Electron Microscope (SEM)." },
  { year: "2024", title: "Industry Collaboration", description: "Partnered with a leading aerospace firm on a new alloy development project." },
  { year: "2025", title: "First PhD Graduate", description: "Celebrated our first doctoral student successfully defending their thesis." },
];

export function JourneyTimeline() {
  return (
    <Section>
      <div className="container mx-auto text-center">
        <Title as="h2">Our Journey</Title>
        <div className="relative mt-12">
          {/* The vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-800" />

          <div className="relative flex flex-col gap-12">
            {milestones.map((item, index) => (
              <motion.div 
                key={index}
                className="relative flex items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="h-8 w-8 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center">
                    <Milestone className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
                
                <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
                  <p className="text-xl font-bold text-amber-400">{item.year}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}