import "@/styles/globals.css";

import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { Inter, Orbitron, Space_Grotesk, Roboto_Condensed } from "next/font/google";
import { LoadingProvider } from "@/context/LoadingContext";
import AppContentWrapper from "@/components/AppContentWrapper";
import type { Metadata } from 'next';

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter' 
});
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-orbitron',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk',
});
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-roboto-condensed',
});

// --- UPDATED METADATA FOR AMDCG ---
export const metadata: Metadata = {
  // --- Core Metadata ---
  title: {
    default: 'AMDCG: Advanced Materials Development and Characterization Group',
    template: '%s | AMDCG',
  },
  description: "AMDCG is an active research group at IIT Bhilai focused on the design and development of novel materials for strategic applications in the space, defense, and bio-medical sectors.",
  
  // --- SEO Keywords ---
  keywords: ['AMDCG', 'IIT Bhilai', 'Materials Science', 'Metallurgy', 'Additive Manufacturing', 'Mechanical Engineering', 'Novel Materials', 'High Entropy Alloys', 'Alloy Design'],
  
  // --- Author & Publisher ---
  authors: [{ name: 'AMDCG - IIT Bhilai', url: 'https://research.iitbhilai.ac.in/amdcg/' }],
  creator: 'AMDCG',
  publisher: 'Indian Institute of Technology Bhilai',

  // --- Open Graph for Social Media (LinkedIn, Facebook, etc.) ---
  openGraph: {
    title: 'AMDCG: Advanced Materials Development and Characterization Group',
    description: 'An active research group at IIT Bhilai focused on designing novel materials for strategic applications.',
    url: 'https://research.iitbhilai.ac.in/amdcg/',
    siteName: 'AMDCG Research Group',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AMDCG Research Group Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // --- Twitter Card ---
  twitter: {
    card: 'summary_large_image',
    title: 'AMDCG: Advanced Materials Development and Characterization Group',
    description: 'An active research group at IIT Bhilai focused on designing novel materials for strategic applications.',
    images: ['/og-image.jpg'],
  },

  // --- Icons & Manifest ---
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',

  // --- Apple Mobile Web App Title ---
  appleWebApp: {
    title: "AMDCG",
    capable: true,
    statusBarStyle: "black-translucent",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} ${robotoCondensed.variable}`}>
      <body>
        <GoogleAnalytics />
        <LoadingProvider>
          <AppContentWrapper>{children}</AppContentWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}