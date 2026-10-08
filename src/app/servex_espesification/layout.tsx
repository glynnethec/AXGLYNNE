import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'SERVEX Technical Specification | AI & XML Matrix Pipeline',
  description: 'Technical specification for SERVEX: Automated XML schema conversion (CET Designer), matrix data science, and autonomous process execution.',
  keywords: [
    'SERVEX Technical Specification',
    'CET Designer XML Matrix Converter',
    'SERVEX Case Study',
    'XML to Structured Data Converter',
    'AI for BPO Process Optimization',
    'Complex Catalog Automation',
    'Servex AI Case Study',
    'AXGLYNNE Servex Solutions'
  ],
  alternates: {
    canonical: 'https://axglynne.com/servex_espesification',
    languages: {
      'en-US': 'https://axglynne.com/servex_espesification',
      'es-ES': 'https://axglynne.com/servex_espesification',
      'es-MX': 'https://axglynne.com/servex_espesification',
      'es-CO': 'https://axglynne.com/servex_espesification',
      'x-default': 'https://axglynne.com/servex_espesification',
    },
  },
  openGraph: {
    title: 'SERVEX Technical Specification | XML Matrix Converter & AI',
    description: 'Technical documentation of the AI ecosystem developed for SERVEX: XML matrix processing and autonomous workflow execution.',
    url: 'https://axglynne.com/servex_espesification',
    siteName: 'AXGLYNNE Frontier AI',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERVEX Technical Specification | XML Matrix AI Pipeline',
    description: 'Detailed case study on how AXGLYNNE deployed autonomous AI solutions for SERVEX complex XML catalog matrices (CET Designer).',
  },
};

export default function ServexCaseStudyLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "SERVEX Technical Specification & AI Architecture",
    "description": "Detailed technical study on data processing algorithms and AI model integration for matrix catalog automation (CET Designer) at SERVEX.",
    "url": "https://axglynne.com/servex_espesification",
    "inLanguage": ["en", "es"],
    "author": {
      "@type": "ResearchOrganization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Frontier AI Labs"],
      "url": "https://axglynne.com"
    }
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
