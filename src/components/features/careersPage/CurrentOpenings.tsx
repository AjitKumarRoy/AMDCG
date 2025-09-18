"use client";

import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Briefcase, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { type Recruitment as IRecruitment } from '@/types';

type RecruitmentWithId = IRecruitment & { _id: string };

interface CurrentOpeningsProps {
  recruitments: RecruitmentWithId[];
}

export function CurrentOpenings({ recruitments }: CurrentOpeningsProps) {
  // Return null if there are no recruitments to show
  if (!recruitments || recruitments.length === 0) {
    return null;
  }

  // Get only the 5 latest postings
  const latestOpenings = recruitments.slice(0, 5);

  return (
    <Section>
      <div className="container mx-auto">
        <Title as="h2" icon={Briefcase}>
          Current Openings
        </Title>
        <div className="mt-8 space-y-4">
          {latestOpenings.map(recruitment => (
            <Link 
              key={recruitment._id} 
              target="_blank"
              href={`/news-events/recruitment/${recruitment.slug}`} 
              className="group flex items-center justify-between gap-4 rounded-lg p-4 transition-colors  hover:bg-slate-800/50 border border-white/10   bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]"
            >
              <div>
                <p className="font-semibold text-white group-hover:text-amber-400">{recruitment.title}</p>
                <p className="text-xs text-slate-400 mt-1">Posted on: {format(new Date(recruitment.date), 'PPP')}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-amber-400" />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}