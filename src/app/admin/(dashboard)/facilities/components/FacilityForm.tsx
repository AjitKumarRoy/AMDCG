"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFacility, updateFacility } from "../actions";
import { type Facility as IFacility } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { Wrench } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { FacilityDetailsInputs } from "./FacilityDetailsInputs";
import { SpecificationInput } from "./SpecificationInput";
import toast from 'react-hot-toast';
import { GalleryInput } from "@/components/ui/GalleryInput";

export function FacilityForm({ facility }: { facility?: IFacility & { _id: string } }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) {
      toast.error("Please wait for all images to finish uploading.");
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const action = facility ? updateFacility.bind(null, facility._id) : createFacility;

    const promise = action(formData);

    toast.promise(promise, {
      loading: facility ? 'Updating facility...' : 'Creating facility...',
      success: 'Facility saved successfully!',
      error: (err) => err.message || 'Failed to save facility.',
    });

    try {
      await promise;
      setTimeout(() => {
        router.push('/admin/facilities');
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={Wrench} as="h1">
          {facility ? "Edit Facility" : "Add New Facility"}
        </Title>
        
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md"
        >
          <FacilityDetailsInputs facility={facility} />
          
          <SpecificationInput initialSpecs={facility?.specifications} />

          <FileUploadInput 
            label="Main Facility Image" 
            name="image" 
            folder="facilities" 
            accept="image/*" 
            initialFileUrl={facility?.image}
            onUploadStatusChange={setIsUploading}
          />
          
          <GalleryInput
            label="Additional Images (for Carousel)"
            name="images"
            folder="facilities/gallery"
            initialImageUrls={facility?.images}
            onUploadStatusChange={setIsUploading}
          />

          <FormActions 
            isEditing={!!facility} 
            isSubmitting={isSubmitting}
            cancelHref="/admin/facilities"
            createText="Facility"
            updateText="Facility"
          />
        </form>
      </div>
    </Section>
  );
}