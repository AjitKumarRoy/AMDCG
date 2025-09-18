"use client";

import Link from 'next/link';
import { useState, useRef } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button } from '@/components/ui/Button';
import { FileUploadInput } from '@/components/ui/FileUploadInput';
import toast from 'react-hot-toast';
import { Send, Loader, X } from 'lucide-react';

export function PhdApplicationForm({ onClose }: { onClose: () => void }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [cvUrl, setCvUrl] = useState("");
  const [sopUrl, setSopUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cvUrl || !sopUrl) {
      toast.error("Please upload both your CV and Statement of Purpose.");
      return;
    }
    setIsSubmitting(true);

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready. Please try again.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const recaptchaToken = await executeRecaptcha('phdSubmit');
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      
      const applicationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        bachelorsDegree: formData.get('bachelorsDegree'),
        mastersDegree: formData.get('mastersDegree'),
        qualifyingExam: formData.get('qualifyingExam'),
        cvUrl: cvUrl,
        statementOfPurposeUrl: sopUrl,
        recaptchaToken,
      };

      const response = await fetch('/api/applications/phd', {
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
        <label htmlFor="bachelorsDegree" className="block text-xs font-medium text-slate-400">Bachelor's Degree details <span className="text-red-500">*</span></label>
        <input id="bachelorsDegree" name="bachelorsDegree" type="text" placeholder="e.g., B.Tech in Mechanical Engg, 8.5 CGPA" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="mastersDegree" className="block text-xs font-medium text-slate-400">Master's Degree (if any)</label>
          <input id="mastersDegree" name="mastersDegree" type="text" placeholder="e.g., M.Tech in Materials Science" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="qualifyingExam" className="block text-xs font-medium text-slate-400">Qualifying Exam (GATE/NET etc.)</label>
          <input id="qualifyingExam" name="qualifyingExam" type="text" placeholder="e.g., GATE Score: 750" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
        </div>
      </div>
      
      <FileUploadInput 
        label="Upload CV (PDF)"
        name="cvUrl"
        folder="cvs/phd"
        accept=".pdf"
        onUploadStatusChange={setIsUploading}
        onUploadComplete={(data) => setCvUrl(data.url)}
      />

      <FileUploadInput 
        label="Upload Statement of Purpose (PDF)"
        name="statementOfPurposeUrl"
        folder="sops/phd"
        accept=".pdf"
        onUploadStatusChange={setIsUploading}
        onUploadComplete={(data) => setSopUrl(data.url)}
      />


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