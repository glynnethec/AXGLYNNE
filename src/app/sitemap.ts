import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://axglynne.com';

  // Explicit priority order for Google Sitelinks indexing
  const routesWithPriority = [
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/TrainModel', priority: 0.95, changeFrequency: 'daily' as const },
    { route: '/About', priority: 0.90, changeFrequency: 'weekly' as const },
    { route: '/Librarymodel', priority: 0.88, changeFrequency: 'daily' as const },
    { route: '/ia_vailable', priority: 0.85, changeFrequency: 'daily' as const },
    { route: '/Servex_solution', priority: 0.80, changeFrequency: 'weekly' as const },
    { route: '/Methodology', priority: 0.70, changeFrequency: 'monthly' as const },
    { route: '/CEO_GLYNNE', priority: 0.65, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.60, changeFrequency: 'monthly' as const },
    { route: '/cookie-policy', priority: 0.20, changeFrequency: 'yearly' as const },
    { route: '/privacy-policy', priority: 0.20, changeFrequency: 'yearly' as const },
    { route: '/terms-of-service', priority: 0.20, changeFrequency: 'yearly' as const }
  ];

  return routesWithPriority.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority
  }));
}


