"use client";

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import welcomeData from '@/data/homePage/welcome.json';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title'; 

const iconMap = {
  Zap: Zap,
};

export function WelcomeSection() {
  const IconComponent = iconMap[welcomeData.icon as keyof typeof iconMap];

  return (
    <Section className="border border-white/10 rounded-2xl bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
      <div className="max-w-3xl mx-auto">
        <Title icon={IconComponent} as="h2" className='text-left mb-6'>
          {welcomeData.heading}
        </Title>

        <motion.p
                  className="text-lg md:text-xl text-slate-300 leading-relaxed mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  {welcomeData.paragraph1}
                </motion.p>
        <motion.p
                  className="text-lg md:text-xl text-slate-300 leading-relaxed mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  {welcomeData.paragraph2}
                </motion.p>
        <motion.p
                  className="text-lg md:text-xl text-slate-300 leading-relaxed mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  {welcomeData.paragraph3}
                </motion.p>

        <div className="mt-8">
          <Button href={welcomeData.button.link} variant="primary" className="inline-flex">
            <span>{welcomeData.button.text}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}