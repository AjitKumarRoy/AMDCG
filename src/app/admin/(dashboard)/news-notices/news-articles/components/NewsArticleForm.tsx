"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createNewsArticle, updateNewsArticle } from "../../actions";
import { type NewsArticle as INewsArticle } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { Newspaper } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { NewsArticleDetailsInputs } from "./NewsArticleDetailsInputs";
import toast from 'react-hot-toast';

export function NewsArticleForm({ article }: { article?: INewsArticle & { _id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTab = searchParams.get('returnTab') || 'news-articles';
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
    const action = article ? updateNewsArticle.bind(null, article._id) : createNewsArticle;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: article ? 'Updating article...' : 'Creating article...',
      success: 'Article saved successfully!',
      error: (err) => err.message || 'Failed to save article.',
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
        <Title icon={Newspaper} as="h1">
          {article ? "Edit News Article" : "Add New News Article"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
          <input type="hidden" name="returnTab" value={returnTab} />

          <NewsArticleDetailsInputs article={article} />
          
          <FileUploadInput 
            label="Article Image" 
            name="image" 
            folder="news" 
            accept="image/*" 
            initialFileUrl={article?.image}
            onUploadStatusChange={setIsUploading}
          />
          <FormActions 
            isEditing={!!article} 
            isSubmitting={isSubmitting}
            cancelHref={cancelUrl}
            createText="News Article"
            updateText="News Article"
          />
        </form>
      </div>
    </Section>
  );
}