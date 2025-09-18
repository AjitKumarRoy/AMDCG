"use client";

import { CustomSelect } from "@/components/ui/CustomSelect";
import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDateRange: string;
  setSelectedDateRange: (range: string) => void;
}

const dateRangeOptions = ['All Time', 'This Week', 'Last Week', 'Last Month', 'Last 6 Months', 'Last Year'];

export function FilterBar({ 
  searchQuery, setSearchQuery, 
  selectedDateRange, setSelectedDateRange
}: FilterBarProps) {
  return (
    <div className="relative z-20 p-4 rounded-lg border border-slate-800 bg-black/20 backdrop-blur-md flex flex-col lg:flex-row gap-4 lg:items-end">
      <div className="lg:flex-grow">
        <label htmlFor="search-blog" className="block text-xs font-medium text-slate-400 mb-1">Search Blog</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </span>
          <input
            id="search-blog"
            type="text"
            placeholder="Search by title, tag, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 rounded-md border-slate-700 pl-10 pr-3 py-2.5 text-sm"
          />
        </div>
      </div>
      
      <CustomSelect
        className="w-full lg:w-auto lg:min-w-[160px]"
        label="Filter by Date"
        name="date-filter"
        options={dateRangeOptions}
        initialValue={selectedDateRange}
        onValueChange={setSelectedDateRange}
      />
    </div>
  );
}