"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface SpecificationInputProps {
  initialSpecs?: string[];
}

export function SpecificationInput({ initialSpecs = [] }: SpecificationInputProps) {
  const [specs, setSpecs] = useState<string[]>(initialSpecs);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSpec = inputValue.trim();
      if (newSpec && !specs.includes(newSpec)) {
        setSpecs([...specs, newSpec]);
      }
      setInputValue("");
    }
  };

  const removeSpec = (indexToRemove: number) => {
    setSpecs(specs.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md">
      <label className="block text-base font-medium text-slate-200 font-heading mb-2">Specifications</label>
      <input type="hidden" name="specifications" value={JSON.stringify(specs)} />
      <div className="flex flex-wrap items-center gap-2 p-2 mt-2 rounded-md border border-slate-700 bg-slate-800/50">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center gap-1.5 bg-sky-600/50 text-sky-200 text-sm font-medium px-2 py-1 rounded-full">
            <span>{spec}</span>
            <button type="button" onClick={() => removeSpec(index)} className="hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a spec and press Enter..."
          className="flex-grow bg-transparent text-sm p-1 focus:outline-none text-white"
        />
      </div>
    </div>
  );
}