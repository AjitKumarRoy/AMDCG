"use client";

import { useAutoSlug } from "@/hooks/useAutoSlug";
import { type TeamMember as ITeamMember } from "@/types";
import { CustomSelect } from "@/components/ui/CustomSelect";


export function TeamDetailsInputs({ member }: { member?: ITeamMember }) {
   // Use the hook to get all the logic and state for name and slug
  // We rename 'title' to 'name' and 'handleTitleChange' to 'handleNameChange' to match our form
  const { 
    title: name, 
    slug, 
    handleTitleChange: handleNameChange, 
    handleSlugChange 
  } = useAutoSlug({
    initialTitle: member?.name,
    initialSlug: member?.slug,
  });


  return (
    <div className="relative z-20 p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Core Details</label>
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-slate-400">Full Name <span className="text-red-500">*</span></label>
          <input id="name" name="name" value={name} onChange={handleNameChange} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label htmlFor="slug" className="block text-xs font-medium text-slate-400">Slug (URL) <span className="text-red-500">*</span></label>
          <input id="slug" name="slug" value={slug} onChange={handleSlugChange} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-400">Email <span className="text-red-500">*</span></label>
                <input id="email" name="email" type="email" defaultValue={member?.email} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
            </div>
            <div>
                <label htmlFor="phone" className="block text-xs font-medium text-slate-400">Phone (Optional)</label>
                <input id="phone" name="phone" type="tel" defaultValue={member?.phone} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
            </div>
        </div>
        <div>
          <label htmlFor="role" className="block text-xs font-medium text-slate-400">Role / Position <span className="text-red-500">*</span></label>
          <input id="role" name="role" defaultValue={member?.role} placeholder="e.g., Assistant Professor" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label htmlFor="affiliation" className="block text-xs font-medium text-slate-400">Affiliation <span className="text-red-500">*</span></label>
          <input id="affiliation" name="affiliation" defaultValue={member?.affiliation} placeholder="e.g., IITBhilai" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label htmlFor="bio" className="block text-xs font-medium text-slate-400">Biography</label>
          <textarea id="bio" name="bio" defaultValue={member?.bio} rows={4} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <CustomSelect label="Type" name="type" options={['Core', 'PostDoc', 'Phd', 'M.Tech', 'B.Tech', 'Project Assistant', 'Project Associate', 'Intern']} initialValue={member?.type} required/>
            <CustomSelect label="Working Status" name="workingStatus" options={['current', 'alumni']} initialValue={member?.workingStatus} />
            {/* <div>
                <label htmlFor="workingStatus" className="block text-xs font-medium text-slate-400">Working Status</label>
                <input id="workingStatus" name="workingStatus" defaultValue={member?.workingStatus} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
            </div> */}
            <div>
                <label htmlFor="yearsWorked" className="block text-xs font-medium text-slate-400">Years Worked</label>
                <input id="yearsWorked" name="yearsWorked" defaultValue={member?.yearsWorked} placeholder="e.g., 2022 - Present" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
            </div>
        </div>
      </div>
    </div>
  );
}