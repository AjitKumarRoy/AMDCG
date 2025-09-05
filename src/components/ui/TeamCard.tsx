import Image from 'next/image';


// Takes a name and returns the initials (e.g., "Dr. Santosh Kumar Tamang" -> "SKT")
const getInitials = (name: string): string => {
  const cleanedName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, '');
  const nameParts = cleanedName.split(' ');
  return nameParts
    .map(part => part[0])
    .slice(0, 3) // Use a max of 3 initials
    .join('')
    .toUpperCase();
};

interface TeamMember {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] p-6 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-amber-500/50">
      <div className="relative mx-auto h-34 w-34 rounded-full">
        {/* --- CONDITIONAL RENDERING LOGIC --- */}
        {member.image ? (
          // If an image exists, display it
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          // If no image, display the initials fallback
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 font-heading">
            <span className="text-3xl font-bold text-amber-500">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-white font-heading">{member.name}</h3>
        <p className="mt-1 text-sm text-amber-500">{member.role}</p>
        <p className="mt-2 text-xs text-slate-400">{member.affiliation}</p>
      </div>
    </div>
  );
};