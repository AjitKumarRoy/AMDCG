import { Metadata } from 'next';
import { CareersClientPage } from '@/components/careersPage/CareersClientPage';

// --- SEO for the Venue Page ---
export async function generateMetadata(): Promise<Metadata> {


  return {
    
  };
}

// This is now a simple Server Component
export default function VenuePage() {
  return <CareersClientPage />;
}