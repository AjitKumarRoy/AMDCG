export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  link?: string; // Link to external source
  content?: string; // Full content for the dedicated page
}