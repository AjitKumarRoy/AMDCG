"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from 'date-fns';
import { Button } from "@/components/ui/Button";
import { Pencil, Trash2, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { type BlogPost as IBlogPost } from "@/types";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { deleteBlogPost } from "../actions";

type PostWithId = IBlogPost & { _id: string };

const ITEMS_PER_PAGE = 10;

export function BlogList({ posts }: { posts: PostWithId[] }) {
  const [postToDelete, setPostToDelete] = useState<PostWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      await deleteBlogPost(postToDelete._id);
      setPostToDelete(null);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

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
          <h3 className="text-lg font-semibold text-white">All Posts</h3>
          <p className="text-sm text-slate-400">Total: {posts.length} entries</p>
        </div>
        <Button href="/admin/blog/new" variant="primary" className="inline-flex">
          <PlusCircle className="h-5 w-5 mr-2" />
          Create New Post
        </Button>
      </div>
      
      <div className="rounded-lg border border-slate-800 overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-slate-800">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">No.</th>
              <th className="w-3/5 px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300 uppercase border-r border-slate-800">Published On</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 divide-y divide-slate-800">
            {currentPosts.map((post, index) => (
              <tr key={post._id} className="hover:bg-slate-800/40">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-white break-words border-r border-slate-800">
                   <Link href={`/blog/${post.slug}`} target="_blank" className="hover:text-amber-400 hover:underline">
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-slate-800">
                  {post.isPublished ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-800/50 text-green-300">Published</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-700 text-slate-300">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-400 border-r border-slate-800">
                  {post.publishedAt ? format(new Date(post.publishedAt), 'PPP') : '—'}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/blog/edit/${post._id}`} className="p-2 rounded-full text-sky-400 hover:bg-sky-500/10">
                      <Pencil className="h-5 w-5" />
                    </Link>
                    <button onClick={() => setPostToDelete(post)} className="p-2 rounded-full text-red-500 hover:bg-red-500/10">
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
        isOpen={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post"
        message={`Are you sure you want to permanently delete "${postToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}