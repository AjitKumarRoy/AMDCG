"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from "lucide-react";



const faqs = [
  { question: "How can I apply for an internship?", answer: "You can apply for an internship by filling out the form on our 'Careers' page. We welcome applications from motivated students in relevant fields." },
  { question: "What are the requirements for the PhD program?", answer: "PhD applicants typically require a Master's degree in a relevant engineering or science discipline and a strong academic record. Please see the 'Apply for PhD' form on our 'Careers' page for more details." },
  { question: "Are there any open positions for Project Assistants?", answer: "Current openings for Project Assistants and Associates are listed on our 'Careers' page. We encourage you to check there for the latest opportunities." },
  { question: "How can my organization collaborate with AMDCG?", answer: "We are always open to new collaborations with industry and academic institutions. Please send us a message using the contact form with details about your proposal." },
];




export function Faq() {
     const [openIndex, setOpenIndex] = useState<number | null>(0);


  return (
    <Section className="">
      <div className="container mx-auto flex flex-col items-center">
        <Title as="h2" icon={HelpCircle} className="text-center">
          Frequently Asked Questions
        </Title>
        <div className="mt-8 w-full max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border border-white/10 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full justify-between items-center p-4 text-left font-semibold text-white"
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-4 pb-4 text-slate-400 text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}