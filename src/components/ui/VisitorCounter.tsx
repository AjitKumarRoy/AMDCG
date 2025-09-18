"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Users } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const effectRan = useRef(false); // Ref to track if the useEffect has run

  useEffect(() => {

    // Only run the logic if the effect has not run before
    if (effectRan.current === false) {
            // A flag to ensure we only count the visit once per session
            const hasVisited = sessionStorage.getItem('amdcg_visited');

            const fetchCount = async () => {
            // First, get the current count
            const getResponse = await fetch('/api/visitor-count');
            const getData = await getResponse.json();
            
            if (getData.success) {
                setCount(getData.count);
            }
            };

            const trackAndFetchCount = async () => {
            // Send a POST request to increment the count
            const postResponse = await fetch('/api/visitor-count', { method: 'POST' });
            const postData = await postResponse.json();
            
            if (postData.success) {
                setCount(postData.count);
                // Set the flag in session storage
                sessionStorage.setItem('amdcg_visited', 'true');
            }
            };

            if (!hasVisited) {
            trackAndFetchCount();
            } else {
            fetchCount();
            }

    }

    // --- ADD THIS CLEANUP FUNCTION ---
    // This runs when the component unmounts
    // In Strict Mode, it runs after the first render,
    // setting the ref to true before the second render.
    return () => {
      effectRan.current = true;
    };
  }, []); // Empty array ensures this runs only on mount
  


   // Logic for the odometer display
  const paddedCount = useMemo(() => {
    if (count === null) return null;
    const countStr = count.toString();
    // Start with at least 5 digits, but expand if the number is larger
    const numDigits = Math.max(5, countStr.length);
    return countStr.padStart(numDigits, '0');
  }, [count]);

  return (
    <div className="flex flex-col items-center sm:items-start">
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
        <Users className="h-4 w-4" />
        <span>Total Visitors</span>
      </div>
      <div className="flex gap-1">
        {paddedCount ? (
          paddedCount.split('').map((digit, index) => (
            <div key={index} className="w-8 h-10 flex items-center justify-center bg-slate-800 text-white font-bold text-xl rounded-md border border-slate-700 shadow-inner">
              {digit}
            </div>
          ))
        ) : (
          // Premium Loading State
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-8 h-10 bg-slate-800 rounded-md animate-pulse border border-slate-700" />
          ))
        )}
      </div>
    </div>
  );
}