import type { Metadata } from 'next';
import { BlogPageClient } from '@/components/features/blogPage/BlogPageClient';
import { BlogPost } from '@/lib/models';
import dbConnect from '@/lib/dbConnect';

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest news, articles, and insights from the AMDCG research group on materials science, additive manufacturing, and more.",
  keywords: ['AMDCG Blog', 'Materials Science', 'Research Blog', 'Additive Manufacturing', 'IIT Bhilai'],
  alternates: {
    canonical: `https://research.iitbhilai.ac.in/amdcg/blog`,
  },
  openGraph: {
    title: "Blog | AMDCG",
    description: "Read the latest news, articles, and insights from the AMDCG research group.",
    url: `https://research.iitbhilai.ac.in/amdcg/blog`,
    images: [
      {
        url: '/og-image-blog.jpg', // A dedicated preview image for this page
        width: 1200,
        height: 630,
        alt: 'AMDCG Research Group Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blog | AMDCG",
    description: "Read the latest news, articles, and insights from the AMDCG research group.",
    images: ['/og-image-blog.jpg'],
  },
};

async function getBlogPosts() {
  await dbConnect();
  const posts = await BlogPost.find({ isPublished: true }).sort({ publishedAt: -1 });
  return JSON.parse(JSON.stringify(posts));
}

export default async function BlogPage() {
   const posts = await getBlogPosts();

   // --- ADDED STRUCTURED DATA ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AMDCG Research Blog",
    "description": "The official blog of the Advanced Materials Development and Characterization Group at IIT Bhilai.",
    "blogPost": posts.map((post: any) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://research.iitbhilai.ac.in/amdcg/blog/${post.slug}`
    }))
  };

  
return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPageClient posts={posts} />
    </>
  );
}