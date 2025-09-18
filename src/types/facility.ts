export interface Facility {
  name: string;
  category: 'Characterization' | 'Processing' | 'Testing' | 'Synthesis' | 'Computational';
  model?: string;
  image: string;
  images?: string[];
  description?: string;
  specifications?: string[];
  location?: string;
  status?: 'Operational' | 'Under Maintenance' | 'Coming Soon';
}