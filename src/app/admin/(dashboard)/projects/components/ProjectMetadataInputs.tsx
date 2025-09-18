"use client";

import { type Project as IProject } from "@/types";
import { DatePicker } from "@/components/ui/DatePicker";
import { CustomSelect } from "@/components/ui/CustomSelect"; // 1. Import the new component

const statusOptions = ['Ongoing', 'Completed', 'Active', 'On Hold'];

export function ProjectMetadataInputs({ project }: { project?: IProject }) {
  return (
    <div className="relative z-20 p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Project Metadata</label>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* --- 2. REPLACE the old Listbox with the new CustomSelect --- */}
        <CustomSelect 
          label="Status"
          name="status"
          options={statusOptions}
          initialValue={project?.status}
          required
        />
        
        <DatePicker 
          label="Start Date"
          name="startDate"
          initialDate={project?.startDate ? new Date(project.startDate) : new Date()}
          required
        />
        
        <DatePicker 
          label="End Date (Optional)"
          name="endDate"
          initialDate={project?.endDate ? new Date(project.endDate) : undefined}
        />
      </div>
    </div>
  );
}