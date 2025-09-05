export interface TeamMember {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  image: string;
  bio?: string; // The '?' makes this property optional
  featured?: boolean;
  type?: 'core' | 'student';
}

export interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage: string;
}