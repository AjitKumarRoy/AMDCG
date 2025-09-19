import { type Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type Project as IProject } from '@/types';
import { Calendar, Users, CheckCircle, Clock, Tag, LinkIcon, Banknote } from 'lucide-react';
import { format } from 'date-fns';
import { PageHero } from '@/components/ui/PageHero';


type ProjectPageProps = {
  params: { slug: string };
};

// Helper function to fetch a single project by its slug
async function getProjectBySlug(slug: string): Promise<IProject & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/projects/slug/${slug}`;
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
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }

  // Combine project fields with general keywords
  const keywords = ['AMDCG', 'IIT Bhilai', 'Research Project', ...(project.fields || [])];

  return {
    title: project.title,
    description: project.description,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/research/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://research.iitbhilai.ac.in/amdcg/research/${project.slug}`,
      images: [
        {
          url: project.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

const pageBanner = '/images/pagesBanner/banner6.png';
const placeholderImage = '/images/projects/placeholder_project.png';

// This is the main page component
export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound(); // Redirect to a 404 page if the project isn't found
  }


  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle", // A great type for a research project
    "headline": project.title,
    "description": project.description,
    "image": project.image || placeholderImage,
    "author": project.teamMembers?.map(member => ({
      "@type": "Person",
      "name": member.name
    })),
    "datePublished": project.startDate,
    "publisher": {
      "@type": "Organization",
      "name": "AMDCG - IIT Bhilai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://research.iitbhilai.ac.in/amdcg/images/logos/amdcg-logo.png"
      }
    }
  };




  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Completed': return { icon: CheckCircle, color: 'text-sky-400' };
      case 'Ongoing': return { icon: Clock, color: 'text-green-400' };
      default: return { icon: Clock, color: 'text-amber-400' };
    }
  };
  const StatusIcon = getStatusInfo(project.status).icon;


   const imageUrl = project.image || placeholderImage;

  return (
    <div>

      {/* This script injects the structured data into the page's <head> // for seo purpose only*/}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <PageHero 
        title="Project Details"
        backgroundImage={pageBanner}
      />

      {/* Main Content Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

         {/* --- NEW PROJECT HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
          <div className="md:w-1/3 flex-shrink-0">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-800">
              <Image src={imageUrl} alt={project.title} fill className="object-cover" />
            </div>
          </div>
          <div className="md:w-2/3 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              {project.title}
            </h1>
            <div className={`flex items-center gap-2 mt-4 text-lg font-semibold ${getStatusInfo(project.status).color}`}>
              <StatusIcon className="h-5 w-5" />
              <span>{project.status}</span>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Description and Content */}
          <div className="lg:col-span-2 space-y-6 p-4 rounded-lg border border-white/10  bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
            <div>
              <h2 className="text-2xl font-bold text-white font-heading mb-3">About this Project</h2>
              <p className="text-slate-300 leading-relaxed ">{project.description}</p>
            </div>
            {/* You could add a 'content' field to your schema for a longer markdown description */}
          </div>

          {/* Right Column: Metadata Sidebar */}
          <aside className="space-y-6">
            <div className="p-4 rounded-lg border border-white/10  bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
              <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Project Details</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <strong>Start Date:</strong>
                  <span>{format(new Date(project.startDate), 'PPP')}</span>
                </li>
                {project.endDate && (
                  <li className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <strong>End Date:</strong>
                    <span>{format(new Date(project.endDate), 'PPP')}</span>
                  </li>
                )}

                {project.fundingAgency && (
                  <li className="flex items-center gap-3">
                    <Banknote className="h-4 w-4 text-slate-400" />
                    <strong>Funding Agency:</strong>
                    <span>{project.fundingAgency}</span>
                  </li>
                )}
                {project.fundValue && (
                  <li className="flex items-center gap-3">
                    <Banknote className="h-4 w-4 text-slate-400" />
                    <strong>Fund Value:</strong>
                    <span>₹{project.fundValue}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* --- NEW FIELDS & KEYWORDS SECTION --- */}
            {project.fields && project.fields.length > 0 && (
              <div className="p-4 rounded-lg border border-white/10  bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Fields & Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.fields.map(field => (
                    <span key={field} className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-300">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.teamMembers && project.teamMembers.length > 0 && (
              <div className="p-4 rounded-lg border border-white/10  bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Team Members</h3>
                <ul className="space-y-3 text-sm">
                  {project.teamMembers.map(member => (
                    <li key={member.name}>
                      <Link href={member.profileLink || '#'} className="flex items-center gap-3 text-sky-400 hover:text-amber-400 hover:underline">
                        <Users className="h-4 w-4" />
                        <span>{member.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.link && (
              <div className="p-4 rounded-lg border border-white/10  bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
                <h3 className="font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Reference Link
                </h3>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-sky-400 hover:text-sky-300 hover:underline break-all"
                >
                  {project.link}
                </a>
              </div>
            )}
          </aside>
        </div>

      </section>
    </div>
  );
}