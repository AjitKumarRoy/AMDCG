import { Metadata } from 'next';
import { BlogPageClient } from '@/components/blogPage/BlogPageClient';


// --- SEO for the Speakers Page ---
export async function generateMetadata(): Promise<Metadata> {


  return {
  
  };
}


// This is now a simple Server Component
export default function SpeakersPage() {
  return <BlogPageClient />;
}