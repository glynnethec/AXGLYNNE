import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Frontier AI & Data Science Labs',
    default: 'Contact & AI Research Consultation',
  },
  description: 'Contact AXGLYNNE engineering & research team: Schedule a consultation for open-weights model fine-tuning (QLoRA, Unsloth), MCP agent protocols, advanced RAG, and private AI deployment.',
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
    languages: {
      'en-US': 'https://axglynne.com/contact',
      'es-ES': 'https://axglynne.com/contact',
      'es-MX': 'https://axglynne.com/contact',
      'es-CO': 'https://axglynne.com/contact',
      'x-default': 'https://axglynne.com/contact',
    },
  },
  openGraph: {
    title: 'Contact & AI Research Consultation | AXGLYNNE Frontier AI Labs',
    description: 'Speak directly with our AI research and engineering team: Consultation on open-weights model indoctrination, MCP agent systems, RAG pipelines, and private AI infrastructure.',
    url: 'https://axglynne.com/contact',
    siteName: 'AXGLYNNE Frontier AI Labs',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AXGLYNNE | AI Research & Private Platform Consultation',
    description: 'Schedule a technical research consultation for custom LLM fine-tuning, MCP agent integration, data science engineering, and private AI deployment.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "AXGLYNNE Contact & Technical Research Consultation",
    "description": "Official contact page for AI research consultation, open-weights model re-training (QLoRA), MCP agent architectures, and private AI deployment.",
    "url": "https://axglynne.com/contact",
    "inLanguage": ["en", "es"],
    "mainEntity": {
      "@type": "ResearchOrganization",
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
