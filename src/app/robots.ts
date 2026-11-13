import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/Panel',
        '/login',
        '/auth/',
        '/Create_you_GLYNNE_model',
        '/AX_chat',
        '/AX_voice',
        '/api/'
      ],
    },
    sitemap: 'https://axglynne.com/sitemap.xml',
  };
}
