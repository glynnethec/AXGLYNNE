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
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://axglynne.com/Servex_solution#article",
        "headline": "Enterprise AI Ecosystem & Autonomous XML Matrix Conversion for SERVEX",
        "name": "Enterprise AI Solutions & SERVEX Case Study",
        "description": "Production AI architecture engineered by AXGLYNNE (GLYNNE S.A.S.) for SERVEX: Autonomous conversion of complex XML catalogs (CET Designer), deterministic schema parsing, and multi-agent enterprise workflow execution.",
        "url": "https://axglynne.com/Servex_solution",
        "author": {
          "@type": "Organization",
          "@id": "https://axglynne.com/#organization",
          "name": "AXGLYNNE",
          "legalName": "GLYNNE S.A.S.",
          "url": "https://axglynne.com",
          "sameAs": [
            "https://www.linkedin.com/company/glynne/",
            "https://www.linkedin.com/company/glynne/posts/",
            "https://www.youtube.com/@AXGLYNNE",
            "https://www.instagram.com/axglynne/",
            "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
            "https://www.informacolombia.com/directorio-empresas/informacion-empresa/glynne-sas"
          ]
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://axglynne.com/#organization",
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
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "AXGLYNNE (GLYNNE S.A.S.)",
            "item": "https://axglynne.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Enterprise AI Solutions & SERVEX",
            "item": "https://axglynne.com/Servex_solution"
          }
        ]
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
