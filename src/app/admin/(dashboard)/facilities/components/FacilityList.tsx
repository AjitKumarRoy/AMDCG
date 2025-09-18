"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { deleteFacility } from "../actions";
import { Pencil, Trash2, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { type Facility as IFacility } from "@/types";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

type FacilityWithId = IFacility & { _id: string };

const ITEMS_PER_PAGE = 10;

export function FacilityList({ facilities }: { facilities: FacilityWithId[] }) {
  const [facilityToDelete, setFacilityToDelete] = useState<FacilityWithId | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteConfirm = async () => {
    if (facilityToDelete) {
      await deleteFacility(facilityToDelete._id);
      setFacilityToDelete(null);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(facilities.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentFacilities = facilities.slice(indexOfFirstItem, indexOfLastItem);

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
          <h3 className="text-lg font-semibold text-white">All Facilities</h3>
          <p className="text-sm text-slate-400">Total: {facilities.length} entries</p>
        </div>
        <Button href="/admin/facilities/new" variant="primary" className="inline-flex">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Facility
        </Button>
      </div>
      
      <div className="rounded-lg border border-slate-800 overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-slate-800">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold border-r border-slate-800">No.</th>
              <th className="w-2/5 px-6 py-4 text-left text-sm font-semibold border-r border-slate-800">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold border-r border-slate-800">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold border-r border-slate-800">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 divide-y divide-slate-800">
            {currentFacilities.map((facility, index) => (
              <tr key={facility._id} className="hover:bg-slate-800/40 transition-colors align-middle">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-white break-words border-r border-slate-800">{facility.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{facility.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 border-r border-slate-800">{facility.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/facilities/edit/${facility._id}`} className="inline-block p-2 rounded-full text-sky-400 hover:text-sky-300 hover:bg-sky-500/10" aria-label="Edit facility">
                      <Pencil className="h-5 w-5" />
                    </Link>
                    <button onClick={() => setFacilityToDelete(facility)} className="inline-block p-2 rounded-full text-red-500 hover:text-red-400 hover:bg-red-500/10" aria-label="Delete facility">
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
        isOpen={!!facilityToDelete}
        onClose={() => setFacilityToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Facility"
        message={`Are you sure you want to permanently delete "${facilityToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}