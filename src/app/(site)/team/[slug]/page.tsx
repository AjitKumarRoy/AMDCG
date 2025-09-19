import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type TeamMember as ITeamMember } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Linkedin, GraduationCap, LinkIcon, Twitter, Github, FlaskConical, Mail, Phone, Briefcase, UserCircle } from 'lucide-react';

type MemberPageProps = {
  params: { slug: string };
};

// Fetches a single team member by slug
async function getMemberBySlug(slug: string): Promise<ITeamMember & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/team/slug/${slug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

// This function now generates more detailed SEO metadata
export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const member = await getMemberBySlug(params.slug);
  if (!member) return { title: 'Member Not Found' };

  const description = member.bio || `Profile of ${member.name}, ${member.role} at AMDCG.`;
  const keywords = [member.name, member.role, 'AMDCG', 'IIT Bhilai', 'Materials Science', ...(member.affiliation.split(' '))];

  return {
    title: `${member.name} | AMDCG Team`,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/team/${member.slug}`,
    },
    openGraph: {
      title: `${member.name} | AMDCG Team`,
      description: description,
      url: `https://research.iitbhilai.ac.in/amdcg/team/${member.slug}`,
      images: [
        {
          url: member.image || '/og-image-team.jpg',
          width: 1200,
          height: 630,
          alt: member.name,
        },
      ],
    },
  };
}



const pageBanner = '/images/pagesBanner/banner6.png';
const placeholderImage = '/images/teamMembers/personPlaceholder.webp';

export default async function TeamMemberPage({ params }: MemberPageProps) {
  const member = await getMemberBySlug(params.slug);

  if (!member) {
    notFound();
  }




  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.role,
    "worksFor": {
      "@type": "Organization",
      "name": "AMDCG - IIT Bhilai"
    },
    "image": member.image || placeholderImage,
    "email": `mailto:${member.email}`,
    "url": `https://research.iitbhilai.ac.in/amdcg/team/${member.slug}`,
    "sameAs": Object.values(member.socialLinks || {}).filter(Boolean)
  };



  
  const imageUrl = member.image || placeholderImage;

  return (
    <div>

        {/* this script is injected into the head, this is only for seo purpose */}
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
         />



      <PageHero title="Member Details" backgroundImage={pageBanner} />

      {/* --- NEW PROFILE HEADER SECTION --- */}
      <Section className="pt-24 pb-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* Left Column: Details */}
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white font-display">{member.name}</h1>
              <p className="text-xl text-amber-400 font-semibold">{member.role}</p>
              <p className="text-md text-slate-300">{member.affiliation}</p>
              
               <div className="p-4 border rounded-2xl border-slate-700">
                    <p className="text-xl font-semibold text-slate-300 border-b border-slate-700 pb-1 mb-2">
                    Contact Details
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-slate-400 text-sm">
                    {member.email && <a href={`mailto:${member.email}`} className="flex items-center gap-2 hover:text-amber-400"><Mail className="h-4 w-4"/>{member.email}</a>}
                    {member.phone && <a href={`tel:${member.phone}`} className="flex items-center gap-2 hover:text-amber-400"><Phone className="h-4 w-4"/>{member.phone}</a>}
                    </div>
                    
                    <div className="flex items-center gap-4 pt-2">
                        {member.socialLinks?.website && <Link href={member.socialLinks.website} target="_blank" className="text-slate-400 hover:text-sky-400"><LinkIcon /></Link>}
                        {member.socialLinks?.linkedin && <Link href={member.socialLinks.linkedin} target="_blank" className="text-slate-400 hover:text-sky-400"><Linkedin /></Link>}
                        {member.socialLinks?.googleScholar && <Link href={member.socialLinks.googleScholar} target="_blank" className="text-slate-400 hover:text-sky-400"><GraduationCap /></Link>}
                        {member.socialLinks?.researchGate && <Link href={member.socialLinks.researchGate} target="_blank" className="text-slate-400 hover:text-sky-400"><FlaskConical /></Link>}
                        {member.socialLinks?.twitter && <Link href={member.socialLinks.twitter} target="_blank" className="text-slate-400 hover:text-sky-400"><Twitter /></Link>}
                        {member.socialLinks?.github && <Link href={member.socialLinks.github} target="_blank" className="text-slate-400 hover:text-sky-400"><Github /></Link>}
                    </div>
                </div>
                
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full max-w-[250px] md:max-w-xs mx-auto aspect-square rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
              <Image src={imageUrl} alt={member.name} fill className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* --- BIOGRAPHY SECTION --- */}
      {member.bio && (
        <Section >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Title as="h2" icon={UserCircle}>Biography</Title>
            <div className="mt-6 text-slate-300 leading-relaxed space-y-4 max-w-4xl">
              <p>{member.bio}</p>
            </div>
          </div>
        </Section>
      )}
      
      {/* --- CONTRIBUTIONS SECTION --- */}
      {member.contributions && member.contributions.length > 0 && (
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Title as="h2" icon={Briefcase}>Contributions & Projects</Title>
            <div className="mt-8 space-y-6">
              {member.contributions.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg border-white/10  bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
                  <h4 className="font-semibold text-white">{item.project}</h4>
                  <p className="text-amber-400 text-sm">{item.role} {item.years && `(${item.years})`}</p>
                  <p className="mt-2 text-slate-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}