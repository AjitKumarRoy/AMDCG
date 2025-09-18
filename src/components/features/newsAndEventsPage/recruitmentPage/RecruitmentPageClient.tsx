"use client";

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { type Recruitment as IRecruitment } from '@/types';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Calendar, Link as LinkIcon, Download, Send } from 'lucide-react';
import { format } from 'date-fns';
import { ApplicationModal } from '@/components/features/careersPage/ApplicationModal';
import { PositionApplicationForm } from '@/components/features/careersPage/PositionApplicationForm';

type RecruitmentWithId = IRecruitment & { _id: string };

const placeholderImage = '/images/Notices/recruitment/placeholder_recruitment.png';

export function RecruitmentPageClient({ recruitment }: { recruitment: RecruitmentWithId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = recruitment.image || placeholderImage;

  return (
    <div>
      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-800">
                <Image src={imageUrl} alt={recruitment.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col">
              <div className="flex items-center gap-4 text-slate-400 text-sm mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Posted on {format(new Date(recruitment.date), 'PPP')}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
                {recruitment.title}
              </h1>
            </div>
          </div>

          {recruitment.description && (
            <div className="max-w-4xl text-slate-300 leading-relaxed space-y-4 border-t border-slate-800 pt-8">
              <p>{recruitment.description}</p>
            </div>
          )}

          <div className="max-w-4xl mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
            <Button onClick={() => setIsModalOpen(true)} variant="primary" className="inline-flex">
              <Send className="h-4 w-4" />
              <span>Apply Now</span>
            </Button>
            {recruitment.externalLink && (
              <Button href={recruitment.externalLink} target="_blank" variant="secondary" className="inline-flex">
                <LinkIcon className="h-4 w-4" />
                <span>View Original Post</span>
              </Button>
            )}
            {recruitment.fileUrl && (
              <Button href={recruitment.fileUrl} target="_blank" variant="secondary" className="inline-flex">
                <Download className="h-4 w-4" />
                <span>Download Details (PDF)</span>
              </Button>
            )}
          </div>
        </div>
      </Section>
      
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Position Application"
      >
        <PositionApplicationForm onClose={() => setIsModalOpen(false)} />
      </ApplicationModal>
    </div>
  );
}