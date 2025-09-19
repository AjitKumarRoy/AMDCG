"use server";

import dbConnect from "@/lib/dbConnect";
import { InternshipApplication, PositionApplication, PhdApplication  } from "@/lib/models";
import { revalidatePath } from "next/cache";





export async function updateInternshipApplicationStatus(id: string, status: string) {
  try {
    await dbConnect();
    await InternshipApplication.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/applications");
  } catch (error) {
    console.error("Error status:", error);
    throw new Error("Failed to update application status.");
  }
}

export async function updatePositionApplicationStatus(id: string, status: string) {
  try {
    await dbConnect();
    await PositionApplication.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/applications");
  } catch (error) {
    console.error("Error status:", error);
    throw new Error("Failed to update application status.");
  }
}


export async function updatePhdApplicationStatus(id: string, status: string) {
  try {
    await dbConnect();
    await PhdApplication.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/applications");
  } catch (error) {
    console.error("Error status:", error);
    throw new Error("Failed to update application status.");
  }
}



// export async function deleteInternshipApplication(id: string) {
//   try {
//     await dbConnect();
//     await InternshipApplication.findByIdAndDelete(id);
//     revalidatePath("/admin/applications");
//   } catch (error) {
//     throw new Error("Failed to delete application.");
//   }
// }