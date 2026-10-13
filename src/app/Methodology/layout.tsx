import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'AI Research & Engineering Workflow',
  description: 'Scientific AI methodology: Model indoctrination (QLoRA, Unsloth), specialized MCP agent architectures, and enterprise data science engineering.',
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
  },
  openGraph: {
    title: 'AI Research & Engineering Workflow | AXGLYNNE',
    description: 'Deterministic methodology: AI process optimization, custom model indoctrination (QLoRA/Unsloth), specialized MCP agent workflows, and data science.',
    url: 'https://axglynne.com/Methodology',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Methodology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Research & Engineering Workflow | AXGLYNNE',
    description: 'Scientific workflow: Model indoctrination, specialized MCP agent architectures, and data science engineering.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function MethodologyLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "AXGLYNNE AI Process Optimization & Research Methodology",
    "description": "Deterministic step-by-step scientific methodology for AI process optimization research: Data science ingestion, open-weights model re-training and indoctrination (QLoRA/Unsloth), specialized MCP agent process development, RAG pipelines, and high-precision inference.",
    "url": "https://axglynne.com/Methodology",
    "author": {
      "@type": "Organization",
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
