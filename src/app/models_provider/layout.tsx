import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Unified Models Provider & Sub-APIs',
  description: 'Connect and manage open-weights AI models via unified sub-API keys with high-performance inference and zero hardware overhead.',
  keywords: [
    'AI Model Provider',
    'Unified AI API Gateway',
    'Sub-API Key Management',
    'Open-Source Model Reseller',
    'Qwen 2.5 API Gateway',
    'DeepSeek R1 Sub-APIs',
    'Llama 3.3 70B Inferencia',
    'Serverless Model Inferencia',
    'AXGLYNNE Models Provider'
  ],
  alternates: {
    canonical: 'https://axglynne.com/models_provider',
  },
  openGraph: {
    title: 'Unified Models Provider & Sub-APIs | AXGLYNNE',
    description: 'Empower your enterprise projects with unified Sub-APIs connecting over 80+ open-source and frontier AI models with zero infrastructure hassle.',
    url: 'https://axglynne.com/models_provider',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Models Provider',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unified Models Provider & Sub-APIs | AXGLYNNE',
    description: 'Empower your enterprise projects with unified Sub-APIs connecting over 80+ open-source AI models.',
    images: ['/logos/GLYNNE.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ModelsProviderLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AXGLYNNE Models Provider Gateway",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cloud API Gateway",
    "description": "Unified Multi-Model API Gateway for generating Sub-APIs to consume frontier open-source LLMs.",
    "provider": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "url": "https://axglynne.com"
    },
    "url": "https://axglynne.com/models_provider"
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
