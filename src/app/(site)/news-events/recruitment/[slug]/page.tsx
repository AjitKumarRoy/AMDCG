import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Recruitment as IRecruitment } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { RecruitmentPageClient } from '@/components/features/newsAndEventsPage/recruitmentPage/RecruitmentPageClient';

type RecruitmentPageProps = {
  params: { slug: string };
};

async function getRecruitmentBySlug(slug: string): Promise<IRecruitment & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/notices/recruitments/slug/${slug}`;
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
export async function generateMetadata({ params }: RecruitmentPageProps): Promise<Metadata> {
  const recruitment = await getRecruitmentBySlug(params.slug);
  if (!recruitment) return { title: 'Recruitment Not Found' };

  const description = recruitment.description || `Job Opportunity at AMDCG: ${recruitment.title}`;
  const keywords = ['Recruitment', 'Job Opening', 'AMDCG', 'IIT Bhilai', ...(recruitment.title.split(' '))];

  return {
    title: recruitment.title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/recruitments/${recruitment.slug}`,
    },
    openGraph: {
      title: recruitment.title,
      description: description,
      url: `https://research.iitbhilai.ac.in/amdcg/recruitments/${recruitment.slug}`,
      images: [
        {
          url: recruitment.image || '/og-image-recruitment.jpg',
          width: 1200,
          height: 630,
          alt: recruitment.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recruitment.title,
      description: description,
      images: [recruitment.image || '/og-image-recruitment.jpg'],
    },
  };
}

const pageBanner = '/images/pagesBanner/banner6.png';


export default async function RecruitmentPage({ params }: { params: { slug: string } }) {
  const recruitment = await getRecruitmentBySlug(params.slug);

  if (!recruitment) {
    notFound();
  }
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": recruitment.title,
    "description": `<p>${recruitment.description}</p>`,
    "datePosted": recruitment.date,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "AMDCG - IIT Bhilai",
      "sameAs": "https://research.iitbhilai.ac.in/amdcg/"
    },
  };


  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero 
        title="Recruitment Opportunity"
        backgroundImage={pageBanner} 
      />
      <RecruitmentPageClient recruitment={recruitment} />
    </div>
  );
}