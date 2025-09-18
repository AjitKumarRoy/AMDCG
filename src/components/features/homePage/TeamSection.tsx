"use client";

import { useMemo } from 'react';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
// import teamData from '@/data/teamPage/coreMembers.json';
import { TeamCard } from '@/components/ui/TeamCard';
import { Users, ArrowRight } from 'lucide-react';
import { Carousel } from '@/components/ui/Carousel1';  
import { NoItemsCard } from '@/components/ui/NoItemsCard';
import { type TeamMember as ITeamMember } from '@/types';

type MemberWithId = ITeamMember & { _id: string };

export function TeamSection({ members }: { members: MemberWithId[] }) {
  const coreMembers = useMemo(() => members.filter(member => member.type === 'Core'), [members]);

  return (
    <Section>
      
      <div className="flex items-center justify-between">
        <Title icon={Users} as="h2" className="mb-0">
                Guidance & Mentorship
              </Title>

              <span className="hidden md:inline-flex">
                <Button href="/team" variant="secondary" >
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              </span>
            </div>
      
      {/* --- UPDATED CONDITIONAL LOGIC --- */}
      {coreMembers.length > 0 ? (
        <Carousel viewportClassName="embla">
        {coreMembers.map((member) => (
          <TeamCard key={member._id} member={member} />
        ))}
      </Carousel>
      ) : (
        // 2. Render NoItemsCard when the list is empty
        <NoItemsCard 
          icon={Users}
          title="Core Team To Be Announced"
          message="The details of our core team and mentors will be updated here soon."
        />
      )}

      <div className="mt-20 text-center md:hidden">
        <Button href="/team" variant="secondary" className="inline-flex">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}