import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://research.iitbhilai.ac.in/amdcg';

  // List all your public pages for the AMDCG site
  const pages = [
    '/',
    '/about',
    '/team',
    '/research',
    '/publications',
    '/news-events',
    '/contact',
    '/facilities',
    '/gallery',
    '/carrers',
    '/blog',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = pages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '/' ? 1.0 : 0.8,
  }));

  return sitemapEntries;
}