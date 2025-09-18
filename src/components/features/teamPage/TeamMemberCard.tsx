"use client";

import Image from 'next/image';
import Link from 'next/link';
import { type TeamMember as ITeamMember } from '@/types';
import { Button } from '@/components/ui/Button'; //
import { Linkedin, GraduationCap, LinkIcon, Twitter, Github, FlaskConical, ArrowRight } from 'lucide-react';

type MemberWithId = ITeamMember & { _id: string; };

const getInitials = (name: string): string => {
  const cleanedName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, '');
  return cleanedName.split(' ').map(part => part[0]).join('').toUpperCase();
};

export function TeamMemberCard({ member }: { member: MemberWithId }) {
  const placeholderImage = '/images/placeholder-avatar.png';
  const imageUrl = member.image || placeholderImage;

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); // Prevents the main card link from firing
  };

  return (
    <Link 
      href={`/team/${member.slug}`}
      target="_blank"
      className="group relative h-full w-full rounded-2xl border border-slate-800  p-6 text-center transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1 flex flex-col bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]"
    >
      <div className="relative mx-auto h-32 w-32 rounded-full mb-4">
        {member.image ? (
          <Image src={imageUrl} alt={member.name} fill className="rounded-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800">
            <span className="text-4xl font-bold text-amber-500">{getInitials(member.name)}</span>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-white font-heading">{member.name}</h3>
        <p className="mt-1 text-sm text-amber-400">{member.role}</p>
        <p className="mt-2 text-xs text-slate-400">{member.affiliation}</p>
      </div>
      
      <div className="mt-4 flex justify-center gap-4">
        {member.socialLinks?.website && <Link href={member.socialLinks.website} target="_blank" onClick={handleSocialClick} className="text-slate-400 hover:text-sky-400"><LinkIcon /></Link>}
        {member.socialLinks?.linkedin && <Link href={member.socialLinks.linkedin} target="_blank" onClick={handleSocialClick} className="text-slate-400 hover:text-sky-400"><Linkedin /></Link>}
        {member.socialLinks?.googleScholar && <Link href={member.socialLinks.googleScholar} target="_blank" onClick={handleSocialClick} className="text-slate-400 hover:text-sky-400"><GraduationCap /></Link>}
        {member.socialLinks?.researchGate && <Link href={member.socialLinks.researchGate} target="_blank" onClick={handleSocialClick} className="text-slate-400 hover:text-sky-400"><FlaskConical /></Link>}
        {member.socialLinks?.twitter && <Link href={member.socialLinks.twitter} target="_blank" onClick={handleSocialClick} className="text-slate-400 hover:text-sky-400"><Twitter /></Link>}
        {member.socialLinks?.github && <Link href={member.socialLinks.github} target="_blank" onClick={handleSocialClick} className="text-slate-400 hover:text-sky-400"><Github /></Link>}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800">
        <Button variant="secondary" className="w-full">
          View Profile
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </Link>
  );
};