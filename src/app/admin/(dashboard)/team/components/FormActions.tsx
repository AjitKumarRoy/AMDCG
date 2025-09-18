"use client";
import { Button } from "@/components/ui/Button";
import { Save, X, Loader } from "lucide-react";

export function FormActions({ isEditing, isSubmitting }: { isEditing: boolean; isSubmitting: boolean; }) {
  const isDisabled = isSubmitting;

  return (
    <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
      <Button type="submit" variant="primary" className="inline-flex" disabled={isDisabled}>
        {isSubmitting ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            <span>{isEditing ? "Updating..." : "Creating..."}</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>{isEditing ? "Update Member" : "Create Member"}</span>
          </>
        )}
      </Button>
      <Button  href="/admin/team" variant="secondary" className={isDisabled ? 'pointer-events-none opacity-50' : ''}>
        <X className="h-4 w-4" />
        <span>Cancel</span>
      </Button>
    </div>
  );
}