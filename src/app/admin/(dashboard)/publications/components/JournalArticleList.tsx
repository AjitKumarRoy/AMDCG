"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { deleteJournalArticle } from "../actions";
import { Pencil, Trash2, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { type JournalArticle as IJournalArticle } from "@/types";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

type ArticleWithId = IJournalArticle & { _id: string };

const ITEMS_PER_PAGE = 5;

export function JournalArticleList({ articles }: { articles: ArticleWithId[] }) {
  const [articleToDelete, setArticleToDelete] = useState<ArticleWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteConfirm = async () => {
    if (articleToDelete) {
      await deleteJournalArticle(articleToDelete._id);
      setArticleToDelete(null);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">All Journal Articles</h3>
          <p className="text-sm text-slate-400">Total: {articles.length} entries</p>
        </div>
        <Button href="/admin/publications/journal-articles/new" variant="primary" className="inline-flex">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Article
        </Button>
      </div>
      
      <div className="rounded-lg border border-slate-800 overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-slate-800">
          <thead className="bg-slate-900">
            <tr>
              <th className="w-16 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">No.</th>
              <th className="w-3/5 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">Title</th>
              <th className="w-1/5 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">Journal</th>
              <th className="w-24 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider border-r border-slate-800">Year</th>
              <th className="w-32 px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 divide-y divide-slate-800">
            {currentArticles.map((article, index) => (
              <tr key={article._id} className="hover:bg-slate-800/40 transition-colors align-top">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-white break-words border-r border-slate-800">
                  <Link
                    href={`/publications/journal-article/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 hover:underline"
                  >
                    {article.title}
                  </Link>
                </td>
                <td className="px-6 py-4  text-sm text-slate-400 break-words border-r border-slate-800">{article.journalOrConference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{article.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/publications/journal-articles/edit/${article._id}`} className="inline-block p-2 rounded-full text-sky-400 transition-colors hover:text-sky-300 hover:bg-sky-500/10" aria-label="Edit article">
                      <Pencil className="h-5 w-5" />
                    </Link>
                    <button onClick={() => setArticleToDelete(article)} className="inline-block p-2 rounded-full text-red-500 transition-colors hover:text-red-400 hover:bg-red-500/10" aria-label="Delete article">
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
        isOpen={!!articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Journal Article"
        message={`Are you sure you want to permanently delete "${articleToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}