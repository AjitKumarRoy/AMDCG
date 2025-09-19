"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "../actions";
import { type Project as IProject } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FolderKanban } from "lucide-react";
import { ProjectDetailsInputs } from "./ProjectDetailsInputs";
import { TagInput } from "./TagInput"; 
import { ProjectMetadataInputs } from "./ProjectMetadataInputs";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { TeamMemberInput } from "./TeamMemberInput";
import { FormActions } from "./FormActions";
import toast from 'react-hot-toast';


export function ProjectForm({ project }: { project?: IProject & { _id: string } }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This function now handles the submission and calls the server action
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) {
      toast.error("Please wait for the image to finish uploading.");
      return;
    }
    
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const action = project ? updateProject.bind(null, project._id) : createProject;

    const promise = action(formData);

    toast.promise(promise, {
      loading: project ? 'Updating project...' : 'Creating project...',
      success: 'Project saved successfully!',
      error: 'Failed to save project.',
    });

     try {
      await promise;
      // Wait a moment for the user to see the success toast, then redirect
      setTimeout(() => {
        router.push('/admin/projects');
      }, 1000); // 1 second delay
    } catch (error) {
      console.error("Error status:", error);
      // The error toast will be shown automatically
      setIsSubmitting(false);
    }
    
    // await action(formData);
    
    // In a real app, you might not set this to false because of the redirect,
    // but it's good practice in case the redirect fails.
    // setIsSubmitting(false);
  };

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={FolderKanban} as="h1">
          {project ? "Edit Project" : "Create New Project"}
        </Title>
        
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md"
        >
          <ProjectDetailsInputs project={project} />
          <TagInput 
          label="Fields / Keywords"
          name="fields"
          initialTags={project?.fields}
          />
          <ProjectMetadataInputs project={project} />
          <FileUploadInput 
            label="Project Image" 
            name="image" 
            folder="projects" 
            accept="image/*" 
            initialFileUrl={project?.image}
            onUploadStatusChange={setIsUploading} // Pass the callback
          />
          <TeamMemberInput initialMembers={project?.teamMembers} />
          <FormActions 
            isEditing={!!project} 
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </Section>
  );
}