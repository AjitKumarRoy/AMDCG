"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createAnnouncement, updateAnnouncement } from "../../actions";
import { type Announcement as IAnnouncement } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FaBullhorn } from "react-icons/fa";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { AnnouncementDetailsInputs } from "./AnnouncementDetailsInputs";
import toast from 'react-hot-toast';

export function AnnouncementsForm({ announcement }: { announcement?: IAnnouncement & { _id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTab = searchParams.get('returnTab') || 'announcements';
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
    const action = announcement ? updateAnnouncement.bind(null, announcement._id) : createAnnouncement;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: announcement ? 'Updating announcement...' : 'Creating announcement...',
      success: 'Announcement saved successfully!',
      error: (err) => err.message || 'Failed to save announcement.',
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
        <Title icon={FaBullhorn} as="h1">
          {announcement ? "Edit Announcement" : "Add New Announcement"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
          <input type="hidden" name="returnTab" value={returnTab} />

          <AnnouncementDetailsInputs announcement={announcement} />


          <FileUploadInput 
            label="Featured Image (Optional)" 
            name="image" 
            folder="announcements" 
            accept="image/*" 
            initialFileUrl={announcement?.image}
            onUploadStatusChange={setIsUploading}
          />
          
          <FileUploadInput 
            label="Attach PDF (Optional)" 
            name="fileUrl" 
            folder="announcements" 
            accept=".pdf" 
            initialFileUrl={announcement?.fileUrl}
            onUploadStatusChange={setIsUploading}
          />
          <FormActions 
            isEditing={!!announcement} 
            isSubmitting={isSubmitting}
            cancelHref={cancelUrl}
            createText="Announcement"
            updateText="Announcement"
          />
        </form>
      </div>
    </Section>
  );
}