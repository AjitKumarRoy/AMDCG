"use server";

import dbConnect from "@/lib/dbConnect";
import { TeamMember } from "@/lib/models";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// Action to create a new team member
export async function createTeamMember(formData: FormData) {
    try {
            await dbConnect();
  
            const contributionsData = formData.get("contributions");

            const newMember = {
                name: formData.get("name"),
                slug: formData.get("slug"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                role: formData.get("role"),
                affiliation: formData.get("affiliation"),
                image: formData.get("image"),
                bio: formData.get("bio"),
                type: formData.get("type"),
                workingStatus: formData.get("workingStatus"),
                yearsWorked: formData.get("yearsWorked"),
                socialLinks: {
                website: formData.get("website"),
                linkedin: formData.get("linkedin"),
                googleScholar: formData.get("googleScholar"),
                researchGate: formData.get("researchGate"),
                twitter: formData.get("twitter"),
                github: formData.get("github"),
                },
                // Get and parse the contributions JSON string
                contributions: contributionsData ? JSON.parse(contributionsData as string) : [],
            };

            await TeamMember.create(newMember);
            
            revalidatePath("/admin/team");
            //   redirect("/admin/team");
    } catch (error: any) {
    // Check for the specific MongoDB duplicate key error code
    if (error.code === 11000) {
      // Throw a new, user-friendly error
      throw new Error("A team member with this slug or email already exists.");
    }
    // For any other errors, throw a generic message
    throw new Error("Failed to create team member.");
  }
}

// Action to update an existing team member
export async function updateTeamMember(id: string, formData: FormData) {
  try {
    await dbConnect();
  
    const contributionsData = formData.get("contributions");

    const updatedMember = {
        name: formData.get("name"),
        slug: formData.get("slug"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        role: formData.get("role"),
        affiliation: formData.get("affiliation"),
        image: formData.get("image"),
        bio: formData.get("bio"),
        type: formData.get("type"),
        workingStatus: formData.get("workingStatus"),
        yearsWorked: formData.get("yearsWorked"),
        socialLinks: {
        website: formData.get("website"),
        linkedin: formData.get("linkedin"),
        googleScholar: formData.get("googleScholar"),
        researchGate: formData.get("researchGate"),
        twitter: formData.get("twitter"),
        github: formData.get("github"),
        },
        contributions: contributionsData ? JSON.parse(contributionsData as string) : [],
    };

    await TeamMember.findByIdAndUpdate(id, updatedMember);

    revalidatePath("/admin/team");
    revalidatePath("/team");        // Revalidate the public team page
      if (updatedMember.slug) {
        revalidatePath(`/team/${updatedMember.slug}`); // Revalidate the specific teams's slug page
      }
    //   redirect("/admin/team");
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("A team member with this slug or email already exists.");
    }
    throw new Error("Failed to update team member.");
  }
}

// Action to delete a team member
export async function deleteTeamMember(id: string) {
  await dbConnect();
  await TeamMember.findByIdAndDelete(id);
  revalidatePath("/admin/team");
}