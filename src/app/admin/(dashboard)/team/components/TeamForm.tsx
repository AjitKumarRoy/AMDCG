"use client";

import { useState } from "react";
import { createTeamMember, updateTeamMember } from "../actions";
import { type TeamMember as ITeamMember } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { Users } from "lucide-react";
import { FormActions } from "./FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { TeamDetailsInputs } from "./TeamDetailsInputs";
import { SocialLinksInput } from "./SocialLinksInput";
import { ContributionsInput } from "./ContributionsInput";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

export function TeamForm({ member }: { member?: ITeamMember & { _id: string } }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) {
      toast.error("Please wait for the image to finish uploading.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const action = member ? updateTeamMember.bind(null, member._id) : createTeamMember;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: member ? 'Updating member...' : 'Creating member...',
      success: 'Team member saved successfully!',
      error: (err) => err.message || 'Failed to save member.',
    });
    
    try {
      await promise;
      // Wait a moment for the user to see the success toast, then redirect
      setTimeout(() => {
        router.push('/admin/team');
      }, 1000);
    } catch (error) {
      console.error("Error status:", error);
      // --- ADD THIS LINE ---
      // Reset the button's state when an error occurs
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={Users} as="h1">
          {member ? "Edit Team Member" : "Add New Team Member"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
          <TeamDetailsInputs member={member} />
          <SocialLinksInput member={member} />
          <FileUploadInput 
            label="Profile Image" 
            name="image" 
            folder="team" 
            accept="image/*" 
            initialFileUrl={member?.image}
            onUploadStatusChange={setIsUploading}
          />
          <ContributionsInput initialContributions={member?.contributions} />
          <FormActions isEditing={!!member} isSubmitting={isSubmitting} />
        </form>
      </div>
    </Section>
  );
}