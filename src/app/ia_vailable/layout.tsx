import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'AI Model Directory & Open-Source Weights Catalog',
  description: 'Explore our comprehensive AI model directory: GPT-4o, Claude 3.5 Sonnet, Llama 3.3 70B, Qwen 3.6, Phi 3.5, Mistral, and ultra-fast accelerated inference engines ready for integration and custom fine-tuning.',
  keywords: [
    'AI Model Directory',
    'Available AI Models Catalog',
    'Open-Source LLMs Library',
    'Open Weights Intelligence',
    'Llama 3.3 70B',
    'GPT-4o',
    'Claude 3.5 Sonnet',
    'Qwen 3.6',
    'Phi 3.5 Mini',
    'Whisper Voice AI',
    'LLM Inference Speed Benchmarks',
    'Model Context Windows',
    'Fine-Tuning Foundation Models',
    'AXGLYNNE AI Directory'
  ],
  alternates: {
    canonical: 'https://axglynne.com/ia_vailable',
    languages: {
      'en-US': 'https://axglynne.com/ia_vailable',
      'es-ES': 'https://axglynne.com/ia_vailable',
      'es-MX': 'https://axglynne.com/ia_vailable',
      'es-CO': 'https://axglynne.com/ia_vailable',
      'x-default': 'https://axglynne.com/ia_vailable',
    },
  },
  openGraph: {
    title: 'AI Model Directory & Open-Source Weights Catalog | AXGLYNNE',
    description: 'Structured catalog of language, vision, voice, and accelerated inference systems. Compare speeds, context windows, and model specifications.',
    url: 'https://axglynne.com/ia_vailable',
    siteName: 'AXGLYNNE AI Model Directory',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Model Directory & Open Source Library | AXGLYNNE',
    description: 'Explore state-of-the-art AI models (Llama, Claude, GPT, Qwen, Whisper) available for high-speed inference and custom fine-tuning.',
  },
};

export default function IaAvailableLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "AXGLYNNE AI Model Catalog",
    "url": "https://axglynne.com/ia_vailable",
    "description": "Structured directory and catalog of Artificial Intelligence models (Elite, Production, Open-Source, and Preview) available for integration and accelerated high-speed inference.",
    "provider": {
      "@type": "ResearchOrganization",
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
