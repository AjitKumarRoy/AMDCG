// Upload Image or Pdf's

"use client";

import { useState, useRef } from "react";
import Image from 'next/image';
import { UploadCloud, Loader, X, File as FileIcon } from "lucide-react";

interface FileUploadInputProps {
  label: string;
  name: string;
  folder: string;
  initialFileUrl?: string;
  accept?: string; // e.g., "image/*", ".pdf"
  onUploadStatusChange?: (isUploading: boolean) => void; 
  onUploadComplete?: (data: { url: string; width: number; height: number; }) => void;
}

export function FileUploadInput({ 
  label, 
  name,
  folder,
  initialFileUrl = "",
  accept = "image/*" ,
  onUploadStatusChange,
  onUploadComplete 
}: FileUploadInputProps) {
  const [fileUrl, setFileUrl] = useState(initialFileUrl);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onUploadStatusChange?.(true);;
    setIsUploading(true);
    setFileName(file.name); // Store the filename
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    
    if (data.success) {
      setFileUrl(data.url);
      onUploadComplete?.({ url: data.url, width: data.width, height: data.height });
    }

    onUploadStatusChange?.(false);
    setIsUploading(false);
  };
  
  // Check if the URL points to an image
  const isImage = fileUrl.match(/\.(jpeg|jpg|gif|png)$/) != null;

  // --- NEW LOGIC FOR DYNAMIC HELPER TEXT ---
  let fileTypeText = "File up to 10MB";
  if (accept === "image/*") {
    fileTypeText = "PNG, JPG, GIF up to 1MB";
  } else if (accept === ".pdf") {
    fileTypeText = "PDF up to 4MB";
  }

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-black/20 backdrop-blur-md space-y-4">
      <label className="block text-base font-medium text-slate-200 font-heading">{label}</label>
      
      <div className="relative flex items-center justify-center w-full h-48 rounded-lg border-2 border-dashed border-slate-600 hover:border-amber-500 transition-colors">
        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
            <Loader className="h-8 w-8 text-amber-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-300">Uploading...</p>
          </div>
        )}

        {!isUploading && fileUrl && (
          <>
            {isImage ? (
              <Image src={fileUrl} alt="Preview" fill className="object-contain p-2" />
            ) : (
              <div className="text-center text-slate-300">
                <FileIcon className="mx-auto h-12 w-12" />
                <p className="mt-2 text-sm font-semibold">File Uploaded</p>
                <p className="text-xs text-slate-400 truncate max-w-xs">{fileName || 'File ready'}</p>
              </div>
            )}
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFileUrl('');
                setFileName('');
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-full bg-red-600/80 text-white hover:bg-red-500 z-10"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        )}

        {!isUploading && !fileUrl && (
          <div className="text-center">
            <UploadCloud className="mx-auto h-10 w-10 text-slate-500" />
            <p className="mt-2 text-sm text-slate-400">
              <span className="font-semibold text-amber-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">{fileTypeText}</p>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileUpload} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
          accept={accept}
        />
      </div>
      
      <input type="hidden" name={name} value={fileUrl} />
    </div>
  );
}