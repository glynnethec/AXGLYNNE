import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'AI Solutions & SERVEX Case Study',
  description: 'AI infrastructure & research for SERVEX: Automated XML matrix conversion (CET Designer), structured data pipelines, and autonomous execution of BPO QA processes.',
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
    languages: {
      'en-US': 'https://axglynne.com/Servex_solution',
      'es-ES': 'https://axglynne.com/Servex_solution',
      'es-MX': 'https://axglynne.com/Servex_solution',
      'es-CO': 'https://axglynne.com/Servex_solution',
      'x-default': 'https://axglynne.com/Servex_solution',
    },
  },
  openGraph: {
    title: 'AI Solutions & Complex XML Matrix Automation | SERVEX Infrastructure',
    description: 'AI research infrastructure for automated conversion of complex XML catalogs (CET Designer), data matrices, and autonomous execution of corporate workflows.',
    url: 'https://axglynne.com/Servex_solution',
    siteName: 'AXGLYNNE Frontier AI Solutions',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions & Complex XML Catalog Automation | SERVEX Infrastructure',
    description: 'Enterprise AI ecosystem for SERVEX: Automated XML matrix converters (CET Designer), structured data pipelines, and autonomous execution of complex analysis.',
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
    "inLanguage": ["en", "es"],
    "author": {
      "@type": "ResearchOrganization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Frontier AI Labs", "AXGLYNNE Custom AI Labs"],
      "url": "https://axglynne.com"
    },
    "publisher": {
      "@type": "ResearchOrganization",
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
