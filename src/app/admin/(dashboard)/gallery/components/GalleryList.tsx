"use client";

import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { deleteGalleryImage } from "../actions";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { type GalleryImage as IGalleryImage } from "@/types";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

type ImageWithId = IGalleryImage & { _id: string };

export function GalleryList({ images }: { images: ImageWithId[] }) {
  const [imageToDelete, setImageToDelete] = useState<ImageWithId | null>(null);

  const handleDeleteConfirm = async () => {
    if (imageToDelete) {
      await deleteGalleryImage(imageToDelete._id);
      setImageToDelete(null);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">All Images</h3>
          <p className="text-sm text-slate-400">Total: {images.length} entries</p>
        </div>
        <Button href="/admin/gallery/new" variant="primary" className="inline-flex">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Image
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image) => (
          <div key={image._id} className="relative aspect-square rounded-lg border border-slate-800 overflow-hidden group">
            <Image src={image.image} alt={image.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col p-2">
              <div className="flex-grow">
                <p className="text-xs text-white font-semibold line-clamp-2">{image.title}</p>
              </div>
              <div className="flex-shrink-0 flex items-center justify-end gap-1">
                <Link href={`/admin/gallery/edit/${image._id}`} className="p-1.5 rounded-full bg-sky-600/80 text-white hover:bg-sky-500">
                  <Pencil className="h-4 w-4" />
                </Link>
                <button onClick={() => setImageToDelete(image)} className="p-1.5 rounded-full bg-red-600/80 text-white hover:bg-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal 
        isOpen={!!imageToDelete}
        onClose={() => setImageToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Image"
        message={`Are you sure you want to permanently delete "${imageToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}