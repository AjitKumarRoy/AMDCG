"use client";

import { useAutoSlug } from "@/hooks/useAutoSlug";
import { type BlogPost as IBlogPost } from "@/types";


export function BlogDetailsInputs({ post }: { post?: IBlogPost }) {
  const { title, slug, handleTitleChange, handleSlugChange } = useAutoSlug({
    initialTitle: post?.title,
    initialSlug: post?.slug,
  });

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Post Details</label>
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <label htmlFor="title" className="block text-xs font-medium text-slate-400">Title <span className="text-red-500">*</span></label>
          <input 
            id="title"
            name="title" 
            value={title} 
            onChange={handleTitleChange} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
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
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
            required 
          />
        </div>
        
         {/* --- ADD AUTHOR INPUT HERE --- */}
        <div>
          <label htmlFor="author" className="block text-xs font-medium text-slate-400">Author <span className="text-red-500">*</span></label>
          <input 
            id="author" 
            name="author" 
            defaultValue={post?.author || 'Admin'} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" 
            required 
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-xs font-medium text-slate-400">Excerpt (Short Summary) <span className="text-red-500">*</span></label>
          <textarea 
            id="excerpt"
            name="excerpt" 
            defaultValue={post?.excerpt} 
            rows={3} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
            required 
          />
        </div>

      </div>
    </div>
  );
}