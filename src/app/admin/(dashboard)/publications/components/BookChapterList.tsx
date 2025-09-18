"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { deleteBookChapter } from "../actions";
import { Pencil, Trash2, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { type BookChapter as IBookChapter } from "@/types";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

type ChapterWithId = IBookChapter & { _id: string };

const ITEMS_PER_PAGE = 5;

export function BookChapterList({ chapters }: { chapters: ChapterWithId[] }) {
  const [chapterToDelete, setChapterToDelete] = useState<ChapterWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteConfirm = async () => {
    if (chapterToDelete) {
      await deleteBookChapter(chapterToDelete._id);
      setChapterToDelete(null);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(chapters.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentChapters = chapters.slice(indexOfFirstItem, indexOfLastItem);

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
          <h3 className="text-lg font-semibold text-white">All Book Chapters</h3>
          <p className="text-sm text-slate-400">Total: {chapters.length} entries</p>
        </div>
        <Button href="/admin/publications/book-chapters/new" variant="primary" className="inline-flex">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Chapter
        </Button>
      </div>
      
      <div className="rounded-lg border border-slate-800 overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-slate-800">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">No.</th>
              <th className="w-2/5 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Title</th>
              <th className="w-2/5 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Book Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Year</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 divide-y divide-slate-800">
            {currentChapters.map((chapter, index) => (
              <tr key={chapter._id} className="hover:bg-slate-800/40 transition-colors align-top">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-white break-words border-r border-slate-800">
                  <Link
                    href={`/publications/book-chapter/${chapter.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 hover:underline"
                  >
                    {chapter.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400 break-words border-r border-slate-800">{chapter.journalOrConference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{chapter.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/publications/book-chapters/edit/${chapter._id}`} className="inline-block p-2 rounded-full text-sky-400 hover:text-sky-300 hover:bg-sky-500/10" aria-label="Edit chapter">
                      <Pencil className="h-5 w-5" />
                    </Link>
                    <button onClick={() => setChapterToDelete(chapter)} className="inline-block p-2 rounded-full text-red-500 hover:text-red-400 hover:bg-red-500/10" aria-label="Delete chapter">
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
        isOpen={!!chapterToDelete}
        onClose={() => setChapterToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Book Chapter"
        message={`Are you sure you want to permanently delete "${chapterToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}