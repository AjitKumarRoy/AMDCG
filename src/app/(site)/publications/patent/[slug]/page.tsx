import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type Patent as IPatent } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Users, FileBadge, Calendar } from 'lucide-react';

type PatentPageProps = {
  params: { slug: string };
};

async function getPatentBySlug(slug: string): Promise<IPatent & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/publications/patents/slug/${slug}`;
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
export async function generateMetadata({ params }: PatentPageProps): Promise<Metadata> {
  const patent = await getPatentBySlug(params.slug);
  if (!patent) return { title: 'Publication Not Found' };

  const keywords = ['Patent', 'AMDCG', 'IIT Bhilai', ...patent.authors, ...(patent.title.split(' '))];

  return {
    title: patent.title,
    description: patent.abstract,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/publications/patent/${patent.slug}`,
    },
    openGraph: {
      title: patent.title,
      description: patent.abstract,
      url: `https://research.iitbhilai.ac.in/amdcg/publications/patent/${patent.slug}`,
      images: [
        {
          url: patent.image || '/og-image-publications.jpg',
          width: 1200,
          height: 630,
          alt: patent.title,
        },
      ],
    },
  };
}

const placeholderImage = '/images/Notices/publications/placeholder_patent.png';

export default async function PatentPage({ params }: PatentPageProps) {
  const patent = await getPatentBySlug(params.slug);

  if (!patent) {
    notFound();
  }


  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Patent",
    "headline": patent.title,
    "description": patent.abstract,
    "patentNumber": patent.patentNumber,
    "author": patent.authors?.map(author => ({
      "@type": "Person",
      "name": author
    })),
    "datePublished": patent.year.toString(),
  };


  
  const pageBanner = '/images/pagesBanner/banner6.png';
  const imageUrl = patent.image || placeholderImage;

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
                <Image src={imageUrl} alt={patent.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col">
              <p className="text-sm font-semibold text-amber-400">{patent.type}</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white font-heading">
                {patent.title}
              </h1>
              <div className="mt-4 text-slate-300 space-y-2">
                <p className="flex items-center gap-2"><Users className="h-4 w-4 text-slate-500" /> {patent.authors.join(', ')}</p>
                <p className="flex items-center gap-2"><FileBadge className="h-4 w-4 text-slate-500" /> {patent.patentNumber}</p>
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-500" /> Granted in {patent.year}</p>
              </div>
            </div>
          </div>

          <div>
            <Title as="h2">Abstract</Title>
            <div className="mt-4 text-slate-300 leading-relaxed space-y-4">
              <p>{patent.abstract}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}