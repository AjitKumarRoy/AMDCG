import Link from 'next/link';
import React from 'react';

// Prop type is unchanged
type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
} & (React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>);


export const Button = ({ 
  children, 
  href, 
  variant = 'secondary',
  className = '', 
  ...rest 
}: ButtonProps) => {

  // Base classes are unchanged
  const baseClasses = "font-button inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-300";

  // --- UPDATED VARIANT COLORS ---
  const variantClasses = {
    primary: "bg-amber-600 text-white shadow-lg hover:bg-amber-500 hover:scale-105",
    secondary: "border border-slate-700 text-slate-300 hover:border-sky-400 hover:text-sky-400",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
};