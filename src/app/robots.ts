import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/Panel',
        '/api/'
      ],
    },
    sitemap: 'https://axglynne.com/sitemap.xml',
  };
}
