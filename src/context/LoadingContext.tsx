// FILE: src/context/LoadingContext.tsx
"use client"; // This context provider must be a client component

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the Loading Context
interface LoadingContextType {
  isLoading: boolean;
  // setLoading: (loading: boolean) => void; // We won't expose setLoading directly for simplicity
}

// Create the context with a default (undefined) value
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Props for the LoadingProvider
interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true); // Default to true

  // This useEffect manages the overall app loading duration.
  // The loader will be visible for at least this duration.
  useEffect(() => {
    // Simulate initial content loading time.
    // In a real application, you might replace this with actual data fetching
    // or resource loading completion checks.
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay
    }, 2500); // Loader visible for 2.5 seconds (adjust as needed)

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array means this runs once on mount

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

// Custom hook to easily consume the loading context
export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
