"use client";

import { useMemo } from 'react';
import { type TeamMember as ITeamMember } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Users, GraduationCap, Briefcase, History, Award  } from 'lucide-react';
import { TeamMemberCard } from './TeamMemberCard';
import { Section } from '@/components/ui/Section';  
import { Title } from '@/components/ui/Title';    


type MemberWithId = ITeamMember & { _id: string };

//  type: { type: String, enum: ['Core', 'PostDoc', 'Phd', 'M.Tech', 'B.Tech', 'Project Assistant', 'Project Associate', 'Intern' ], required: true },

const pageBanner = '/images/pagesBanner/banner6.png';

export function TeamPageClient({ members }: { members: MemberWithId[] }) {

   // 1. First, separate all members into current and alumni
  const currentMembers = useMemo(() => members.filter(m => m.workingStatus !== 'alumni'), [members]);
  const alumniMembers = useMemo(() => members.filter(m => m.workingStatus === 'alumni'), [members]);

   // --- NEW: Find the Principal Investigator ---
  const principalInvestigator = useMemo(() => 
    currentMembers.find(m => m.name === 'Dr. Jose Immanuel R'), 
    [currentMembers]
  );

  // 2. Then, create subgroups from the current members

// --- UPDATED: Exclude the PI from the Core Team list ---
  const coreMembers = useMemo(() => 
    currentMembers.filter(m => m.type === 'Core' && m.name !== 'Dr. Jose Immanuel R'), 
    [currentMembers]
  );

  const postDoc = useMemo(() => currentMembers.filter(m => m.type === 'PostDoc'), [currentMembers]);
  const phdMembers = useMemo(() => currentMembers.filter(m => m.type === 'Phd'), [currentMembers]);
  const mtechMembers = useMemo(() => currentMembers.filter(m => m.type === 'M.Tech'), [currentMembers]);
  const bTechMembers = useMemo(() => currentMembers.filter(m => m.type === 'B.Tech'), [currentMembers]);
  const internMembers = useMemo(() => currentMembers.filter(m => m.type === 'Intern'), [currentMembers]);

  // 3. Combine Project Assistant and Project Associate into a single Research Staff group
  const researchStaff = useMemo(() => 
    currentMembers.filter(m => m.type === 'Project Assistant' || m.type === 'Project Associate'), 
    [currentMembers]
  );
  

  return (
    <div>
      <PageHero 
        title="Our Team & Mentors"
        backgroundImage={pageBanner}  
      />

      {/* --- NEW: DEDICATED PRINCIPAL INVESTIGATOR SECTION --- */}
      {principalInvestigator && (
        <Section>
          <Title as="h2" icon={Award}>Principal Investigator</Title>
          <div className="mt-8 grid sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
            <TeamMemberCard member={principalInvestigator} />
          </div>
        </Section>
      )}


      {/* --- SECTIONS FOR CURRENT MEMBERS --- */}
      {coreMembers.length > 0 && (
        <Section>
          <Title as="h2" icon={Users}>Collaborators</Title>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {coreMembers.map(member => <TeamMemberCard key={member._id} member={member} />)}
          </div>
        </Section>
      )}

      {postDoc.length > 0 && (
        <Section>
          <Title as="h2" icon={GraduationCap}>Postdoctoral Researchers</Title>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {postDoc.map(member => <TeamMemberCard key={member._id} member={member} />)}
          </div>
        </Section>
      )}

      {phdMembers.length > 0 && (
        <Section>
          <Title as="h2" icon={GraduationCap}>Ph.D. Scholars</Title>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {phdMembers.map(member => <TeamMemberCard key={member._id} member={member} />)}
          </div>
        </Section>
      )}

      {researchStaff.length > 0 && (
        <Section>
          <Title as="h2" icon={Briefcase}>Research Staff</Title>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {researchStaff.map(member => <TeamMemberCard key={member._id} member={member} />)}
          </div>
        </Section>
      )}

       {mtechMembers.length > 0 && (
        <Section>
          <Title as="h2" icon={GraduationCap}>M.Tech Scholars</Title>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mtechMembers.map(member => <TeamMemberCard key={member._id} member={member} />)}
          </div>
        </Section>
      )}

       {bTechMembers.length > 0 && (
        <Section>
          <Title as="h2" icon={GraduationCap}>B.Tech Scholars</Title>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bTechMembers.map(member => <TeamMemberCard key={member._id} member={member} />)}
          </div>
        </Section>
      )}

      {internMembers.length > 0 && (
        <Section>
          <Title as="h2" icon={GraduationCap}>Interns</Title>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {internMembers.map(member => <TeamMemberCard key={member._id} member={member} />)}
          </div>
        </Section>
      )}

      {/* --- NEW DEDICATED ALUMNI SECTION AT THE BOTTOM --- */}
      {alumniMembers.length > 0 && (
        <Section>
          <Title as="h2" icon={History}>Our Alumni</Title>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {alumniMembers.map(member => <TeamMemberCard key={member._id} member={member} />)}
          </div>
        </Section>
      )}


    </div>
  );
}