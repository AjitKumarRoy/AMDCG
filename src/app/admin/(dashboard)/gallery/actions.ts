"use server";

import dbConnect from "@/lib/dbConnect";
import { GalleryImage } from "@/lib/models";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function createGalleryImage(formData: FormData) {
  try {
    await dbConnect();
    const newImage = {
      title: formData.get("title"),
      image: formData.get("image"),
      width: formData.get("width"),     
      height: formData.get("height"),    
      date: formData.get("date"),
    };
    await GalleryImage.create(newImage);
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    console.error("Failed to create gallery image.", error); // Log the original error
    throw new Error("Failed to create gallery image..");
  }
//   redirect("/admin/gallery");
}

export async function updateGalleryImage(id: string, formData: FormData) {
  try {
    await dbConnect();
    const updatedImage = {
      title: formData.get("title"),
      image: formData.get("image"),
      width: formData.get("width"),     
      height: formData.get("height"),  
      date: formData.get("date"),
    };
    await GalleryImage.findByIdAndUpdate(id, updatedImage);
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
  } catch (error: unknown) { // Use 'unknown' instead of 'any'
    console.error("Failed to update gallery image.", error); // Log the original error
    throw new Error("Failed to update gallery image.");
  }
//   redirect("/admin/gallery");
}

export async function deleteGalleryImage(id: string) {
  await dbConnect();
  await GalleryImage.findByIdAndDelete(id);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}