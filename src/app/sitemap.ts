import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smart25.org'; // Replace with your domain

  // List all your public pages here
  const pages = [
    '/',
    '/about',
    '/important-dates',
    '/call-for-papers',
    '/paper-submission',
    '/committee',
    '/speakers',
    '/registration',
    '/schedule',
    '/venue',
    '/contact',
    '/payment-details',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = pages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly', // How often the content might change
    priority: page === '/' ? 1.0 : 0.8, // Homepage is highest priority
  }));

  return sitemapEntries;
}