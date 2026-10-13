import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'SERVEX Technical Specification',
  description: 'Technical specification for SERVEX: Automated XML matrix conversion (CET Designer), matrix data science, and autonomous process execution.',
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
  },
  openGraph: {
    title: 'SERVEX Technical Specification | AXGLYNNE',
    description: 'Technical documentation of the AI ecosystem developed for SERVEX: XML matrix processing and autonomous workflow execution.',
    url: 'https://axglynne.com/servex_espesification',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'SERVEX Specification',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERVEX Technical Specification | AXGLYNNE',
    description: 'Case study on how AXGLYNNE deployed autonomous AI solutions for SERVEX complex XML catalog matrices.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function ServexCaseStudyLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "SERVEX Technical Specification & AI Architecture",
    "description": "Detailed technical study on data processing algorithms and AI model integration for matrix catalog automation (CET Designer) at SERVEX.",
    "url": "https://axglynne.com/servex_espesification",
    "author": {
      "@type": "Organization",
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
