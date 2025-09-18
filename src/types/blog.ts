export interface BlogPost {
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string; // Will store HTML from the rich text editor
  author: string;
  tags?: string[];
  isPublished?: boolean;
  publishedAt?: string;
}