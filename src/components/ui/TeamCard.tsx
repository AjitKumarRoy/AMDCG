import Image from 'next/image';
import Link from 'next/link';
import { type TeamMember as ITeamMember } from '@/types';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

type MemberWithId = ITeamMember & { _id: string };

const getInitials = (name: string): string => {
  const cleanedName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, '');
  const nameParts = cleanedName.split(' ');
  return nameParts
    .map(part => part[0])
    .slice(0, 3)
    .join('')
    .toUpperCase();
};

interface TeamCardProps {
  member: MemberWithId;
}

export const TeamCard = ({ member }: TeamCardProps) => {
  const placeholderImage = '/images/placeholder-avatar.png';
  const imageUrl = member.image || placeholderImage;

  return (
    <Link 
      href={`/team/${member.slug}`}
      target="_blank"
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] p-6 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 flex flex-col"
    >
      <div className="relative mx-auto h-24 w-24 rounded-full">
        {member.image ? (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 font-heading">
            <span className="text-3xl font-bold text-amber-500">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-bold text-white font-heading">{member.name}</h3>
        <p className="mt-1 text-sm text-amber-500">{member.role}</p>
        <p className="mt-2 text-xs text-slate-400">{member.affiliation}</p>
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