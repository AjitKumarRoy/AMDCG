"use client";
import { type TeamMember as ITeamMember } from "@/types";

export function SocialLinksInput({ member }: { member?: ITeamMember }) {
  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Social & Profile Links</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
        <div>
          <label htmlFor="website" className="block text-xs font-medium text-slate-400">Website</label>
          <input id="website" name="website" type="url" defaultValue={member?.socialLinks?.website} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="linkedin" className="block text-xs font-medium text-slate-400">LinkedIn</label>
          <input id="linkedin" name="linkedin" type="url" defaultValue={member?.socialLinks?.linkedin} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="googleScholar" className="block text-xs font-medium text-slate-400">Google Scholar</label>
          <input id="googleScholar" name="googleScholar" type="url" defaultValue={member?.socialLinks?.googleScholar} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>

        <div>
          <label htmlFor="researchGate" className="block text-xs font-medium text-slate-400">ResearchGate</label>
          <input id="researchGate" name="researchGate" type="url" defaultValue={member?.socialLinks?.researchGate} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="twitter" className="block text-xs font-medium text-slate-400">Twitter / X</label>
          <input id="twitter" name="twitter" type="url" defaultValue={member?.socialLinks?.twitter} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="github" className="block text-xs font-medium text-slate-400">GitHub</label>
          <input id="github" name="github" type="url" defaultValue={member?.socialLinks?.github} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
        
      </div>
    </div>
  );
}