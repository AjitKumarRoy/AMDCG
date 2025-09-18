"use server";

import dbConnect from "@/lib/dbConnect";
import { Facility } from "@/lib/models";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function createFacility(formData: FormData) {
  try {
    await dbConnect();
    const newFacility = {
      name: formData.get("name"),
      category: formData.get("category"),
      model: formData.get("model"),
      image: formData.get("image"),
      images: JSON.parse(formData.get("images") as string || '[]'),
      description: formData.get("description"),
      specifications: JSON.parse(formData.get("specifications") as string || '[]'),
      location: formData.get("location"),
      status: formData.get("status"),
    };
    await Facility.create(newFacility);
    revalidatePath("/admin/facilities");
    revalidatePath("/facilities");
  } catch (error: any) {
    throw new Error("Failed to create facility.");
  }
//   redirect("/admin/facilities");
}

export async function updateFacility(id: string, formData: FormData) {
  try {
    await dbConnect();
    const updatedFacility = {
      name: formData.get("name"),
      category: formData.get("category"),
      model: formData.get("model"),
      image: formData.get("image"),
      images: JSON.parse(formData.get("images") as string || '[]'),
      description: formData.get("description"),
      specifications: JSON.parse(formData.get("specifications") as string || '[]'),
      location: formData.get("location"),
      status: formData.get("status"),
    };
    await Facility.findByIdAndUpdate(id, updatedFacility);
    revalidatePath("/admin/facilities");
    revalidatePath("/facilities");
  } catch (error: any) {
    throw new Error("Failed to update facility.");
  }
//   redirect("/admin/facilities");
}

export async function deleteFacility(id: string) {
  await dbConnect();
  await Facility.findByIdAndDelete(id);
  revalidatePath("/admin/facilities");
  revalidatePath("/facilities");
}