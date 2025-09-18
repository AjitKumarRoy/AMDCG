//  Your backend logic (Server Actions)

"use server";

import dbConnect from "@/lib/dbConnect";
import { Project } from "@/lib/models";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// Action to create a new project
export async function createProject(formData: FormData) {
  await dbConnect();
  const fieldsData = formData.get("fields");

  const newProject = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    image: formData.get("image"),
    link: formData.get("link"),
    description: formData.get("description"),
    status: formData.get("status"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || null,  // Get endDate, but only if it's not an empty string
    teamMembers: JSON.parse(formData.get("teamMembers") as string),  // Get and parse the team members JSON string
    fields: fieldsData ? JSON.parse(fieldsData as string) : [],
    fundingAgency: formData.get("fundingAgency"),  
    fundValue: formData.get("fundValue"),        
  };

  await Project.create(newProject);
  
  revalidatePath("/admin/projects"); // Refresh the list page
//   redirect("/admin/projects"); // Go back to the list page
}

// Action to update an existing project
export async function updateProject(id: string, formData: FormData) {
  await dbConnect();
  const fieldsData = formData.get("fields");
  
  const updatedProject = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    image: formData.get("image"),
    link: formData.get("link"),
    description: formData.get("description"),
    status: formData.get("status"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || null,
    teamMembers: JSON.parse(formData.get("teamMembers") as string),
    fields: fieldsData ? JSON.parse(fieldsData as string) : [],
    fundingAgency: formData.get("fundingAgency"),  
    fundValue: formData.get("fundValue"),   
  };

  await Project.findByIdAndUpdate(id, updatedProject);

  revalidatePath("/admin/projects");
  revalidatePath("/research");        // Revalidate the public research page
  if (updatedProject.slug) {
    revalidatePath(`/research/${updatedProject.slug}`); // Revalidate the specific project's slug page
  }
//   redirect("/admin/projects");
}

// Action to delete a project
export async function deleteProject(id: string) {
  await dbConnect();
  await Project.findByIdAndDelete(id);
  revalidatePath("/admin/projects");
}