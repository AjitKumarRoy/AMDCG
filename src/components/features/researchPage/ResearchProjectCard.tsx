"use client";

import Image from 'next/image';
import Link from 'next/link';
import { type Project as IProject } from '@/types';
import { ArrowRight } from 'lucide-react';

type ProjectWithId = IProject & { _id: string; };

// Helper function to get themed status badges
const getStatusBadge = (status: string) => {
  let colorClass = "bg-slate-700 text-slate-200";
  switch (status) {
    case "Ongoing":
    case "Active":
      colorClass = "bg-green-800/50 text-green-300 border border-green-500/30";
      break;
    case "Completed":
      colorClass = "bg-sky-800/50 text-sky-300 border border-sky-500/30";
      break;
    case "On Hold":
      colorClass = "bg-red-800/50 text-red-300 border border-red-500/30";
      break;
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {status}
    </span>
  );
};


const placeholderImage = '/images/projects/placeholder_project.png';

export function ResearchProjectCard({ project }: { project: ProjectWithId }) {
  const imageUrl = project.image || placeholderImage;

  return (
    <Link 
      href={`/research/${project.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full w-full rounded-2xl border border-slate-800 bg-black/20 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1 flex flex-col group"
    >
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-lg">
        <Image src={imageUrl} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      
      <div className="flex-grow flex flex-col px-2">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white font-heading">{project.title}</h3>
          {getStatusBadge(project.status)}
        </div>
        
        <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow">
          {project.description}
        </p>

        {project.fields && project.fields.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.fields.slice(0, 3).map((field) => (
              <span key={field} className="rounded-full bg-slate-700/50 px-2 py-1 text-xs font-medium text-slate-300">
                {field}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto px-2">
        <div className="inline-flex items-center text-sky-400 font-semibold group-hover:text-amber-400 transition-colors">
          Read More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};