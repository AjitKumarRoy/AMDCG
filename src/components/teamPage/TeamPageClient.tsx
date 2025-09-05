"use client";

import { PageHero } from '@/components/ui/PageHero';
import { CoreTeam } from '@/components/teamPage/CoreTeam';
// import { StudentMembers } from '@/components/teamPage/StudentMembers';
import { HeroData, TeamMember } from '@/types'

export function TeamPageClient({ hero, coreMembers }: { hero: HeroData, coreMembers: TeamMember[] }) {
  // The useMemo filtering is no longer needed here

  return (
    <div>
      <PageHero 
        title={hero.title} 
        subtitle={hero.subtitle} 
        backgroundImage={hero.backgroundImage}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CoreTeam members={coreMembers} />
        {/* <StudentMembers members={studentMembers} /> */}
      </div>
    </div>
  );
}



{/* className="bg-slate-950 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]" */}