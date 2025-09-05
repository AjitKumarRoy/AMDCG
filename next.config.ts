/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  // This generates a static HTML/CSS/JS folder named 'out'
  output: 'export',
  
  // This tells Next.js that your site will be in the /amdcg subdirectory
  // It automatically prefixes all links and asset paths correctly.
  basePath: '/amdcg',
};

module.exports = nextConfig;