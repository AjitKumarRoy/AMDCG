"use client";

import { CustomSelect } from "@/components/ui/CustomSelect";
import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  allFields: string[];
  selectedField: string;
  setSelectedField: (field: string) => void;
}

const statusOptions = ['All', 'Ongoing', 'Completed', 'Active', 'On Hold'];

export function FilterBar({
  searchQuery, setSearchQuery,
  selectedStatus, setSelectedStatus,
  allFields, selectedField, setSelectedField
}: FilterBarProps) {
  return (
    <div className="relative z-20 p-4 rounded-lg border border-slate-800 bg-black/20 backdrop-blur-md flex flex-col lg:flex-row gap-4 lg:items-end">
      {/* --- THIS IS THE UPDATED SEARCH INPUT --- */}
      <div className="lg:w-1/2">
        <label htmlFor="search-projects" className="block text-xs font-medium text-slate-400 mb-1">Search by Title</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </span>
          <input
            id="search-projects"
            type="text"
            placeholder="e.g., Additive Manufacturing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 rounded-md border-slate-700 pl-10 pr-3 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>
      
      {/* Filter Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-4 lg:w-1/2">
        <CustomSelect
          className="w-full sm:w-1/2"
          label="Filter by Status"
          name="status-filter"
          options={statusOptions}
          initialValue={selectedStatus}
          onValueChange={setSelectedStatus}
        />
        <CustomSelect
          className="w-full sm:w-1/2"
          label="Filter by Field"
          name="field-filter"
          options={allFields}
          initialValue={selectedField}
          onValueChange={setSelectedField}
        />
      </div>
    </div>
  );
}