"use client";

import { useMemo } from 'react';
import { Section } from '@/components/ui/Section';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import projectsData from '@/data/researchProjects/projects.json';
import { ArrowRight, Beaker, Inbox } from 'lucide-react'; 
import { Carousel } from '@/components/ui/Carousel1';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { NoItemsCard } from '@/components/ui/NoItemsCard';

export function LatestProjects() {
  // --- NEW LOGIC TO AUTOMATICALLY GET THE LATEST PROJECTS ---
  const featuredProjects = useMemo(() => {
    return projectsData.projects
      // 1. Filter for only active and ongoing projects
      .filter(project => project.status === 'Active' || project.status === 'Ongoing')
      // 2. Sort them by start date to get the newest first
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      // 3. Take the latest 20
      .slice(0, 20);
  }, []);

  return (
    <Section>
      <div className="flex items-center justify-between">
        <Title icon={Beaker} as="h2" className="mb-0">
          Our Innovations & Research Projects
        </Title>
        
        <span className="hidden md:inline-flex">
          <Button href="/research" variant="secondary">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        </span>
      </div>

      {featuredProjects.length > 0 ? (
        <Carousel>
          {/* Map over the new, filtered list of projects */}
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Carousel>
      ) : (
        <NoItemsCard 
          icon={Inbox}
          title="No Active Projects"
          message="New research projects will be featured here soon."
        />
      )}


      <div className="mt-20 text-center md:hidden">
        <Button href="/research" variant="secondary" className="inline-flex">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}