import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Multi-Provider AI Inference Gateway',
    default: 'AXGLYNNE Models Provider | Unified AI API & Sub-API Gateway',
  },
  description: 'Connect, manage, and distribute open-weights foundation models (Qwen 2.5, DeepSeek R1, Llama 3.3 70B, Mistral) via unified sub-API keys with zero hardware overhead.',
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
    languages: {
      'en-US': 'https://axglynne.com/models_provider',
      'es-ES': 'https://axglynne.com/models_provider',
      'es-MX': 'https://axglynne.com/models_provider',
      'es-CO': 'https://axglynne.com/models_provider',
      'x-default': 'https://axglynne.com/models_provider',
    },
  },
  openGraph: {
    title: 'AXGLYNNE Models Provider | Unified Multi-Model API Gateway',
    description: 'Empower your enterprise projects with unified Sub-APIs connecting over 80+ open-source and frontier AI models with zero infrastructure hassle.',
    url: 'https://axglynne.com/models_provider',
    siteName: 'AXGLYNNE Frontier AI Labs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AXGLYNNE Models Provider | Unified AI API & Sub-API Gateway',
    description: 'Empower your enterprise projects with unified Sub-APIs connecting over 80+ open-source AI models.',
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
      "@type": "ResearchOrganization",
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
