"use client";
import { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Users } from 'lucide-react';
import { OpportunityCard } from './OpportunityCard';
import { InternshipApplicationForm } from './InternshipApplicationForm';
import { PositionApplicationForm } from './PositionApplicationForm';
import { PhdApplicationForm } from './PhdApplicationForm';
import { ApplicationModal } from './ApplicationModal';
import { CurrentOpenings } from './CurrentOpenings';
import { type Recruitment as IRecruitment } from '@/types';




type RecruitmentWithId = IRecruitment & { _id: string };
type ActiveModal = 'internship' | 'position' | 'phd' | null;


const pageBanner = '/images/pagesBanner/banner6.png';

export function CareersPageClient({ recruitments }: { recruitments: RecruitmentWithId[] }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  return (
    <div>
      <PageHero 
        title="Careers" 
        backgroundImage={pageBanner}
      />
      
      <Section>
        <div className="container mx-auto text-center">
          <Title 
            as="h2" 
            icon={Users}
          >
            Join Our Team
          </Title>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400">We are always looking for passionate and dedicated individuals to contribute to our pioneering research in materials science.</p>
          

          {/* --- 2. USE THE NEW REUSABLE CARD --- */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <OpportunityCard 
              title="Internships"
              description="We welcome motivated students from diverse engineering and science disciplines to contribute to cutting-edge research."
              buttonText="Apply for Internship"
              buttonVariant="primary"
              onApplyClick={() => setActiveModal('internship')}
            />
            <OpportunityCard 
              title="Positions"
              description="Opportunities for Project Assistant and Project Associate roles are periodically available. We encourage you to apply."
              buttonText="Apply for a Position"
              onApplyClick={() => setActiveModal('position')}
            />
            <OpportunityCard 
              title="PhD Program"
              description="Pursue your doctoral research under the direct mentorship of Dr. Jose Immanuel R. We are seeking highly driven candidates."
              buttonText="Apply for PhD"
              onApplyClick={() => setActiveModal('phd')}
            />
          </div>

        </div>
      </Section>

      
      <CurrentOpenings recruitments={recruitments} />

      {/* --- Reusable Modals (Unchanged) --- */}
      <ApplicationModal isOpen={activeModal === 'internship'} onClose={() => setActiveModal(null)} title="Internship Application">
        <InternshipApplicationForm onClose={() => setActiveModal(null)} />
      </ApplicationModal>

      <ApplicationModal isOpen={activeModal === 'position'} onClose={() => setActiveModal(null)} title="Position Application">
        <PositionApplicationForm onClose={() => setActiveModal(null)} />
      </ApplicationModal>

      <ApplicationModal isOpen={activeModal === 'phd'} onClose={() => setActiveModal(null)} title="PhD Application">
        <PhdApplicationForm onClose={() => setActiveModal(null)} />
      </ApplicationModal>
    </div>
  );
}