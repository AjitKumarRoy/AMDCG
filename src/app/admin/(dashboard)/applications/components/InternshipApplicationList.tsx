"use client";

import { useState, useTransition, Fragment  } from "react";
import { format } from 'date-fns';
import { Button } from "@/components/ui/Button";
import { Download, ChevronDown, Mail, Phone, BookUser, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { type InternshipApplication as IInternshipApplication } from "@/types";
import { updateInternshipApplicationStatus } from "../actions";
import toast from "react-hot-toast";

type AppWithId = IInternshipApplication & { _id: string };

const ITEMS_PER_PAGE = 10;

export function InternshipApplicationList({ applications }: { applications: AppWithId[] }) {
  const [localApplications, setLocalApplications] = useState(applications); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const handleStatusChange = (appId: string, newStatus: boolean) => {
    // Optimistically update the UI
    setLocalApplications(prevApps => 
      prevApps.map(app => 
        app._id === appId ? { ...app, status: newStatus ? 'Reviewed' : 'Pending' } : app
      )
    );

    // Call the server action in the background
    startTransition(() => {
      const statusString = newStatus ? 'Reviewed' : 'Pending';
      toast.promise(
        updateInternshipApplicationStatus(appId, statusString),
        {
          loading: 'Updating status...',
          success: 'Status updated!',
          error: 'Failed to update status.',
        }
      );
    });
  };

   const handleToggleRow = (appId: string) => {
    setExpandedRowId(expandedRowId === appId ? null : appId);
  };

  // Pagination Logic
  const totalPages = Math.ceil(localApplications.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentApplications = applications.slice(indexOfFirstItem, indexOfLastItem);

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
          <h3 className="text-lg font-semibold text-white">All Internship Applications</h3>
          <p className="text-sm text-slate-400">Total: {applications.length} entries</p>
        </div>
      </div>
      
      <div className="rounded-lg border border-slate-800 overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-slate-800">
          <thead className="bg-slate-900">
            <tr>
              <th className="w-16 px-6 py-4 text-center border-r border-slate-800 text-amber-400">Reviewed</th>
              <th className="px-6 py-4 text-left border-r border-slate-800 text-amber-400">Applicant Name</th>
              <th className="px-6 py-4 text-left border-r border-slate-800 text-amber-400">University</th>
              <th className="px-6 py-4 text-left border-r border-slate-800 text-amber-400">Applied On</th>
              <th className="w-48 px-6 py-4 text-center text-amber-400">Details</th>
            </tr>
          </thead>
         <tbody className="bg-black/20 divide-y divide-slate-800">
            {currentApplications.map((app) => (
              <Fragment key={app._id}>
                <tr className={app.status === 'Reviewed' ? 'bg-slate-800/30' : ''}>
                  <td className="px-6 py-4 text-center border-r border-slate-800">
                    <input 
                    type="checkbox" 
                    checked={app.status === 'Reviewed'} 
                    onChange={(e) => handleStatusChange(app._id, e.target.checked)} 
                    disabled={isPending}
                    className="..." />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white border-r border-slate-800">{app.name}</td>
                  <td className="px-6 py-4  text-slate-400 break-words border-r border-slate-800">{app.university}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 border-r border-slate-800">{format(new Date(app.appliedAt), 'PPP')}</td>
                  <td className="px-6 py-4 text-center">
                    <Button onClick={() => handleToggleRow(app._id)} variant="secondary"  className="inline-flex">
                      <span>View Details</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedRowId === app._id ? 'rotate-180' : ''}`} />
                    </Button>
                  </td>
                </tr>
                {/* --- EXPANDABLE ROW --- */}
                {expandedRowId === app._id && (
                  <tr className="bg-slate-900/50">
                    <td colSpan={5} className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 text-slate-400"><Mail className="h-4 w-4"/> {app.email}</p>
                          {app.phone && <p className="flex items-center gap-2 text-slate-400"><Phone className="h-4 w-4"/> {app.phone}</p>}
                          <p className="flex items-center gap-2 text-slate-400"><BookUser className="h-4 w-4"/> Field: {app.fieldOfInterest}</p>
                          <Button  href={app.cvUrl} target="_blank" variant="primary"  className="inline-flex mt-2">
                            <Download className="h-4 w-4" />
                            <span>View CV</span>
                          </Button>
                        </div>
                        <div className="text-slate-400">
                          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-2"><FileText className="h-4 w-4"/> Cover Letter</p>
                          <p className="text-xs leading-relaxed italic border-l-2 border-slate-700 pl-3">{app.coverLetter || 'No cover letter provided.'}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
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
      
    </div>
  );
}