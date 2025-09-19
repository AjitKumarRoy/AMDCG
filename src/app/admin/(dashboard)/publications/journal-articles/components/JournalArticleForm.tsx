"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createJournalArticle, updateJournalArticle } from "../../actions";
import { type JournalArticle as IJournalArticle } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { BookText } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { AuthorInput } from "./AuthorInput";
import { JournalArticleDetailsInputs } from "./JournalArticleDetailsInputs";
import toast from 'react-hot-toast';

export function JournalArticleForm({ article }: { article?: IJournalArticle & { _id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTab = searchParams.get('returnTab') || 'journal-articles'; // get the returnTab from the URL
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

   const [authors, setAuthors] = useState(article?.authors || []);
   const cancelUrl = `/admin/publications?tab=${returnTab}`;

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
    const action = article ? updateJournalArticle.bind(null, article._id) : createJournalArticle;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: article ? 'Updating article...' : 'Creating article...',
      success: 'Article saved successfully!',
      error: (err) => err.message || 'Failed to save article.',
    });
    
    try {
      await promise;
      setTimeout(() => { router.push(`/admin/publications?tab=${returnTab}`); }, 1000);  // use it in redirect
    } catch (error) {
      console.error("Error status:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={BookText} as="h1">
          {article ? "Edit Journal Article" : "Add New Journal Article"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
         {/* Add this hidden input to the form */}
          <input type="hidden" name="returnTab" value={returnTab} />

          <JournalArticleDetailsInputs article={article} />
          <AuthorInput initialAuthors={article?.authors} onAuthorsChange={setAuthors} />
          <FileUploadInput 
            label="Cover Image (Optional)" 
            name="image" 
            folder="publications/journal-articles" 
            accept="image/*" 
            initialFileUrl={article?.image}
            onUploadStatusChange={setIsUploading}
          />
          <FormActions 
            isEditing={!!article} 
            isSubmitting={isSubmitting}
            cancelHref={cancelUrl}
            createText="Journal Article"
            updateText="Journal Article"
          />
        </form>
      </div>
    </Section>
  );
}