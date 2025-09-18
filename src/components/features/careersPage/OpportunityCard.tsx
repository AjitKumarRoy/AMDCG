"use client";

import { Button } from "@/components/ui/Button";

interface OpportunityCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: 'primary' | 'secondary';
  onApplyClick: () => void;
}

export function OpportunityCard({
  title,
  description,
  buttonText,
  buttonVariant = 'secondary',
  onApplyClick,
}: OpportunityCardProps) {
  return (
    <div className="p-6 rounded-lg flex flex-col border border-white/10   bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
      <h3 className="font-bold text-white font-heading">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 flex-grow">
        {description}
      </p>
      <div className="mt-4">
        <Button onClick={onApplyClick} variant={buttonVariant} className="w-full">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}