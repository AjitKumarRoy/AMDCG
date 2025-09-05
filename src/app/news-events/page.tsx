import { Metadata } from 'next';
import { NewsAndEventsPageClient } from '@/components/newsAndEventsPage/NewAndEventsPageClient';


// --- SEO for the Committee Page ---
export async function generateMetadata(): Promise<Metadata> {
  

  return {
  
  };
}

// This remains a simple Server Component that renders the client part
export default function NewAndEventsPage() {
  return <NewsAndEventsPageClient />;
}