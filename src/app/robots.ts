import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // This rule applies to all bots
      allow: '/',      // Allow crawling of all pages
      disallow: '/private/', // Example: block a specific folder
    },
    sitemap: 'https://smart25.org/sitemap.xml', // Location of your sitemap
  };
}