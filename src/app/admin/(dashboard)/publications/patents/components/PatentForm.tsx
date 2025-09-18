"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPatent, updatePatent } from "../../actions";
import { type Patent as IPatent } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { BookText } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { AuthorInput } from "./AuthorInput";
import { PatentDetailsInputs } from "./PatentDetailsInputs";
import toast from 'react-hot-toast';

export function PatentForm({ patent }: { patent?: IPatent & { _id: string } }) {
  const router = useRouter();
    const searchParams = useSearchParams();
    const returnTab = searchParams.get('returnTab') || 'patents'; // get the returnTab from the URL
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authors, setAuthors] = useState(patent?.authors || []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) {
      toast.error("Please wait for the file to finish uploading.");
      return;
    }
    if (authors.length === 0) {
      toast.error("Please add at least one author.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const action = patent ? updatePatent.bind(null, patent._id) : createPatent;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: patent ? 'Updating patent...' : 'Creating patent...',
      success: 'Patent saved successfully!',
      error: (err) => err.message || 'Failed to save patent.',
    });
    
    try {
      await promise;
      setTimeout(() => { router.push(`/admin/publications?tab=${returnTab}`); }, 1000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const cancelUrl = `/admin/publications?tab=${returnTab}`;

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={BookText} as="h1">
          {patent ? "Edit Patent" : "Add New Patent"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
        {/* Add this hidden input to the form */}
          <input type="hidden" name="returnTab" value={returnTab} />

          <PatentDetailsInputs patent={patent} />
          <AuthorInput initialAuthors={patent?.authors} onAuthorsChange={setAuthors} />
          <FileUploadInput 
            label="Cover Image (Optional)" 
            name="image" 
            folder="publications/patents" 
            accept="image/*" 
            initialFileUrl={patent?.image}
            onUploadStatusChange={setIsUploading}
          />
          <FormActions 
            isEditing={!!patent} 
            isSubmitting={isSubmitting}
            cancelHref={cancelUrl}
            createText="Patent"
            updateText="Patent"
          />
        </form>
      </div>
    </Section>
  );
}