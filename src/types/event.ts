export interface Event {
  slug: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  externalLink?: string;
  fileUrl?: string;
  image?: string;
}