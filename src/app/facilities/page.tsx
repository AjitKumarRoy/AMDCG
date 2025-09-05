import { Metadata } from 'next';
import { FacilitiesPageClient } from '@/components/facilitiesPage/FacilitiesPageClient';


// --- SEO for the Registration Page ---
export async function generateMetadata(): Promise<Metadata> {
  // Automatically create a list of keywords from the fee categories
 

  return {
    
  };
}

// This is now a simple Server Component
export default function RegistrationPage() {
  return <FacilitiesPageClient />;
}