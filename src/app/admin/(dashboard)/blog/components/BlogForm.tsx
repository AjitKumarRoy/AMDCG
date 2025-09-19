"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'; 
import { createBlogPost, updateBlogPost } from "../actions";
import { type BlogPost as IBlogPost } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FormActions } from "@/components/ui/FormActions";
import { TagInput } from "./TagInput";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
// import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { BlogDetailsInputs } from "./BlogDetailsInputs";
import toast from 'react-hot-toast';
import { BookText } from "lucide-react";


// 2. Dynamically import the RichTextEditor with SSR turned off
const RichTextEditor = dynamic(
  () => import('@/components/ui/RichTextEditor').then(mod => mod.RichTextEditor),
  { 
    ssr: false,
    loading: () => <div className="h-[300px] w-full rounded-lg border border-slate-700 bg-slate-800/50 animate-pulse" />
  }
);

export function BlogForm({ post }: { post?: IBlogPost & { _id: string } }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState(post?.content || '');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) {
      toast.error("Please wait for the image to finish uploading.");
      return;
    }
    // Check if content is empty (Tiptap's default empty state is <p></p>)
    if (!content || content === '<p></p>') {
      toast.error("The blog post content cannot be empty.");
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    formData.set('content', content);

    const action = post ? updateBlogPost.bind(null, post._id) : createBlogPost;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: post ? 'Updating post...' : 'Creating post...',
      success: 'Blog post saved successfully!',
      error: (err) => err.message || 'Failed to save post.',
    });
    
    try {
      await promise;
      setTimeout(() => { router.push('/admin/blog'); }, 1000);
    } catch (error) {
      console.error("Error status:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={BookText} as="h1">
          {post ? "Edit Blog Post" : "Create New Blog Post"}
        </Title>
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mt-12 space-y-6  p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
          <BlogDetailsInputs post={post} />
          
          <TagInput label="Tags" name="tags" initialTags={post?.tags} />
          
          
          <FileUploadInput 
            label="Featured Image" 
            name="image" 
            folder="blog" 
            accept="image/*"
            initialFileUrl={post?.image}
            onUploadStatusChange={setIsUploading}
          />

          <div>
            <label className="block text-base font-medium text-slate-200 font-heading mb-2">Content <span className="text-red-500">*</span></label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-700 bg-black/20">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              defaultChecked={post?.isPublished ?? false}
              className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-amber-500 focus:ring-amber-500"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-slate-300">Publish this post</label>
          </div>

          <FormActions 
            isEditing={!!post} 
            isSubmitting={isSubmitting}
            cancelHref="/admin/blog"
            createText="Post"
            updateText="Post"
          />
        </form>
      </div>
    </Section>
  );
}