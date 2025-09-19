"use client";
import { Button } from "@/components/ui/Button";
import { Save, X, Loader } from "lucide-react";

interface FormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  cancelHref: string;
  createText?: string;
  updateText?: string;
}

export function FormActions({ 
  isEditing, 
  isSubmitting, 
  cancelHref,
  createText = "Create",
  updateText = "Update"
}: FormActionsProps) {
  const isDisabled = isSubmitting;

  return (
    <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
      <Button type="submit" variant="primary" className="inline-flex" disabled={isDisabled}>
        {isSubmitting ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            <span>{isEditing ? `Updating ${updateText}...` : `Creating ${createText}...`}</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>{isEditing ? `Update ${updateText}` : `Create ${createText}`}</span>
          </>
        )}
      </Button>
      
      <Button href={cancelHref} variant="secondary" className={isDisabled ? 'pointer-events-none opacity-50' : ''}>
        <X className="h-4 w-4" />
        <span>Cancel</span>
      </Button>
    </div>
  );
}