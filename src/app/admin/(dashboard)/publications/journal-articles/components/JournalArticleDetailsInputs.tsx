"use client";

import { useAutoSlug } from "@/hooks/useAutoSlug";
import { type JournalArticle as IJournalArticle } from "@/types";


export function JournalArticleDetailsInputs({ article }: { article?: IJournalArticle }) {
  // Use the hook to get all the logic and state for title and slug
  const { title, slug, handleTitleChange, handleSlugChange } = useAutoSlug({
    initialTitle: article?.title,
    initialSlug: article?.slug,
  });


  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Article Details</label>
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <label htmlFor="title" className="block text-xs font-medium text-slate-400">Title <span className="text-red-500">*</span></label>
          <textarea id="title" name="title" value={title} onChange={handleTitleChange} rows={3} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>

         <div>
          <label htmlFor="slug" className="block text-xs font-medium text-slate-400">Slug (URL) <span className="text-red-500">*</span></label>
          <input id="slug" name="slug" value={slug} onChange={handleSlugChange} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="journalOrConference" className="block text-xs font-medium text-slate-400">Journal / Conference <span className="text-red-500">*</span></label>
            <input id="journalOrConference" name="journalOrConference" defaultValue={article?.journalOrConference} placeholder="e.g., Journal of Alloys and Compounds" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
          </div>
          <div>
            <label htmlFor="year" className="block text-xs font-medium text-slate-400">Year <span className="text-red-500">*</span></label>
            <input id="year" name="year" type="number" defaultValue={article?.year} placeholder="e.g., 2022" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
          </div>
        </div>
        
        <div>
          <label htmlFor="abstract" className="block text-xs font-medium text-slate-400">Abstract <span className="text-red-500">*</span></label>
          <textarea id="abstract" name="abstract" defaultValue={article?.abstract} rows={6} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        
        <div>
          <label htmlFor="link" className="block text-xs font-medium text-slate-400">Publication Link <span className="text-red-500">*</span></label>
          <input id="link" name="link" type="url" defaultValue={article?.link} placeholder="e.g., https://www.sciencedirect.com/science/article/pii/S0925838824044888?via%3Dihub" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
      </div>
    </div>
  );
}