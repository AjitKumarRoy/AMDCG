"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <Section>
      <div className="container mx-auto text-center p-6 rounded-lg border border-white/10 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">

        {/* <div className="p-6 rounded-lg border border-white/10 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]"></div> */}
        <h2 className="text-3xl font-bold text-white font-display">
          Ready to Collaborate or Join Us?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-slate-400">
          We are always open to new partnerships and welcoming passionate individuals to our team. Let's connect and explore the possibilities.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/careers" variant="primary">
            <span>View Careers</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/contact" variant="secondary" >
            Contact Us
          </Button>
        </div>
      </div>
    </Section>
  );
}