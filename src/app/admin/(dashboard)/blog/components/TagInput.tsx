"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label: string;
  name: string;
  initialTags?: string[];
}

export function TagInput({ label, name, initialTags = [] }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md">
      <label htmlFor={name} className="block text-base font-medium text-slate-200 font-heading mb-2">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(tags)} />
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-md border border-slate-700 bg-slate-800/50">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1.5 bg-sky-600/50 text-sky-200 text-sm font-medium px-2 py-1 rounded-full">
            <span>{tag}</span>
            <button type="button" onClick={() => removeTag(index)} className="hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag and press Enter..."
          className="flex-grow bg-transparent text-sm p-1 focus:outline-none text-white"
        />
      </div>
    </div>
  );
}