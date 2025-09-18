"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createRecruitment, updateRecruitment } from "../../actions";
import { type Recruitment as IRecruitment } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FaUserPlus } from "react-icons/fa";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { RecruitmentDetailsInputs } from "./RecruitmentDetialsInputs";
import toast from 'react-hot-toast';

export function RecruitmentForm({ recruitment }: { recruitment?: IRecruitment & { _id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTab = searchParams.get('returnTab') || 'recruitments';
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) {
      toast.error("Please wait for the file to finish uploading.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const action = recruitment ? updateRecruitment.bind(null, recruitment._id) : createRecruitment;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: recruitment ? 'Updating posting...' : 'Creating posting...',
      success: 'Recruitment posting saved successfully!',
      error: (err) => err.message || 'Failed to save posting.',
    });
    
    try {
      await promise;
      setTimeout(() => { router.push(`/admin/news-notices?tab=${returnTab}`); }, 1000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const cancelUrl = `/admin/news-notices?tab=${returnTab}`;

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={FaUserPlus} as="h1">
          {recruitment ? "Edit Recruitment Posting" : "Add New Recruitment Posting"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
          <input type="hidden" name="returnTab" value={returnTab} />

          <RecruitmentDetailsInputs recruitment={recruitment} />

          <FileUploadInput 
            label="Featured Image (Optional)" 
            name="image" 
            folder="announcements" 
            accept="image/*" 
            initialFileUrl={recruitment?.image}
            onUploadStatusChange={setIsUploading}
          />
          
          <FileUploadInput 
            label="Attach PDF (Optional)" 
            name="fileUrl" 
            folder="recruitments" 
            accept=".pdf" 
            initialFileUrl={recruitment?.fileUrl}
            onUploadStatusChange={setIsUploading}
          />
          <FormActions 
            isEditing={!!recruitment} 
            isSubmitting={isSubmitting}
            cancelHref={cancelUrl}
            createText="Recruitment"
            updateText="Recruitment"
          />
        </form>
      </div>
    </Section>
  );
}