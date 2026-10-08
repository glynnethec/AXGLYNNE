import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'About AXGLYNNE | Frontier AI Research & Data Science Labs',
  description: 'Discover AXGLYNNE (GLYNNE S.A.S.): Frontier Artificial Intelligence research, open-weights model re-training and indoctrination (QLoRA 4-bit/8-bit, Unsloth), specialized MCP agent architectures, advanced RAG, and data science.',
  keywords: [
    'About AXGLYNNE',
    'AXGLYNNE Frontier AI Labs',
    'GLYNNE S.A.S. Technology',
    'Alexander Quiroga CEO',
    'Frontier AI Research',
    'Open-Weights Intelligence',
    'Model Re-training & Indoctrination',
    'Specialized MCP Agent Systems',
    'Data Science Optimization',
    'Public AI Developer Tools',
    'Latin America AI Research Lab'
  ],
  alternates: {
    canonical: 'https://axglynne.com/About',
    languages: {
      'en-US': 'https://axglynne.com/About',
      'es-ES': 'https://axglynne.com/About',
      'es-MX': 'https://axglynne.com/About',
      'es-CO': 'https://axglynne.com/About',
      'x-default': 'https://axglynne.com/About',
    },
  },
  openGraph: {
    title: 'About AXGLYNNE | AI Research, Data Science & Neural Engineering',
    description: 'Pioneer technology research organization: Custom model indoctrination (QLoRA, Unsloth), specialized autonomous MCP agent architectures, advanced RAG pipelines, and public developer tools.',
    url: 'https://axglynne.com/About',
    siteName: 'AXGLYNNE Frontier AI Labs',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AXGLYNNE | AI Research & Data Science Engineering',
    description: 'Discover AXGLYNNE: AI process optimization research, custom model indoctrination (QLoRA, Unsloth), MCP agent protocols, and public AI developer tools.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "ResearchOrganization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Frontier AI Labs", "AXGLYNNE Data Science & AI Engineering"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) is a pioneer technology and innovation organization specializing in frontier Artificial Intelligence research, Data Science, open-weights model re-training and indoctrination (QLoRA, Unsloth), Model Context Protocol (MCP) specialized agent workflows, RAG systems, and technical infrastructure founded by Alexander Quiroga.",
      "url": "https://axglynne.com",
      "inLanguage": ["en", "es"],
      "description": "Pioneer technology research organization specializing in Frontier Artificial Intelligence, Data Science, and Autonomous Systems. We lead AI process optimization research, custom model re-training (QLoRA 4-bit/8-bit, Unsloth), specialized MCP agent architectures, and public developer tools for the global community.",
      "founder": {
        "@type": "Person",
        "name": "Alexander Quiroga",
        "jobTitle": "CEO, Software Architect & Lead AI Engineering Researcher",
        "sameAs": "https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
      },
      "knowsAbout": [
        "Frontier AI Process Optimization Research",
        "Open-Weights Model Re-training & Indoctrination (QLoRA / Unsloth)",
        "Model Context Protocol (MCP) Process Engineering",
        "Specialized Autonomous Agent Architectures",
        "Advanced RAG Pipelines & Semantic Search",
        "Data Science Development & Matrix Optimization",
        "AI Model Curation & Benchmarking",
        "Public AI Developer Tools"
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
