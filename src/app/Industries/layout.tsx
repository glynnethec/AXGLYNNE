import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Enterprise AI Across Industries',
  description: 'Frontier AI solutions for enterprise: Custom model fine-tuning, autonomous MCP agent workflows, and data science across key industries.',
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
  },
  openGraph: {
    title: 'Enterprise AI Across Industries | AXGLYNNE',
    description: 'Custom AI research solutions optimizing enterprise operations, complex data matrices, and open-weights models across key sectors.',
    url: 'https://axglynne.com/Industries',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Industries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI Across Industries | AXGLYNNE',
    description: 'Custom AI research solutions optimizing enterprise operations, complex data matrices, and open-weights models.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Frontier AI Research & Process Optimization",
    "provider": {
      "@type": "Organization",
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
