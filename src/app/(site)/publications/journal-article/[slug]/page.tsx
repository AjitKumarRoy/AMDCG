import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type JournalArticle as IJournalArticle } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import { Users, BookText, Calendar, Link as LinkIcon } from 'lucide-react';

type ArticlePageProps = {
  params: { slug: string };
};

async function getArticleBySlug(slug: string): Promise<IJournalArticle & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/publications/journal-articles/slug/${slug}`;
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
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Publication Not Found' };

  const keywords = ['Journal Article', 'AMDCG', 'IIT Bhilai', ...article.authors, ...(article.title.split(' '))];

  return {
    title: article.title,
    description: article.abstract,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/publications/journal-article/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.abstract,
      url: `https://research.iitbhilai.ac.in/amdcg/publications/journal-article/${article.slug}`,
      images: [
        {
          url: article.image || '/og-image-publications.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}


const pageBanner = '/images/pagesBanner/banner6.png';
const placeholderImage = '/images/Notices/publications/placeholder_journal.png';

export default async function JournalArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }


  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": article.title,
    "abstract": article.abstract,
    "author": article.authors?.map(author => ({
      "@type": "Person",
      "name": author
    })),
    "datePublished": article.year.toString(),
    "isPartOf": {
        "@type": "PublicationIssue",
        "name": article.journalOrConference
    }
  };
  
  
  const imageUrl = article.image || placeholderImage;

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
                <Image src={imageUrl} alt={article.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col">
              <p className="text-sm font-semibold text-amber-400">Journal Article</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white font-heading">
                {article.title}
              </h1>
              <div className="mt-4 text-slate-300 space-y-2">
                <p className="flex items-center gap-2"><Users className="h-4 w-4 text-slate-500" /> {article.authors.join(', ')}</p>
                <p className="flex items-center gap-2"><BookText className="h-4 w-4 text-slate-500" /> {article.journalOrConference}</p>
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-500" /> Published in {article.year}</p>
              </div>
              <div className="mt-auto pt-6">
                <Button href={article.link} target="_blank" variant="primary" className="inline-flex">
                  <LinkIcon className="h-4 w-4" />
                  <span>View Publication</span>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Title as="h2">Abstract</Title>
            <div className="mt-4 text-slate-300 leading-relaxed space-y-4">
              <p>{article.abstract}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}