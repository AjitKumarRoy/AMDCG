"use client";

import { useState } from "react";
import { Trash2, PlusCircle } from "lucide-react";
import { type TeamMember as ITeamMember } from "@/types";

type Contribution = {
  project?: string;
  role?: string;
  years?: string;
  description?: string;
};

export function ContributionsInput({ initialContributions = [] }: { initialContributions?: Contribution[] }) {
  const [contributions, setContributions] = useState<Contribution[]>(initialContributions);

  const handleAddContribution = () => {
    setContributions([...contributions, { project: "", role: "", years: "", description: "" }]);
  };

  const handleRemoveContribution = (indexToRemove: number) => {
    setContributions(contributions.filter((_, index) => index !== indexToRemove));
  };

  const handleContributionChange = (index: number, field: keyof Contribution, value: string) => {
    const updatedContributions = [...contributions];
    updatedContributions[index][field] = value;
    setContributions(updatedContributions);
  };

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Contributions & Projects</label>
      
      <input type="hidden" name="contributions" value={JSON.stringify(contributions)} />

      <div className="space-y-4">
        {contributions.map((contrib, index) => (
          <div key={index} className="p-3 rounded-md border border-slate-700 bg-slate-800/50 relative">
            <button 
              type="button" 
              onClick={() => handleRemoveContribution(index)}
              className="absolute top-2 right-2 p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            {/* --- UPDATED GRID LAYOUT --- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-400">Project</label>
                <input 
                  type="text" 
                  value={contrib.project} 
                  onChange={(e) => handleContributionChange(index, 'project', e.target.value)}
                  className="mt-1 w-full bg-slate-800/50 rounded-md border-slate-700 text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Role</label>
                <input 
                  type="text" 
                  value={contrib.role} 
                  onChange={(e) => handleContributionChange(index, 'role', e.target.value)}
                  className="mt-1 w-full bg-slate-800/50 rounded-md border-slate-700 text-sm px-3 py-2"
                />
              </div>
              {/* --- NEW 'YEARS' INPUT --- */}
              <div>
                <label className="text-xs text-slate-400">Years</label>
                <input 
                  type="text"
                  placeholder="e.g., 2022-2024" 
                  value={contrib.years} 
                  onChange={(e) => handleContributionChange(index, 'years', e.target.value)}
                  className="mt-1 w-full bg-slate-800/50 rounded-md border-slate-700 text-sm px-3 py-2"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="text-xs text-slate-400">Description</label>
                <textarea 
                  value={contrib.description} 
                  onChange={(e) => handleContributionChange(index, 'description', e.target.value)}
                  rows={2}
                  className="mt-1 w-full bg-slate-800/50 rounded-md border-slate-700 text-sm px-3 py-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        type="button" 
        onClick={handleAddContribution}
        className="w-full flex items-center justify-center gap-2 bg-sky-600/10 text-sky-400 font-semibold p-2 rounded-md transition-colors hover:bg-sky-600 hover:text-white"
      >
        <PlusCircle className="h-4 w-4" />
        Add Contribution
      </button>
    </div>
  );
}