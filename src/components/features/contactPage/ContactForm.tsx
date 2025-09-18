"use client";

import { useState, useRef } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { Send, Loader } from 'lucide-react';
import Link from 'next/link';

export function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha('contactSubmit');
      
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      
      const messageData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        recaptchaToken,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        formRef.current.reset(); // Reset the form on success
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-6 border border-white/10 rounded-2xl bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))]">
      <h3 className="text-xl font-bold text-white font-heading">Send us a Message</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-slate-400">Full Name <span className="text-red-500">*</span></label>
          <input id="name" name="name" type="text" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-slate-400">Email <span className="text-red-500">*</span></label>
          <input id="email" name="email" type="email" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-xs font-medium text-slate-400">Subject</label>
        <input id="subject" name="subject" type="text" className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-slate-400">Message <span className="text-red-500">*</span></label>
        <textarea id="message" name="message" rows={5} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
      </div>
      <div className="text-xs text-slate-500">
        This site is protected by reCAPTCHA and the Google
        <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300"> Privacy Policy </Link> 
        and
        <Link href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300"> Terms of Service </Link> 
        apply.
      </div>
      <div>
        <Button type="submit" variant="primary" className="inline-flex" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}