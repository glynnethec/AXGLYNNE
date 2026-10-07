import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://axglynne.com';

  const publicRoutes = [
    '',
    '/About',
    '/Servex_solution',
    '/Industries',
    '/ia_vailable',
    '/Methodology',
    '/contact',
    '/cookie-policy',
    '/privacy-policy',
    '/terms-of-service',
    '/login'
  ];

  return publicRoutes.map((route) => {
    let priority = 0.7;
    if (route === '') priority = 1.0;
    else if (['/Servex_solution', '/ia_vailable', '/Industries'].includes(route)) priority = 0.9;
    else if (route.includes('/policy') || route.includes('terms')) priority = 0.3;

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority
    };
  });
}
