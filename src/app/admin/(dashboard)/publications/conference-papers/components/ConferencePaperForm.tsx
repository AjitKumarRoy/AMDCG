"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createConferencePaper, updateConferencePaper } from "../../actions";
import { type ConferencePaper as IConferencePaper } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { BookText } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { AuthorInput } from "./AuthorInput";
import { ConferencePaperDetailsInputs } from "./ConferencePaperDetailsInputs";
import toast from 'react-hot-toast';

export function ConferencePaperForm({ paper }: { paper?: IConferencePaper & { _id: string } }) {
  const router = useRouter();
    const searchParams = useSearchParams();
    const returnTab = searchParams.get('returnTab') || 'conference-papers'; // get the returnTab from the URL
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authors, setAuthors] = useState(paper?.authors || []);

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
    const action = paper ? updateConferencePaper.bind(null, paper._id) : createConferencePaper;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: paper ? 'Updating paper...' : 'Creating paper...',
      success: 'Paper saved successfully!',
      error: (err) => err.message || 'Failed to save paper.',
    });
    
    try {
      await promise;
      setTimeout(() => { router.push(`/admin/publications?tab=${returnTab}`); }, 1000);
    } catch (error) {
      console.error("Error status:", error);
      setIsSubmitting(false);
    }
  };

  const cancelUrl = `/admin/publications?tab=${returnTab}`;

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={BookText} as="h1">
          {paper ? "Edit Conference Paper" : "Add New Conference Paper"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
        {/* Add this hidden input to the form */}
          <input type="hidden" name="returnTab" value={returnTab} />

          <ConferencePaperDetailsInputs paper={paper} />
          <AuthorInput initialAuthors={paper?.authors} onAuthorsChange={setAuthors} />
          <FileUploadInput 
            label="Cover Image (Optional)" 
            name="image" 
            folder="publications/conference-papers" 
            accept="image/*" 
            initialFileUrl={paper?.image}
            onUploadStatusChange={setIsUploading}
          />
          <FormActions 
            isEditing={!!paper} 
            isSubmitting={isSubmitting}
            cancelHref={cancelUrl}
            createText="Conference Paper"
            updateText="Conference Paper"
          />
        </form>
      </div>
    </Section>
  );
}