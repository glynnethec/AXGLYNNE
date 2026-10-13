import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Open-Weights AI Model Library',
  description: 'Explore open-weights models: Download GGUF 4-bit, 8-bit QLoRA, and FP16 weights for offline, air-gapped enterprise deployment.',
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
  },
  openGraph: {
    title: 'Open-Weights AI Model Library | AXGLYNNE',
    description: 'Catalog of open-weights foundation models, GGUF adapters, and offline air-gapped runtimes for private enterprise data centers.',
    url: 'https://axglynne.com/Librarymodel',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Open-Weights Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open-Weights AI Model Library | AXGLYNNE',
    description: 'Catalog of open-weights models, GGUF adapters, and offline air-gapped runtimes for private enterprise data centers.',
    images: ['/logos/GLYNNE.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LibraryModelLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "AXGLYNNE Open-Weights & Offline AI Model Library",
    "description": "Enterprise catalog of open-weights AI models, quantized GGUF adapters, and offline air-gapped runtimes.",
    "provider": {
      "@type": "Organization",
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
