import { Metadata } from 'next';
import { ContactPageClient } from '@/components/contactPage/ContactPageClient';


// --- SEO for the Contact Page ---
export async function generateMetadata(): Promise<Metadata> {
  // Automatically create a list of keywords from the contact persons


  return {
  
  };
}


// This is now a simple Server Component
export default function ContactPage() {
  return <ContactPageClient />;
}