"use client";
import { type GalleryImage as IGalleryImage } from "@/types";
import { DatePicker } from "@/components/ui/DatePicker";


export function GalleryDetailsInputs({ image }: { image?: IGalleryImage }) {
  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Image Details</label>
      <div className="space-y-6 pt-4 border-t border-slate-800">

        <DatePicker 
            label="Date" 
            name="date" 
            initialDate={image?.date ? new Date(image.date) : new Date()} 
          />

        <div>
          <label htmlFor="title" className="block text-xs font-medium text-slate-400">Title <span className="text-red-500">*</span></label>
          <input 
            id="title"
            name="title" 
            defaultValue={image?.title} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
            required 
          />
        </div>
         
      </div>
    </div>
  );
}