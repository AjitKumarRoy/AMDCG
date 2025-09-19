"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createEvent, updateEvent } from "../../actions";
import { type Event as IEvent } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { CalendarDays } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import { FileUploadInput } from "@/components/ui/FileUploadInput";
import { EventDetailsInputs } from "./EventDetailsInputs";
import toast from 'react-hot-toast';

export function EventsForm({ event }: { event?: IEvent & { _id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTab = searchParams.get('returnTab') || 'events';
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUploading) {
      toast.error("Please wait for the file to finish uploading.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const action = event ? updateEvent.bind(null, event._id) : createEvent;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: event ? 'Updating event...' : 'Creating event...',
      success: 'Event saved successfully!',
      error: (err) => err.message || 'Failed to save event.',
    });
    
    try {
      await promise;
      setTimeout(() => { router.push(`/admin/news-notices?tab=${returnTab}`); }, 1000);
    } catch (error) {
      console.error("Error status:", error);
      setIsSubmitting(false);
    }
  };

  const cancelUrl = `/admin/news-notices?tab=${returnTab}`;

  return (
    <Section>
      <div className="w-full flex flex-col items-center">
        <Title icon={CalendarDays} as="h1">
          {event ? "Edit Event" : "Add New Event"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
          <input type="hidden" name="returnTab" value={returnTab} />

          <EventDetailsInputs event={event} />

          <FileUploadInput 
            label="Featured Image (Optional)" 
            name="image" 
            folder="announcements" 
            accept="image/*" 
            initialFileUrl={event?.image}
            onUploadStatusChange={setIsUploading}
          />
          
          <FileUploadInput 
            label="Attach Brochure (PDF, Optional)" 
            name="fileUrl" 
            folder="events" 
            accept=".pdf" 
            initialFileUrl={event?.fileUrl}
            onUploadStatusChange={setIsUploading}
          />
          <FormActions 
            isEditing={!!event} 
            isSubmitting={isSubmitting}
            cancelHref={cancelUrl}
            createText="Event"
            updateText="Event"
          />
        </form>
      </div>
    </Section>
  );
}