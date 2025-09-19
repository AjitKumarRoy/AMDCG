"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createNewsTicker, updateNewsTicker } from "../../actions";
import { type NewsTicker as INewsTicker } from "@/types";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { Megaphone } from "lucide-react";
import { FormActions } from "@/components/ui/FormActions";
import toast from 'react-hot-toast';

export function NewsTickerForm({ item }: { item?: INewsTicker & { _id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTab = searchParams.get('returnTab') || 'news-ticker';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const action = item ? updateNewsTicker.bind(null, item._id) : createNewsTicker;
    
    const promise = action(formData);

    toast.promise(promise, {
      loading: item ? 'Updating item...' : 'Creating item...',
      success: 'Ticker item saved successfully!',
      error: (err) => err.message || 'Failed to save item.',
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
        <Title icon={Megaphone} as="h1">
          {item ? "Edit Ticker Item" : "Add New Ticker Item"}
        </Title>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-12 space-y-6 p-6 sm:p-8 rounded-2xl border border-slate-700 bg-black/20 backdrop-blur-md">
          <input type="hidden" name="returnTab" value={returnTab} />

          <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
            <label className="block text-base font-medium text-slate-200 font-heading">Ticker Details</label>
            <div className="space-y-6 pt-4 border-t border-slate-800">
              <div>
                <label htmlFor="text" className="block text-xs font-medium text-slate-400">Text <span className="text-red-500">*</span></label>
                <textarea id="text" name="text" defaultValue={item?.text} rows={3} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" required />
              </div>
              <div>
                <label htmlFor="link" className="block text-xs font-medium text-slate-400">Link (Optional)</label>
                <input id="link" name="link" type="url" defaultValue={item?.link} className="mt-1 block w-full bg-slate-800/50 rounded-md border-slate-700 px-3 py-2.5 text-sm" />
              </div>
            </div>
          </div>
          
          <FormActions 
            isEditing={!!item} 
            isSubmitting={isSubmitting}
            cancelHref={cancelUrl}
            createText="Item"
            updateText="Item"
          />
        </form>
      </div>
    </Section>
  );
}