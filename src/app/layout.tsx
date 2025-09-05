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

// --- UPDATED METADATA OBJECT ---
export const metadata: Metadata = {
  // --- Core Metadata ---
   title: {
    default: 'ORBI: Orbital Research & Beyond Innovations',
    template: '%s | ORBI', // %s will be replaced by the page-specific title
  },
  description: "ORBI is a multidisciplinary research group at NERIST dedicated to pioneering sustainable innovations through cutting-edge research in Artificial Intelligence, Aerospace, and Robotics.",
  
  // --- SEO Keywords ---
  keywords: ['ORBI', 'Orbital Research', 'NERIST', 'Aerospace Engineering', 'Artificial Intelligence', 'Robotics', 'Sustainable Technology', 'Research and Development'],
  
  // --- Author & Publisher ---
  authors: [{ name: 'ORBI - NERIST', url: 'https://orbi.nerist.ac.in' }],
  creator: 'ORBI',
  publisher: 'North Eastern Regional Institute of Science and Technology',

  // --- Open Graph for Social Media (LinkedIn, Facebook, etc.) ---
  openGraph: {
    title: 'ORBI: Orbital Research & Beyond Innovations',
    description: 'A multidisciplinary research group pioneering sustainable innovations in AI, Aerospace, and Robotics.',
    url: 'https://orbi.nerist.ac.in',
    siteName: 'ORBI',
    images: [
      {
        url: '/og-image.jpg', // Your preview image
        width: 1200,
        height: 630,
        alt: 'ORBI Research Group Logo and Title',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // --- Twitter Card ---
  twitter: {
    card: 'summary_large_image',
    title: 'ORBI: Orbital Research & Beyond Innovations',
    description: 'A multidisciplinary research group pioneering sustainable innovations in AI, Aerospace, and Robotics.',
    images: ['/og-image.jpg'], // Your preview image
  },

  // --- Icons & Manifest ---
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon1.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',

  // --- Apple Mobile Web App Title ---
  appleWebApp: {
    title: "ORBI",
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