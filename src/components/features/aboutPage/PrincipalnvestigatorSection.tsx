import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import Image from 'next/image';
import { type TeamMember } from "@/types";

export function PrincipalInvestigatorSection({ piData }: { piData: TeamMember }) {
  if (!piData) return null;
  return (
    <Section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="relative w-full max-w-[300px] mx-auto md:mx-0 aspect-square rounded-full overflow-hidden border-4 border-slate-800">
            <Image src={piData.image} alt={piData.name} fill className="object-cover" />
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <Title as="h2">Meet the Principal Investigator</Title>
            <h3 className="text-2xl font-bold text-white font-heading mt-2">{piData.name}</h3>
            <p className="mt-4 text-slate-300">{piData.bio?.substring(0, 300)}...</p>
            <div className="mt-6">
              <Button href={`/team/${piData.slug}`} target="_blank">View Full Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}