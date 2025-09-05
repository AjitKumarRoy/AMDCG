"use client";

import { useState } from 'react'; // Import useState
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import faqData from '@/data/homePage/faq.json';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  // State to keep track of the currently open accordion item's ID
  // We'll open the first item by default.
  const [expanded, setExpanded] = useState<number | null>(faqData[0]?.id || null);

  const handleClick = (id: number) => {
    // If the clicked item is already open, close it. Otherwise, open the new one.
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Section className="border border-white/10 rounded-2xl bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
      <Title icon={HelpCircle} as="h2">
        Frequently Asked Questions
      </Title>
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqData.map((faqItem) => {
            const isOpen = faqItem.id === expanded;
            return (
              <div key={faqItem.id} className="rounded-lg border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden">
                <button 
                  className="flex w-full items-center justify-between p-4 text-left sm:p-6 transition-colors hover:bg-white/5"
                  onClick={() => handleClick(faqItem.id)}
                >
                  <span className="font-semibold text-white sm:text-lg font-heading">{faqItem.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-slate-300 sm:px-6 sm:pb-6">
                        {faqItem.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}