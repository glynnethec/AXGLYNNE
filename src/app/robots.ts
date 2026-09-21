import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Evitar que indexen las rutas de la API directamente
    },
    sitemap: 'https://axglynne.com/sitemap.xml',
  };
}
