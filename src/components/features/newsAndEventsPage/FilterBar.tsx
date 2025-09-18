"use client";

import { CustomSelect } from "@/components/ui/CustomSelect";
import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedDateRange: string;
  setSelectedDateRange: (range: string) => void;
}

const noticeTypes = ['All', 'News Article', 'Announcement', 'Recruitment', 'Event'];
const dateRangeOptions = ['All Time', 'Upcoming', 'This Week', 'Last Week', 'Last Month', 'Last 6 Months', 'Last Year'];

export function FilterBar({ 
  searchQuery, setSearchQuery, 
  selectedType, setSelectedType,
  selectedDateRange, setSelectedDateRange
}: FilterBarProps) {
  return (
    <div className="relative z-20 p-4 rounded-lg border border-slate-800 bg-black/20 backdrop-blur-md flex flex-col lg:flex-row gap-4 lg:items-end">
      {/* Search Input */}
      <div className="lg:w-1/2">
        <label htmlFor="search-notices" className="block text-xs font-medium text-slate-400 mb-1">Filter by Search</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </span>
          <input
            id="search-notices"
            type="text"
            placeholder="Type Keywords"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 rounded-md border-slate-700 pl-10 pr-3 py-2.5 text-sm"
          />
        </div>
      </div>
      
      {/* Filter Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-4 lg:w-1/2">
        <CustomSelect
          className="w-full sm:w-2/3"
          label="Filter by Type"
          name="type-filter"
          options={noticeTypes}
          initialValue={selectedType}
          onValueChange={setSelectedType}
        />
        <CustomSelect
          className="w-full sm:w-1/3"
          label="Filter by Date"
          name="date-filter"
          options={dateRangeOptions}
          initialValue={selectedDateRange}
          onValueChange={setSelectedDateRange}
        />
      </div>
    </div>
  );
}