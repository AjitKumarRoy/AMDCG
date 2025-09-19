import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type NewsArticle as INewsArticle } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import { Calendar,  LinkIcon } from 'lucide-react';
import { format } from 'date-fns';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

async function getArticleBySlug(slug: string): Promise<INewsArticle & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/notices/news/slug/${slug}`;
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
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug)

  if (!article) return { title: 'News Not Found' };

  const keywords = ['AMDCG', 'IIT Bhilai', 'News', ...(article.title.split(' '))];

  return {
    title: article.title,
    description: article.excerpt,
    keywords: keywords,
    alternates: {
      canonical: `https://research.iitbhilai.ac.in/amdcg/news/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://research.iitbhilai.ac.in/amdcg/news/${article.slug}`,
      images: [
        {
          url: article.image || '/og-image-news.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image || '/og-image-news.jpg'],
    },
  };
}

const placeholderImage = '/images/Notices/news/placeholder_news.png';

export default async function NewsArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound();
  }
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [article.image],
    "datePublished": article.date,
    "description": article.excerpt,
    "author": {
      "@type": "Organization",
      "name": "AMDCG - IIT Bhilai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AMDCG - IIT Bhilai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://research.iitbhilai.ac.in/amdcg/images/logos/amdcg-logo.png"
      }
    }
  };
  
  const imageUrl = article.image || placeholderImage;
  const pageBanner = '/images/pagesBanner/banner6.png';

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero 
        title="News Article"
        backgroundImage={pageBanner} 
      />

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-800">
                <Image src={imageUrl} alt={article.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col">
              <p className="text-sm font-semibold text-sky-400">Media Coverage</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white font-heading">
                {article.title}
              </h1>
              <div className="mt-4 text-slate-300 space-y-2">
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-500" /> Published on {format(new Date(article.date), 'PPP')}</p>
              </div>
              {article.link && (
                <div className="mt-auto pt-6">
                  <Button href={article.link} target="_blank" variant="secondary" className="inline-flex">
                    <LinkIcon className="h-4 w-4" />
                    <span>Read Original Article</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div>
            <Title as="h2">Full Story</Title>
            <div className="mt-4 text-slate-300 leading-relaxed space-y-4 max-w-4xl">
              <p>{article.content || article.excerpt}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}