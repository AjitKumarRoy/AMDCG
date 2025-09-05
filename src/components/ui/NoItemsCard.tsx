import React from 'react';

interface NoItemsCardProps {
  icon?: React.ElementType;
  title: string;
  message: string;
  className?: string;
}

export const NoItemsCard = ({ icon: Icon, title, message, className = '' }: NoItemsCardProps) => {
  return (
    <div className={`mt-12 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-12 text-center backdrop-blur-md ${className}`}>
      {Icon && <Icon className="h-12 w-12 text-amber-500/50" />}
      <p className="mt-4 font-semibold text-slate-300">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{message}</p>
    </div>
  );
};