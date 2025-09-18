"use client";

import { useAutoSlug } from "@/hooks/useAutoSlug";
import { type Event as IEvent } from "@/types";

export function EventDetailsInputs({ event }: { event?: IEvent }) {
  const { title, slug, handleTitleChange, handleSlugChange } = useAutoSlug({
    initialTitle: event?.title,
    initialSlug: event?.slug,
  });

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Event Details</label>
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <label htmlFor="title" className="block text-xs font-medium text-slate-400">Title <span className="text-red-500">*</span></label>
          <input 
            id="title" 
            name="title" 
            value={title} 
            onChange={handleTitleChange} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
            required 
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-xs font-medium text-slate-400">Slug (URL) <span className="text-red-500">*</span></label>
          <input 
            id="slug" 
            name="slug" 
            value={slug} 
            onChange={handleSlugChange} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-xs font-medium text-slate-400">Date <span className="text-red-500">*</span></label>
            <input 
              id="date" 
              name="date" 
              type="date" 
              defaultValue={event?.date ? new Date(event.date).toISOString().substring(0, 10) : ''} 
              className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
              required 
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-xs font-medium text-slate-400">Location (Optional)</label>
            <input 
              id="location" 
              name="location" 
              defaultValue={event?.location}
              className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-xs font-medium text-slate-400">Description (Optional)</label>
          <textarea 
            id="description" 
            name="description" 
            defaultValue={event?.description} 
            rows={5} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
          />
        </div>
        
        <div>
          <label htmlFor="externalLink" className="block text-xs font-medium text-slate-400">External Link (Optional)</label>
          <input 
            id="externalLink" 
            name="externalLink" 
            type="url" 
            defaultValue={event?.externalLink} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
          />
        </div>
      </div>
    </div>
  );
}