"use client";

import { type NewsArticle as INewsArticle } from "@/types";
import { useAutoSlug } from "@/hooks/useAutoSlug";

export function NewsArticleDetailsInputs({ article }: { article?: INewsArticle }) {
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
        
        <div>
            <label htmlFor="date" className="block text-xs font-medium text-slate-400">Date <span className="text-red-500">*</span></label>
            <input 
              id="date" 
              name="date" 
              type="date" 
              defaultValue={article?.date ? new Date(article.date).toISOString().substring(0, 10) : ''} 
              className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
              required 
            />
        </div>
        
        <div>
          <label htmlFor="excerpt" className="block text-xs font-medium text-slate-400">Excerpt (Short Summary) <span className="text-red-500">*</span></label>
          <textarea 
            id="excerpt" 
            name="excerpt" 
            defaultValue={article?.excerpt} 
            rows={3} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
            required 
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-xs font-medium text-slate-400">Full Content (Optional)</label>
          <textarea 
            id="content" 
            name="content" 
            defaultValue={article?.content} 
            rows={10} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
          />
        </div>
        
        <div>
          <label htmlFor="link" className="block text-xs font-medium text-slate-400">External Link (Optional)</label>
          <input 
            id="link" 
            name="link" 
            type="url" 
            defaultValue={article?.link} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
          />
        </div>
      </div>
    </div>
  );
}