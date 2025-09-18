// FILE: src/components/AppContentWrapper.tsx
"use client"; // This component MUST be a client component

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import InitialLoader from "@/components/layout/InitialLoader";
import { NotificationBar } from "@/components/layout/NotificationBar";
import { BannerSection } from "@/components/layout/BannerSection";
import { useLoading } from "@/context/LoadingContext"; // Use the client hook here

interface AppContentWrapperProps {
  children: React.ReactNode;
}

// This component will conditionally render the main UI based on the loading state
export default function AppContentWrapper({ children }: AppContentWrapperProps) {
  const { isLoading } = useLoading(); // This hook requires the component to be a client component
  const pathname = usePathname(); // get the current path

  //check if the current path is the homepge
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Initial Loader - always rendered, but its visibility is controlled by its own internal state
          and the global isLoading state from context */}
      <InitialLoader />

      {/* Render the main application content only when isLoading is false */}
      {!isLoading && (
        <>
          {/* Contidionally render the BannerSection */}
          {isHomePage && (
            <> 
            <NotificationBar />
            <BannerSection />
            </>
          )}
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
