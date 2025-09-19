import type { PageProps } from 'next';
import { ProjectForm } from "../../components/ProjectForm";
import dbConnect from "@/lib/dbConnect";
import { Project } from "@/lib/models";
import { type Project as IProject } from "@/types";

// Type for the project document from the DB
type ProjectDocument = IProject & { _id: string };

async function getProject(id: string): Promise<ProjectDocument> {
  await dbConnect();
  const project = await Project.findById(id);
  return JSON.parse(JSON.stringify(project));
}

export default async function EditProjectPage({ params }: PageProps<{ id: string }>) {
  const { id } = params;
  const project = await getProject(id);
  
  return <ProjectForm project={project} />;
}