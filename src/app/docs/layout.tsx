import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Developer Documentation, API Reference & Quickstart',
  description: 'Official technical documentation for AXGLYNNE (GLYNNE S.A.S.): OpenAI-compatible Sub-API endpoints, QLoRA fine-tuning guides, WebSocket voice streaming, and enterprise security.',
  keywords: [
    'AXGLYNNE Documentation',
    'GLYNNE S.A.S. API Reference',
    'AXGLYNNE Quickstart Guide',
    'OpenAI Compatible LLM Gateway',
    'QLoRA Fine-Tuning JSONL Format',
    'AX Voice WebSocket API',
    'Enterprise AI Developer Hub'
  ],
  alternates: {
    canonical: 'https://axglynne.com/docs',
  },
  openGraph: {
    title: 'Developer Documentation & API Reference | AXGLYNNE (GLYNNE S.A.S.)',
    description: 'Integrate AXGLYNNE open-weights LLMs, Sub-API gateways, QLoRA fine-tuning pipelines, and real-time voice agents into your enterprise stack.',
    url: 'https://axglynne.com/docs',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Developer Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Documentation & API Reference | AXGLYNNE',
    description: 'Official API guides, QLoRA dataset specifications, and quickstart documentation for AXGLYNNE.',
    images: ['/logos/GLYNNE.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "AXGLYNNE Official Developer Documentation & API Quickstart",
    "description": "Technical reference for authenticating with AXGLYNNE Sub-API gateways, streaming neural voice over WebSockets, and formatting JSONL datasets for 4-bit QLoRA LLM fine-tuning.",
    "url": "https://axglynne.com/docs",
    "author": {
      "@type": "Organization",
      "@id": "https://axglynne.com/#organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "url": "https://axglynne.com"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://axglynne.com/#organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
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

