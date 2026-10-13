import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Enterprise AI Solutions & SERVEX',
  description: 'Enterprise AI infrastructure for SERVEX: Automated XML matrix conversion (CET Designer), structured data pipelines, and autonomous execution.',
  keywords: [
    'Automated XML Catalog Processing',
    'CET Designer XML Matrix Converter',
    'Complex XML Schema Parsing',
    'SERVEX AI Case Study',
    'Autonomous Data Ecosystem',
    'XML to Structured Data Converters',
    'Autonomous Data Processing Pipeline',
    'Custom AI Ecosystem SERVEX',
    'AXGLYNNE Solutions'
  ],
  alternates: {
    canonical: 'https://axglynne.com/Servex_solution',
  },
  openGraph: {
    title: 'Enterprise AI Solutions & SERVEX | AXGLYNNE',
    description: 'AI research infrastructure for automated conversion of complex XML catalogs (CET Designer) and autonomous execution of corporate workflows.',
    url: 'https://axglynne.com/Servex_solution',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Solutions SERVEX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI Solutions & SERVEX | AXGLYNNE',
    description: 'Enterprise AI ecosystem for SERVEX: Automated XML matrix converters (CET Designer) and structured pipelines.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "AI Ecosystem & Complex XML Catalog Automation for SERVEX",
    "name": "Enterprise AI Solutions & XML Matrix Conversion",
    "description": "Engineering solution developed for SERVEX: AI model integration for reading, converting, and autonomously updating highly complex XML catalogs (CET Designer), transforming schemas into structured data and executing automated analytics without manual user intervention.",
    "url": "https://axglynne.com/Servex_solution",
    "author": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Frontier AI Labs", "AXGLYNNE Custom AI Labs"],
      "url": "https://axglynne.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "url": "https://axglynne.com"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "CET Designer XML Matrix Conversion"
      },
      {
        "@type": "Thing",
        "name": "Autonomous AI Data Processing & Execution"
      },
      {
        "@type": "Thing",
        "name": "Enterprise Catalog Automation for SERVEX"
      },
      {
        "@type": "Thing",
        "name": "Complex Schema Parsing & Model Fine-Tuning"
      }
    ]
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
