import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Frontier AI & Open-Weights Library',
    default: 'Open-Weights AI Model Library | Offline & Air-Gapped Deployment | AXGLYNNE',
  },
  description: 'Explore AXGLYNNE open-weights AI model catalog: Download GGUF 4-bit, 8-bit QLoRA, and FP16 weights (Llama 3.3, Qwen 2.5, DeepSeek R1, Phi-4) for offline, air-gapped, and closed-data enterprise deployment.',
  keywords: [
    'Open-Weights AI Models',
    'Offline AI Deployment',
    'Air-Gapped AI Models',
    'GGUF Quantization Catalog',
    'Private Enterprise AI Weights',
    'Llama 3.3 70B Local Deployment',
    'Qwen 2.5 Coder Offline',
    'DeepSeek R1 Local Weights',
    'On-Premise AI Models',
    'AXGLYNNE Model Library'
  ],
  alternates: {
    canonical: 'https://axglynne.com/Librarymodel',
    languages: {
      'en-US': 'https://axglynne.com/Librarymodel',
      'es-ES': 'https://axglynne.com/Librarymodel',
      'es-MX': 'https://axglynne.com/Librarymodel',
      'es-CO': 'https://axglynne.com/Librarymodel',
      'x-default': 'https://axglynne.com/Librarymodel',
    },
  },
  openGraph: {
    title: 'Open-Weights AI Model Library & Offline Deployment | AXGLYNNE',
    description: 'Catalog of open-weights foundation models, GGUF adapters, and offline air-gapped runtimes for private enterprise data centers.',
    url: 'https://axglynne.com/Librarymodel',
    siteName: 'AXGLYNNE Frontier AI Labs',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open-Weights AI Model Library | AXGLYNNE',
    description: 'Catalog of open-weights models, GGUF adapters, and offline air-gapped runtimes for private enterprise data centers.',
  },
};

export default function LibraryModelLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "AXGLYNNE Open-Weights & Offline AI Model Library",
    "description": "Enterprise catalog of open-weights AI models, quantized GGUF adapters, and offline air-gapped runtimes.",
    "provider": {
      "@type": "ResearchOrganization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "url": "https://axglynne.com"
    },
    "url": "https://axglynne.com/Librarymodel"
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
