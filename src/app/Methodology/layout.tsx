import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Frontier AI & Data Science Labs',
    default: 'AI Process Optimization & Research Methodology',
  },
  description: 'AI research and development methodology: AI process optimization, open-weights model re-training and indoctrination (QLoRA/Unsloth), specialized MCP agent architectures, RAG pipelines, and data science engineering.',
  keywords: [
    'AI Process Optimization Research',
    'Open-Weights Model Re-Training',
    'Model Indoctrination & Alignment',
    'MCP Process Engineering with Specialized Agents',
    'Data Science Optimization',
    'Advanced RAG Architectures',
    'QLoRA & Unsloth Fine-Tuning',
    'AI Model Curation',
    'Autonomous AI Systems',
    'Frontier AI Research Methodology'
  ],
  alternates: {
    canonical: 'https://axglynne.com/Methodology',
    languages: {
      'en-US': 'https://axglynne.com/Methodology',
      'es-ES': 'https://axglynne.com/Methodology',
      'es-MX': 'https://axglynne.com/Methodology',
      'es-CO': 'https://axglynne.com/Methodology',
      'x-default': 'https://axglynne.com/Methodology',
    },
  },
  openGraph: {
    title: 'Research Methodology, Data Science & MCP Agent Protocols | AXGLYNNE',
    description: 'Deterministic step-by-step methodology: AI process optimization research, custom model indoctrination (QLoRA/Unsloth), specialized MCP agent workflows, and data science.',
    url: 'https://axglynne.com/Methodology',
    siteName: 'AXGLYNNE Frontier AI Labs',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Process Optimization Research & Data Science Methodology | AXGLYNNE',
    description: 'Scientific workflow: AI process optimization, custom model indoctrination, specialized MCP agent architectures, advanced RAG, and data science engineering.',
  },
};

export default function MethodologyLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "AXGLYNNE AI Process Optimization & Research Methodology",
    "description": "Deterministic step-by-step scientific methodology for AI process optimization research: Data science ingestion, open-weights model re-training and indoctrination (QLoRA/Unsloth), specialized MCP agent process development, RAG pipelines, and high-precision inference.",
    "url": "https://axglynne.com/Methodology",
    "inLanguage": ["en", "es"],
    "author": {
      "@type": "ResearchOrganization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Frontier AI Labs", "AXGLYNNE Data Science & AI Engineering"],
      "url": "https://axglynne.com"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "1. AI Process Optimization Research & Audit",
        "text": "Scientific analysis and mapping of complex information workflows to determine optimal intervention points for AI models and data science."
      },
      {
        "@type": "HowToStep",
        "name": "2. Data Science Development & Optimization",
        "text": "Massive ingestion, structuring, and curation of unstructured data to generate high-density training datasets."
      },
      {
        "@type": "HowToStep",
        "name": "3. Open-Weights Model Re-Training & Indoctrination (QLoRA / Unsloth)",
        "text": "PEFT/QLoRA 4-bit adaptation and Unsloth kernel acceleration to indoctrinate neural networks for domain-specific functions."
      },
      {
        "@type": "HowToStep",
        "name": "4. MCP Process Development with Specialized Agents",
        "text": "Implementation of Model Context Protocol (MCP) and orchestration of multiple specialized autonomous agents collaborating on complex execution tasks."
      },
      {
        "@type": "HowToStep",
        "name": "5. RAG Architectures & Secure Private Deployment",
        "text": "Real-time vector retrieval RAG integration and deployment in private infrastructure with full observability."
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
