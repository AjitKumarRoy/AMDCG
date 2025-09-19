"use client";

import { useState, useRef } from "react";
import Image from 'next/image';
import { Loader, X, Plus } from "lucide-react";

interface GalleryInputProps {
  label: string;
  name: string;
  folder: string;
  initialImageUrls?: string[];
  onUploadStatusChange: (isUploading: boolean) => void;
}

export function GalleryInput({ 
  label, 
  name,
  folder,
  initialImageUrls = [],
  onUploadStatusChange
}: GalleryInputProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    onUploadStatusChange(true);

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.success ? data.url : null;
    });

    const newUrls = await Promise.all(uploadPromises);
    setImageUrls(prev => [...prev, ...newUrls.filter(Boolean)]);
    
    // Clear the file input's value after upload
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }

    setIsUploading(false);
    onUploadStatusChange(false);
  };
  
  const removeImage = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(imageUrls)} />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-lg border-2 border-slate-700 overflow-hidden">
            <Image src={url} alt={`Uploaded image ${index + 1}`} fill className="object-cover" />
            <button 
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center rounded-full bg-red-600/80 text-white hover:bg-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* --- REMOVED onClick from this div --- */}
        <div 
          className="relative aspect-square rounded-lg border-2 border-dashed border-slate-600 flex flex-col items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
        >
          {isUploading ? (
            <Loader className="h-8 w-8 animate-spin" />
          ) : (
            <>
              <Plus className="h-8 w-8" />
              <span className="text-xs mt-1">Add More</span>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef}
            multiple
            onChange={(e) => handleFilesUpload(e.target.files)} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
}