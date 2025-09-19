import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type BlogPost as IBlogPost } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Calendar, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import DOMPurify from 'isomorphic-dompurify';
import { TeamMember } from '@/lib/models';

type PostPageProps = {
  params: { slug: string };
};

async function getPostBySlug(slug: string): Promise<IBlogPost & { _id: string } | null> {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/blog/slug/${slug}`;
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

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const pageBanner = '/images/pagesBanner/banner6.png';
const placeholderImage = '/images/blog/placeholder_blog.png';

export default async function BlogPostPage({ params }: PostPageProps ) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }


  const authorProfile = await TeamMember.findOne({ name: post.author });
  const sanitizedContent = DOMPurify.sanitize(post.content);




  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "datePublished": post.publishedAt,
    "description": post.excerpt,
    "author": { "@type": "Person", "name": post.author },
  };

  
  

  const imageUrl = post.image || placeholderImage;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero 
        title="From the Blog"
        backgroundImage={pageBanner} 
      />

      <Section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Post Header */}
            <div className="mb-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-white font-heading">
                {post.title}
            </h1>
            {/* This flex container aligns the author and date */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 text-sm text-slate-400 mt-4 border-b border-slate-800 pb-4">

                <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {/* --- 3. ADD CONDITIONAL LINK HERE --- */}
                {authorProfile ? (
                  <Link href={`/team/${authorProfile.slug}`} target="_blank" className="hover:text-amber-400 hover:underline">
                    <span>By {post.author}</span>
                  </Link>
                ) : (
                  <span>By {post.author}</span>
                )}
              </div>


                <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt ? format(new Date(post.publishedAt), 'PPP') : 'Not Published'}</span>
                </div>
            </div>
            </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-800 my-8">
            <Image src={imageUrl} alt={post.title} fill className="object-cover" />
          </div>

          {/* Excerpt */}
            <div className="my-8 p-6 rounded-lg border border-slate-800 bg-slate-900 text-center shadow-inner">
            <p className="text-lg italic text-slate-300">{post.excerpt}</p>
            </div>

            {/* Post Content */}
            <div 
            className="rich-text-content text-slate-300 p-6 rounded-lg border border-slate-800 bg-slate-900 shadow-inner"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-5 w-5 text-slate-400" />
                <h3 className="font-semibold text-white">Tags:</h3>
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-sky-80G/50 text-sky-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}