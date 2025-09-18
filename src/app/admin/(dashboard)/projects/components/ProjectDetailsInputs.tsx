"use client";

import { useAutoSlug } from "@/hooks/useAutoSlug";
import { type Project as IProject } from "@/types";


export function ProjectDetailsInputs({ project }: { project?: IProject }) {
    // Use the hook to get all the logic and state for title and slug
  const { title, slug, handleTitleChange, handleSlugChange } = useAutoSlug({
    initialTitle: project?.title,
    initialSlug: project?.slug,
  });


  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Project Details</label>
      
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <label htmlFor="title" className="block text-xs font-medium text-slate-400">
            Title <span className="text-red-500">*</span>
          </label>
          <input 
            id="title" 
            name="title" 
            value={title}
            onChange={handleTitleChange}
            defaultValue={project?.title} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-xs font-medium text-slate-400">
            Slug (URL) <span className="text-red-500">*</span>
          </label>
          <input 
            id="slug" 
            name="slug" 
            value={slug}
            defaultValue={project?.slug} 
            onChange={handleSlugChange}
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
            required 
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-medium text-slate-400">Description</label>
          <textarea 
            id="description" 
            name="description" 
            defaultValue={project?.description} 
            rows={4} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-xs font-medium text-slate-400">External Link (Optional)</label>
          <input 
            id="link" 
            name="link" 
            type="url" 
            defaultValue={project?.link} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fundingAgency" className="block text-xs font-medium text-slate-400">Funding Agency (Optional)</label>
            <input 
              id="fundingAgency" 
              name="fundingAgency" 
              defaultValue={project?.fundingAgency} 
              className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
            />
          </div>
          <div>
            <label htmlFor="fundValue" className="block text-xs font-medium text-slate-400">Fund Value (Optional)</label>
            <input 
              id="fundValue" 
              name="fundValue" 
              defaultValue={project?.fundValue} 
              placeholder="e.g., ₹50 Lakhs"
              className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
            />
          </div>
        </div>


      </div>
    </div>
  );
}