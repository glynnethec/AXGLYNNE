import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Frontier AI & Data Science Labs',
    default: 'AI Process Optimization Across Enterprise Sectors',
  },
  description: 'Frontier AI solutions & research tailored for key enterprise sectors: AI process optimization, custom model indoctrination, specialized MCP agent protocols, and complex data science matrices.',
  keywords: [
    'AI for Enterprise Sectors',
    'AI Process Optimization',
    'Artificial Intelligence Operations',
    'Financial & BPO AI Systems',
    'Industry Custom AI Models',
    'Frontier AI Research for Enterprise',
    'Specialized MCP Agent Workflows',
    'AXGLYNNE Industries'
  ],
  alternates: {
    canonical: 'https://axglynne.com/Industries',
    languages: {
      'en-US': 'https://axglynne.com/Industries',
      'es-ES': 'https://axglynne.com/Industries',
      'es-MX': 'https://axglynne.com/Industries',
      'es-CO': 'https://axglynne.com/Industries',
      'x-default': 'https://axglynne.com/Industries',
    },
  },
  openGraph: {
    title: 'Industries & Complex AI Process Optimization | AXGLYNNE',
    description: 'Custom AI research solutions optimizing enterprise operations, complex data matrices, open-weights model deployment, and autonomous agent systems.',
    url: 'https://axglynne.com/Industries',
    siteName: 'AXGLYNNE Frontier AI Labs',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries & Enterprise AI Optimization | AXGLYNNE',
    description: 'Custom AI research solutions optimizing enterprise operations, complex data matrices, and open-weights model deployment across key sectors.',
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Frontier AI Research & Process Optimization",
    "provider": {
      "@type": "ResearchOrganization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Frontier AI Labs", "AXGLYNNE Data Science & AI Engineering"],
      "url": "https://axglynne.com"
    },
    "areaServed": ["US", "LATAM", "ES", "Global"],
    "description": "Artificial Intelligence research, custom model indoctrination, MCP agent integration, and complex process optimization for enterprise sectors."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
