import React from 'react';

// Define the props for our Title component
interface TitleProps {
  children: React.ReactNode;
  icon?: React.ElementType; // Allows passing an icon component (e.g., Layers)
  as?: 'h1' | 'h2' | 'h3' | 'h4'; // Allows setting the HTML tag for semantics
  className?: string;
}

export const Title = ({ 
  children, 
  icon: Icon,
  as: Tag = 'h2',
  className = '' 
}: TitleProps) => {
  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      {Icon && (
        // UPDATED: Icon container now uses the amber accent color
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
          <Icon className="h-6 w-6 text-amber-500" />
        </div>
      )}
      {/* Container for the text and its underline */}
      <div>
        <Tag className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 sm:text-3xl">
          {children}
        </Tag>
        {/* The new thin, premium underline */}
        <div className="mt-2 h-px w-full bg-gradient-to-r from-amber-500/0 via-amber-500/80 to-amber-500/0" />
      </div>
    </div>
  );
};