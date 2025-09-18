export interface Announcement {
  slug: string; // Required for the URL
  title: string;
  date: string;
  description?: string;
  externalLink?: string; // Optional external URL
  fileUrl?: string;      // Optional URL for a PDF from Cloudinary
  image?: string;
}