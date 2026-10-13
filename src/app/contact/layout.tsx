import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Contact AI Engineering & Research',
  description: 'Contact AXGLYNNE AI research and engineering team for private model fine-tuning, MCP agent workflows, and technical consultations.',
  keywords: [
    'Contact AXGLYNNE',
    'AI Research Consultation',
    'LLM Fine-Tuning Sales',
    'Open Weights AI Quote',
    'MCP Agent Protocol Integration',
    'AI Process Optimization Consultation',
    'AXGLYNNE Contact Us',
    'AXGLYNNE Engineering Team'
  ],
  alternates: {
    canonical: 'https://axglynne.com/contact',
  },
  openGraph: {
    title: 'Contact AI Engineering & Research | AXGLYNNE',
    description: 'Speak directly with our AI research and engineering team: Consultation on open-weights models, MCP agent systems, and private deployment.',
    url: 'https://axglynne.com/contact',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AI Engineering & Research | AXGLYNNE',
    description: 'Schedule a technical research consultation for custom LLM fine-tuning, MCP agent integration, and private deployment.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "AXGLYNNE Contact & Technical Research Consultation",
    "description": "Official contact page for AI research consultation, open-weights model fine-tuning (QLoRA), MCP agent architectures, and private deployment.",
    "url": "https://axglynne.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Frontier AI Labs", "AXGLYNNE Open-Weights AI Research"],
      "url": "https://axglynne.com",
      "email": "alexglynne7@gmail.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+57-314-253-4962",
          "contactType": "secretary",
          "availableLanguage": ["Spanish", "English"],
          "areaServed": ["US", "LATAM", "ES", "Global"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+57-312-345-5328",
          "contactType": "management",
          "availableLanguage": ["Spanish", "English"],
          "areaServed": ["US", "LATAM", "ES", "Global"]
        }
      ]
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
