"use client";

import { useState } from "react";
import { Trash2, Link as LinkIcon, UserPlus } from "lucide-react";

interface TeamMember {
  name: string;
  profileLink: string;
}

interface TeamMemberInputProps {
  initialMembers?: TeamMember[];
}

export function TeamMemberInput({ initialMembers = [] }: TeamMemberInputProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");

  const handleAddMember = () => {
    if (newName.trim()) {
      setMembers([...members, { name: newName.trim(), profileLink: newLink.trim() }]);
      setNewName("");
      setNewLink("");
    }
  };

  const handleRemoveMember = (indexToRemove: number) => {
    setMembers(members.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">Team Members</label>
      
      <input type="hidden" name="teamMembers" value={JSON.stringify(members)} />

      {/* List of current members */}
      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
        {members.length > 0 ? members.map((member, index) => (
          <div key={index} className="flex items-center justify-between bg-slate-800/50 border border-slate-700 p-2 rounded-lg">
            <div>
              <a 
                href={member.profileLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-semibold text-slate-100 hover:text-amber-400 hover:underline"
              >
                {member.name}
              </a>
              {member.profileLink && (
                 <p className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                  <LinkIcon className="h-3 w-3" />
                  {member.profileLink}
                </p>
              )}
            </div>
            <button type="button" onClick={() => handleRemoveMember(index)} className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )) : (
          <p className="text-sm text-slate-500 italic px-2">No team members added yet.</p>
        )}
      </div>

      {/* --- REDESIGNED INPUT SECTION --- */}
      <div className="pt-4 border-t border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="new-member-name" className="text-xs font-medium text-slate-400">Member Name</label>
            <input 
              id="new-member-name"
              type="text" 
              placeholder="e.g., Dr. Jane Doe"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              // --- ADDED PADDING HERE ---
              className="mt-1 w-full bg-slate-800/50 rounded-md border-slate-700 text-sm px-3 py-2.5 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div>
            <label htmlFor="new-member-link" className="text-xs font-medium text-slate-400">Profile Link (Optional)</label>
            <input 
              id="new-member-link"
              type="text" 
              placeholder="https://linkedin.com/..."
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              // --- ADDED PADDING HERE ---
              className="mt-1 w-full bg-slate-800/50 rounded-md border-slate-700 text-sm px-3 py-2.5 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>
        <button 
          type="button" 
          onClick={handleAddMember} 
          className="mt-3 w-full flex items-center justify-center gap-2 bg-amber-600/10 text-amber-400 font-semibold p-2 rounded-md transition-colors hover:bg-amber-600 hover:text-white"
        >
          <UserPlus className="h-4 w-4" />
          Add Member
        </button>
      </div>
    </div>
  );
}