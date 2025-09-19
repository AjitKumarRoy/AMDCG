"use server";

import dbConnect from "@/lib/dbConnect";
import { ContactMessage } from "@/lib/models";
import { revalidatePath } from "next/cache";

export async function updateMessageStatus(id: string, status: string) {
  try {
    await dbConnect();
    await ContactMessage.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/messages");
  } catch (error) {
    console.error("Error status:", error);
    throw new Error("Failed to update message status.");
  }
}