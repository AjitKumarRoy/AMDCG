import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type BookChapter as IBookChapter } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import { Users, BookText, Calendar, Link as LinkIcon } from 'lucide-react';

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

async function getChapterBySlug(slug: string): Promise<IBookChapter & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/publications/book-chapters/slug/${slug}`;
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
export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) return { title: 'Publication Not Found' };

  const keywords = ['Book Chapter', 'AMDCG', 'IIT Bhilai', ...chapter.authors, ...(chapter.title.split(' '))];

  return {
    title: chapter.title,
    description: chapter.abstract,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/publications/book-chapter/${chapter.slug}`,
    },
    openGraph: {
      title: chapter.title,
      description: chapter.abstract,
      url: `https://research.iitbhilai.ac.in/amdcg/publications/book-chapter/${chapter.slug}`,
      images: [
        {
          url: chapter.image || '/og-image-publications.jpg',
          width: 1200,
          height: 630,
          alt: chapter.title,
        },
      ],
    },
  };
}

const pageBanner = '/images/pagesBanner/banner6.png';
const placeholderImage = '/images/Notices/publications/placeholder_book.png';

export default async function BookChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }


  // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BookChapter",
    "headline": chapter.title,
    "abstract": chapter.abstract,
    "author": chapter.authors?.map(author => ({
      "@type": "Person",
      "name": author
    })),
    "datePublished": chapter.year.toString(),
    "isPartOf": {
      "@type": "Book",
      "name": chapter.journalOrConference
    }
  };


  
  const imageUrl = chapter.image || placeholderImage;

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
                <Image src={imageUrl} alt={chapter.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col">
              <p className="text-sm font-semibold text-purple-400">Book Chapter</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white font-heading">
                {chapter.title}
              </h1>
              <div className="mt-4 text-slate-300 space-y-2">
                <p className="flex items-center gap-2"><Users className="h-4 w-4 text-slate-500" /> {chapter.authors.join(', ')}</p>
                <p className="flex items-center gap-2"><BookText className="h-4 w-4 text-slate-500" /> In: {chapter.journalOrConference}</p>
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-500" /> Published in {chapter.year}</p>
              </div>
              <div className="mt-auto pt-6">
                <Button href={chapter.link} target="_blank" variant="primary" className="inline-flex">
                  <LinkIcon className="h-4 w-4" />
                  <span>View Chapter</span>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Title as="h2">Abstract</Title>
            <div className="mt-4 text-slate-300 leading-relaxed space-y-4">
              <p>{chapter.abstract}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}