"use client";
import { PageHero } from '@/components/ui/PageHero';
import { MissionSection } from './MissionSection';
import { PrincipalInvestigatorSection } from './PrincipalnvestigatorSection';
import { CoreValuesSection } from './CoreValuesSection';
import { JourneyTimeline } from './JourneyTimeline';  
import { CtaSection } from './CtaSection';         
import { type TeamMember as ITeamMember } from '@/types';


const pageBanner = '/images/pagesBanner/banner6.png';

export function AboutPageClient({ piData }: { piData: ITeamMember }) {
  return (
    <div>
      <PageHero 
        title="About AMDCG"
        backgroundImage={pageBanner}
      />
      <MissionSection />
      <PrincipalInvestigatorSection piData={piData} />
      <CoreValuesSection />
      <JourneyTimeline />
      <CtaSection />
    </div>
  );
}