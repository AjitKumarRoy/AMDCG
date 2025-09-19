"use client";

import Link from 'next/link';
import { useState, useRef } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button } from '@/components/ui/Button';
import { FileUploadInput } from '@/components/ui/FileUploadInput';
import toast from 'react-hot-toast';
import { Send, Loader, X } from 'lucide-react';

export function PositionApplicationForm({ onClose }: { onClose: () => void }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [cvUrl, setCvUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cvUrl) {
      toast.error("Please upload your CV before submitting.");
      return;
    }
    setIsSubmitting(true);

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready. Please try again.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const recaptchaToken = await executeRecaptcha('positionSubmit');
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      
      const applicationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        highestQualification: formData.get('highestQualification'),
        currentPosition: formData.get('currentPosition'),
        coverLetter: formData.get('coverLetter'),
        cvUrl: cvUrl,
        recaptchaToken,
      };

      const response = await fetch('/api/applications/position', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        toast.success("Application submitted successfully!");
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error status:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-slate-400">Full Name <span className="text-red-500">*</span></label>
        <input id="name" name="name" type="text" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-slate-400">Email <span className="text-red-500">*</span></label>
          <input id="email" name="email" type="email" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-slate-400">Phone (Optional)</label>
          <input id="phone" name="phone" type="tel" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label htmlFor="highestQualification" className="block text-xs font-medium text-slate-400">Highest Qualification <span className="text-red-500">*</span></label>
        <input id="highestQualification" name="highestQualification" type="text" placeholder="e.g., M.Tech in Materials Science" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
      </div>

      <div>
        <label htmlFor="currentPosition" className="block text-xs font-medium text-slate-400">Current Position (Optional)</label>
        <input id="currentPosition" name="currentPosition" type="text" placeholder="e.g., Research Fellow at DRDO" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
      </div>
      
      <FileUploadInput 
        label="Upload CV (PDF)"
        name="cvUrl"
        folder="cvs/positions"
        accept=".pdf"
        onUploadStatusChange={setIsUploading}
        onUploadComplete={(data) => setCvUrl(data.url)}
      />
      
      <div>
        <label htmlFor="coverLetter" className="block text-xs font-medium text-slate-400">Cover Letter (Optional)</label>
        <textarea id="coverLetter" name="coverLetter" rows={5} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
      </div>

      {/* --- ADD THE reCAPTCHA NOTICE HERE --- */}
      <div className="text-xs text-slate-500">
        This site is protected by reCAPTCHA and the Google
        <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300"> Privacy Policy </Link> 
        and
        <Link href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300"> Terms of Service </Link> 
        apply.
      </div>
      
      <div className="pt-4 flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onClose} className="inline-flex">
          <X className="h-4 w-4" />
          <span>Cancel</span>
        </Button>
        <Button type="submit" variant="primary" className="inline-flex" disabled={isSubmitting || isUploading}>
          {isSubmitting ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Application</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}