"use client";

import { useState, useEffect } from "react";
import { Trash2, PlusCircle } from "lucide-react";

interface AuthorInputProps {
  initialAuthors?: string[];
  onAuthorsChange: (authors: string[]) => void; // --- ADD THIS PROP ---
}

export function AuthorInput({ initialAuthors = [], onAuthorsChange }: AuthorInputProps) {
  const [authors, setAuthors] = useState<string[]>(initialAuthors);
  const [newAuthor, setNewAuthor] = useState("");

    // Inform the parent component whenever the authors list changes
  useEffect(() => {
    onAuthorsChange(authors);
  }, [authors, onAuthorsChange]);

  const handleAddAuthor = () => {
    if (newAuthor.trim()) {
      setAuthors([...authors, newAuthor.trim()]);
      setNewAuthor("");
    }
  };

  const handleRemoveAuthor = (indexToRemove: number) => {
    setAuthors(authors.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">
        Authors <span className="text-red-500">*</span> 
      </label>
      <input type="hidden" name="authors" value={JSON.stringify(authors)} />

      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
        {authors.map((author, index) => (
          <div key={index} className="flex items-center justify-between bg-slate-800/50 p-2 rounded-lg">
            <p className="text-sm text-slate-200">{author}</p>
            <button type="button" onClick={() => handleRemoveAuthor(index)} className="p-1 text-slate-400 hover:text-red-500">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
        <input 
          type="text" 
          placeholder="Add author name..."
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="flex-grow bg-slate-800/50 rounded-md border-slate-700 text-sm px-3 py-2.5"
        />
        <button type="button" onClick={handleAddAuthor} className="bg-sky-600 hover:bg-sky-500 text-white p-2 rounded-md">
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}