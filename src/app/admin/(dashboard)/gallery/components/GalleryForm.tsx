"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createGalleryImage, updateGalleryImage } from "../actions";
import { type GalleryImage as IGalleryImage } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { Images as ImagesIcon } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { GalleryDetailsInputs } from "./GalleryDetailsInput";
import toast from 'react-hot-toast';

export function GalleryForm({ image }: { image?: IGalleryImage & { _id: string } }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- NEW: State for image dimensions ---
  const [imageDimensions, setImageDimensions] = useState({
    width: image?.width || 0,
    height: image?.height || 0,
  });

  // --- NEW: A more powerful upload handler ---
  const handleUploadComplete = (data: { url: string, width: number, height: number }) => {
    setImageDimensions({ width: data.width, height: data.height });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) {
      toast.error("Please wait for the image to finish uploading.");
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const action = image ? updateGalleryImage.bind(null, image._id) : createGalleryImage;

    const promise = action(formData);

    toast.promise(promise, {
      loading: image ? 'Updating image...' : 'Uploading image...',
      success: 'Image saved successfully!',
      error: (err) => err.message || 'Failed to save image.',
    });

    try {
      await promise;
      setTimeout(() => {
        router.push('/admin/gallery');
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={ImagesIcon} as="h1">
          {image ? "Edit Gallery Image" : "Add New Gallery Image"}
        </Title>
        
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md"
        >

            {/* --- NEW: Hidden inputs for width and height --- */}
          <input type="hidden" name="width" value={imageDimensions.width} />
          <input type="hidden" name="height" value={imageDimensions.height} />


          <FileUploadInput 
            label="Upload Image" 
            name="image" 
            folder="gallery" 
            accept="image/*" 
            initialFileUrl={image?.image}
            onUploadStatusChange={setIsUploading}
            onUploadComplete={handleUploadComplete}
          />
          <GalleryDetailsInputs image={image} />
          <FormActions 
            isEditing={!!image} 
            isSubmitting={isSubmitting}
            cancelHref="/admin/gallery"
            createText="Image"
            updateText="Image"
          />
        </form>
      </div>
    </Section>
  );
}