// Main page to display the project list


import { Title } from "@/components/ui/Title";
import dbConnect from "@/lib/dbConnect";
import { Project } from "@/lib/models";
import { ProjectList } from "./components/ProjectList";

async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ startDate: -1 });
  // Convert documents to plain objects
  return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <Title as="h1">Manage Projects</Title>
      <p className="mt-2 text-slate-400">Add, edit, and remove research projects.</p>
      <ProjectList projects={projects} />
    </div>
  );
}