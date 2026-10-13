import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'About Us & Technological Vision',
  description: 'Learn about AXGLYNNE: Pioneer organization in frontier AI research, open-weights model fine-tuning, autonomous MCP agents, and data science.',
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
  },
  openGraph: {
    title: 'About Us & Technological Vision | AXGLYNNE',
    description: 'Pioneer research organization: Custom model indoctrination (QLoRA, Unsloth), autonomous MCP agents, and advanced data science.',
    url: 'https://axglynne.com/About',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'About AXGLYNNE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us & Technological Vision | AXGLYNNE',
    description: 'Learn about AXGLYNNE: Frontier AI research, model fine-tuning (QLoRA, Unsloth), MCP agents, and developer tools.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
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
