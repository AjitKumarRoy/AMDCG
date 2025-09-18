"use client";

import Image from 'next/image';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { RenderPhotoProps } from "react-photo-album";

// Combine the types for clarity
type SortablePhotoProps = RenderPhotoProps & {
  photo: { id: string, title: string };
};

export function SortablePhoto({ photo, wrapperStyle, imageProps: { alt, title, sizes, className, onClick } }: SortablePhotoProps) {
  const { attributes, listeners, isDragging, setNodeRef, transform, transition } = useSortable({ id: photo.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...wrapperStyle,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group"
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        className={className}
        onClick={onClick}
      />
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 flex items-end p-2 ${
          isDragging ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <p className="text-white text-xs line-clamp-2">{photo.title}</p>
      </div>
    </div>
  );
}