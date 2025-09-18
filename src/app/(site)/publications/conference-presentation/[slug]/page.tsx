import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type ConferencePaper as IConferencePaper } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import { Users, BookText, Calendar, Link as LinkIcon } from 'lucide-react';

type PaperPageProps = {
  params: { slug: string };
};

async function getPaperBySlug(slug: string): Promise<IConferencePaper & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/publications/conference-papers/slug/${slug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

// This function now generates more detailed SEO metadata
export async function generateMetadata({ params }: PaperPageProps): Promise<Metadata> {
  const paper = await getPaperBySlug(params.slug);
  if (!paper) return { title: 'Publication Not Found' };

  const keywords = ['Conference Paper', 'AMDCG', 'IIT Bhilai', ...paper.authors, ...(paper.title.split(' '))];

  return {
    title: paper.title,
    description: paper.abstract,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/publications/conference-presentation/${paper.slug}`,
    },
    openGraph: {
      title: paper.title,
      description: paper.abstract,
      url: `https://research.iitbhilai.ac.in/amdcg/publications/conference-presentation/${paper.slug}`,
      images: [
        {
          url: paper.image || '/og-image-publications.jpg',
          width: 1200,
          height: 630,
          alt: paper.title,
        },
      ],
    },
  };
}


const pageBanner = '/images/pagesBanner/banner6.png';
const placeholderImage = '/images/Notices/publications/placeholder_conference.png';

export default async function ConferencePaperPage({ params }: PaperPageProps) {
  const paper = await getPaperBySlug(params.slug);

  if (!paper) {
    notFound();
  }


  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": paper.title,
    "abstract": paper.abstract,
    "author": paper.authors?.map(author => ({
      "@type": "Person",
      "name": author
    })),
    "datePublished": paper.year.toString(),
    "publication": {
      "@type": "PublicationEvent",
      "name": paper.journalOrConference
    }
  };



  
  const imageUrl = paper.image || placeholderImage;

  return (
    <div>

        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      
      <PageHero 
        title="Publication Details"
        backgroundImage={pageBanner} 
      />

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-slate-800">
                <Image src={imageUrl} alt={paper.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col">
              <p className="text-sm font-semibold text-green-400">Conference Paper</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white font-heading">
                {paper.title}
              </h1>
              <div className="mt-4 text-slate-300 space-y-2">
                <p className="flex items-center gap-2"><Users className="h-4 w-4 text-slate-500" /> {paper.authors.join(', ')}</p>
                <p className="flex items-center gap-2"><BookText className="h-4 w-4 text-slate-500" /> {paper.journalOrConference}</p>
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-500" /> Presented in {paper.year}</p>
              </div>
              <div className="mt-auto pt-6">
                <Button href={paper.link} target="_blank" variant="primary" className="inline-flex">
                  <LinkIcon className="h-4 w-4" />
                  <span>View Paper</span>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Title as="h2">Abstract</Title>
            <div className="mt-4 text-slate-300 leading-relaxed space-y-4">
              <p>{paper.abstract}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}