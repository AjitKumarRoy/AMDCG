"use client";

import { motion } from "framer-motion";
import missionData from "@/data/homePage/vison.json";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { Eye } from "lucide-react"; // A great icon for 'Mission'

// Map icon name from JSON to the imported component
const iconMap = {
  Eye: Eye,
};

export const VisionSection = () => {
  const IconComponent = iconMap[missionData.icon as keyof typeof iconMap];

  return (
    <Section className="border border-white/10 rounded-2xl bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Using the new reusable Title component */}
        <Title icon={IconComponent} as="h2">
          {missionData.heading}
        </Title>
        
        <motion.p
          className="text-lg md:text-xl text-slate-300 leading-relaxed mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {missionData.paragraph}
        </motion.p>
      </div>
    </Section>
  );
};