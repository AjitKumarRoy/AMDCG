"use client";

import { useState, useMemo } from 'react';
import { type Project as IProject } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { ResearchProjectCard } from './ResearchProjectCard';
import { NoItemsCard } from '@/components/ui/NoItemsCard';
import { FilterBar } from './FilterBar';
import { Button } from '@/components/ui/Button';



type ProjectWithId = IProject & { _id: string };

const ITEMS_PER_LOAD = 9; // Show 9 projects at a time


const pageBanner = '/images/pagesBanner/banner6.png';

export function ResearchPageClient({ projects }: { projects: ProjectWithId[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedField, setSelectedField] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // Create a unique list of all fields/tags from the projects
  const allFields = useMemo(() => {
    const fieldsSet = new Set<string>();
    projects.forEach(p => p.fields?.forEach(f => fieldsSet.add(f)));
    return ['All', ...Array.from(fieldsSet)];
  }, [projects]);

  // Filter the projects based on the search and dropdown selections
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      const matchesField = selectedField === 'All' || project.fields?.includes(selectedField);
      return matchesSearch && matchesStatus && matchesField;
    });
  }, [projects, searchQuery, selectedStatus, selectedField]);


   // --- NEW: Slice the filtered projects to only show the visible ones ---
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_LOAD);
  };

  return (
    <div>
      <PageHero 
        title="Research Projects"
        backgroundImage={pageBanner}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          allFields={allFields}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
        />

        {visibleProjects.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project) => (
              // --- 2. Use the new card here ---
              <ResearchProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <NoItemsCard 
            title="No Projects Found"
            message="No projects matched your current filters. Try adjusting your search."
          />
        )}

        {/* --- NEW: "Load More" button --- */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-12 text-center">
            <Button variant="primary" onClick={handleLoadMore}>
              Load More Projects
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}