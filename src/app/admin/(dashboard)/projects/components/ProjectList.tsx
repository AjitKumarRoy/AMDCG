"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { deleteProject } from "../actions";
import { Pencil, Trash2, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { type Project as IProject } from "@/types";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

type ProjectWithId = IProject & { _id: string };

const ITEMS_PER_PAGE = 5;

export function ProjectList({ projects }: { projects: ProjectWithId[] }) {
  const [projectToDelete, setProjectToDelete] = useState<ProjectWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      await deleteProject(projectToDelete._id);
      setProjectToDelete(null);
    }
  };


  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">All Projects</h3>
          <p className="text-sm text-slate-400">Total: {projects.length} entries</p>
        </div>

        <Button href="/admin/projects/new" variant="primary" className="inline-flex">
          <PlusCircle className="h-5 w-5 mr-2" />
          Create New Project
        </Button>
      </div>
      
      {/* The overflow-x-auto is no longer needed on the container */}
      <div className="rounded-lg border border-slate-800 overflow-x-auto">
        <table className="min-w-[800px] w-full  divide-y divide-slate-800">
          <thead className="bg-slate-900">
            <tr>
              <th className="w-[6%] px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">
                <div className="flex items-center justify-center">
                  No.
                </div>
              </th>
              <th className="w-2/5 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">Title</th>
              <th className="w-[12%] px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">Status</th>
              <th className="w-[16%] px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">Start Date</th>
              <th className="w-[16%] px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">End Date</th>
              <th className="w-[10%] px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 divide-y divide-slate-800">
            {currentProjects.map((project, index) => (
              <tr key={project._id} className="hover:bg-slate-800/40 transition-colors align-middle">
                {/* REMOVED whitespace-nowrap and added break-words */}
                <td className="px-6 py-4 text-sm text-slate-400 border-r border-slate-800">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-white border-r border-slate-800 break-words">
                   <Link
                    href={`/research/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 hover:underline"
                  >
                    {project.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400 border-r border-slate-800">{project.status}</td>
                <td className="px-6 py-4 text-sm text-slate-400 border-r border-slate-800">{new Date(project.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-slate-400 border-r border-slate-800">
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : '—'}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Link 
                      href={`/admin/projects/edit/${project._id}`} 
                      className="inline-block p-2 rounded-full text-sky-400 transition-colors hover:text-sky-300 hover:bg-sky-500/10"
                      aria-label="Edit project"
                    >
                      <Pencil className="h-5 w-5" />
                    </Link>
                    <button 
                      onClick={() => setProjectToDelete(project)}
                      className="inline-block p-2 rounded-full text-red-500 transition-colors hover:text-red-400 hover:bg-red-300/10"
                      aria-label="Delete project"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION CONTROLS --- */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="secondary" onClick={handlePrevPage} disabled={currentPage === 1} className="inline-flex">
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <span className="text-sm text-slate-400">
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages} className="inline-flex">
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <ConfirmationModal 
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${projectToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}