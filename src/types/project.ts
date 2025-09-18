export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  link: string;
  status: 'Ongoing' | 'Completed' | 'Active' | 'On Hold';
   fields?: string[];
  startDate: string;
  endDate?: string;
  teamMembers?: {
    name: string;
    profileLink: string;
  }[];
  fundingAgency?: string; 
  fundValue?: string;  
}