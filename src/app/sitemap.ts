import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://axglynne.com';

  // Explicit Tier 1, Tier 2, and Tier 3 priority hierarchy for Google Sitelinks & AI Search
  const routesWithPriority = [
    // TIER 1: Core Platform, Primary AI Tools, Catalogs & Flagship Enterprise Solutions
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/TrainModel', priority: 0.95, changeFrequency: 'daily' as const },
    { route: '/ia_vailable', priority: 0.95, changeFrequency: 'daily' as const },
    { route: '/Servex_solution', priority: 0.95, changeFrequency: 'weekly' as const },
    { route: '/models_provider', priority: 0.90, changeFrequency: 'daily' as const },
    { route: '/Librarymodel', priority: 0.90, changeFrequency: 'weekly' as const },

    // TIER 2: Technical Documentation, Architecture, Security & Leadership
    { route: '/Methodology', priority: 0.80, changeFrequency: 'monthly' as const },
    { route: '/docs', priority: 0.80, changeFrequency: 'weekly' as const },
    { route: '/Segurity', priority: 0.75, changeFrequency: 'monthly' as const },
    { route: '/servex_espesification', priority: 0.75, changeFrequency: 'monthly' as const },
    { route: '/CEO_GLYNNE', priority: 0.70, changeFrequency: 'monthly' as const },

    // TIER 2B: Secondary Institutional & Commercial Pages
    { route: '/Industries', priority: 0.65, changeFrequency: 'monthly' as const },
    { route: '/About', priority: 0.65, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.60, changeFrequency: 'monthly' as const },

    // TIER 3: Legal & Compliance Pages (Low priority to avoid Sitelinks cannibalization)
    { route: '/privacy-policy', priority: 0.20, changeFrequency: 'yearly' as const },
    { route: '/terms-of-service', priority: 0.20, changeFrequency: 'yearly' as const },
    { route: '/cookie-policy', priority: 0.20, changeFrequency: 'yearly' as const }
  ];

  return routesWithPriority.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority
  }));
}


