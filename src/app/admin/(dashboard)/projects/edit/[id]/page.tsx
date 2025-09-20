import { ProjectForm } from "../../components/ProjectForm";
import dbConnect from "@/lib/dbConnect";
import { Project } from "@/lib/models";
import { type Project as IProject } from "@/types";

type PageProps = {
  params: Promise<{ id: string }>;
};


// Type for the project document from the DB
type ProjectDocument = IProject & { _id: string };

async function getProject(id: string): Promise<ProjectDocument> {
  await dbConnect();
  const project = await Project.findById(id);
  return JSON.parse(JSON.stringify(project));
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);
  
  return <ProjectForm project={project} />;
}