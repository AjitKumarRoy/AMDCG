"use client";
import { type Facility as IFacility } from "@/types";
import { CustomSelect } from "@/components/ui/CustomSelect";

const categoryOptions = ['Characterization', 'Processing', 'Testing', 'Synthesis', 'Computational'];
const statusOptions = ['Operational', 'Under Maintenance', 'Coming Soon'];

export function FacilityDetailsInputs({ facility }: { facility?: IFacility }) {
  return (
    <div className="relative z-20 p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Facility Details</label>
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-slate-400">Name <span className="text-red-500">*</span></label>
            <input 
              id="name"
              name="name" 
              defaultValue={facility?.name} 
              className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
              required 
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-xs font-medium text-slate-400">Model (Optional)</label>
            <input 
              id="model"
              name="model" 
              defaultValue={facility?.model} 
              className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
            />
          </div>
        </div>
        <CustomSelect 
          label="Category" 
          name="category" 
          options={categoryOptions} 
          initialValue={facility?.category} 
          required
        />
        <div>
          <label htmlFor="description" className="block text-xs font-medium text-slate-400">Description</label>
          <textarea 
            id="description"
            name="description" 
            defaultValue={facility?.description} 
            rows={5} 
            className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-xs font-medium text-slate-400">Location</label>
            <input 
              id="location"
              name="location" 
              defaultValue={facility?.location} 
              className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500" 
            />
          </div>
          <CustomSelect 
            label="Status" 
            name="status" 
            options={statusOptions} 
            initialValue={facility?.status} 
          />
        </div>
      </div>
    </div>
  );
}