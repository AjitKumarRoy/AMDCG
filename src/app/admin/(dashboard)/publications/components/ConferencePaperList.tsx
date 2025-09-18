"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { deleteConferencePaper } from "../actions";
import { Pencil, Trash2, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { type ConferencePaper as IConferencePaper } from "@/types";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

type PaperWithId = IConferencePaper & { _id: string };

const ITEMS_PER_PAGE = 5;

export function ConferencePaperList({ papers }: { papers: PaperWithId[] }) {
  const [paperToDelete, setPaperToDelete] = useState<PaperWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteConfirm = async () => {
    if (paperToDelete) {
      await deleteConferencePaper(paperToDelete._id);
      setPaperToDelete(null);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(papers.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPapers = papers.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">All Conference Papers</h3>
          <p className="text-sm text-slate-400">Total: {papers.length} entries</p>
        </div>
        <Button href="/admin/publications/conference-papers/new" variant="primary" className="inline-flex">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Paper
        </Button>
      </div>
      
      <div className="rounded-lg border border-slate-800 overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-slate-800">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">No.</th>
              <th className="w-2/5 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Title</th>
              <th className="w-2/5 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Conference</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Year</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 divide-y divide-slate-800">
            {currentPapers.map((paper, index) => (
              <tr key={paper._id} className="hover:bg-slate-800/40 transition-colors align-top">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-white break-words border-r border-slate-800">
                  <Link
                    href={`/publications/conference-paper/${paper.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 hover:underline"
                  >
                    {paper.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400 break-words border-r border-slate-800">{paper.journalOrConference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{paper.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/publications/conference-papers/edit/${paper._id}`} className="inline-block p-2 rounded-full text-sky-400 hover:text-sky-300 hover:bg-sky-500/10" aria-label="Edit paper">
                      <Pencil className="h-5 w-5" />
                    </Link>
                    <button onClick={() => setPaperToDelete(paper)} className="inline-block p-2 rounded-full text-red-500 hover:text-red-400 hover:bg-red-500/10" aria-label="Delete paper">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        isOpen={!!paperToDelete}
        onClose={() => setPaperToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Conference Paper"
        message={`Are you sure you want to permanently delete "${paperToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}