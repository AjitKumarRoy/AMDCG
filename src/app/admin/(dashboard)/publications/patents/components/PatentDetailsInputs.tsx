"use client";

import { useAutoSlug } from "@/hooks/useAutoSlug";
import { type Patent as IPatent } from "@/types";
import { CustomSelect } from "@/components/ui/CustomSelect";


export function PatentDetailsInputs({ patent }: { patent?: IPatent }) {
  const patentTypes = ['Design Patent', 'Utility Patent'];
  // Use the hook to get all the logic and state for title and slug
  const { title, slug, handleTitleChange, handleSlugChange } = useAutoSlug({
    initialTitle: patent?.title,
    initialSlug: patent?.slug,
  });

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Patent Details</label>
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <label htmlFor="title" className="block text-xs font-medium text-slate-400">Title <span className="text-red-500">*</span></label>
          <textarea id="title" name="title" value={title} onChange={handleTitleChange} rows={3} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-xs font-medium text-slate-400">Slug (URL) <span className="text-red-500">*</span></label>
          <input id="slug" name="slug" value={slug} onChange={handleSlugChange} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2">
            <label htmlFor="patentNumber" className="block text-xs font-medium text-slate-400">Patent Number <span className="text-red-500">*</span></label>
            <input id="patentNumber" name="patentNumber" defaultValue={patent?.patentNumber} placeholder="e.g., 409270-001 (Granted)" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
          </div>
          <div>
            <label htmlFor="year" className="block text-xs font-medium text-slate-400">Year <span className="text-red-500">*</span></label>
            <input id="year" name="year" type="number" defaultValue={patent?.year} placeholder="e.g., 2024" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
          </div>
        </div>
        
        <CustomSelect 
          label="Patent Type"
          name="type"
          options={patentTypes}
          initialValue={patent?.type}
        />

        <div>
          <label htmlFor="abstract" className="block text-xs font-medium text-slate-400">Abstract / Description <span className="text-red-500">*</span></label>
          <textarea id="abstract" name="abstract" defaultValue={patent?.abstract} rows={6} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
      </div>
    </div>
  );
}