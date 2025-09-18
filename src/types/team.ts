export interface TeamMember {
  slug: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  affiliation: string;
  image: string;
  bio?: string;
  type: 'Core'| 'PostDoc' |'Phd' | 'M.Tech' | 'B.Tech' | 'Project Assistant' | 'Project Associate' | 'Intern';
  featured?: boolean;
  socialLinks?: {
    website?: string;
    researchGate?: string;
    googleScholar?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  contributions?: {
    project?: string;
    role?: string;
    years?: string;
    description?: string;
  }[];
  workingStatus?: string;
  yearsWorked?: string;
}
