import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/Panel',
        '/login',
        '/AX_chat',
        '/AX_voice',
        '/models_provider',
        '/Create_you_GLYNNE_model',
        '/Librarymodel',
        '/api/'
      ],
    },
    sitemap: 'https://axglynne.com/sitemap.xml',
  };
}
