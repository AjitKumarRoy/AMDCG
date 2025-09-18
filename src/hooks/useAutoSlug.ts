"use client";

import { useState, useEffect } from 'react';

// The helper function to generate a slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, ''); // Remove all non-word chars
};

interface AutoSlugProps {
  initialTitle?: string;
  initialSlug?: string;
}

// This is our new custom hook
export function useAutoSlug({ initialTitle = '', initialSlug = '' }: AutoSlugProps) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialSlug);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugManuallyEdited(true);
  };

  return {
    title,
    slug,
    handleTitleChange,
    handleSlugChange
  };
}