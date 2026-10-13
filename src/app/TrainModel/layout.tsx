import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'LLM Fine-Tuning & Model Studio',
  description: 'Fine-tune open-source AI models (Qwen 2.5, Llama 3.2, Phi 3.5) with QLoRA 4-bit/8-bit and Unsloth acceleration in minutes.',
  keywords: [
    'LLM Fine-Tuning Studio',
    'Open Source Model Re-Training',
    'QLoRA 4-bit & 8-bit Quantization',
    'LoRA Model Adaptation',
    'Unsloth Acceleration Kernels',
    'AI Model Indoctrination',
    'Re-train Llama 3.2 & Qwen 2.5',
    'AI Developer Playground',
    'Fine-Tuning Interactive Platform',
    'Custom Dataset JSONL',
    'Open Source AI Tools',
    'Create Custom AI Model',
    'Easy LLM Fine-Tuning Studio',
    'Open Weights Intelligence'
  ],
  alternates: {
    canonical: 'https://axglynne.com/TrainModel',
  },
  openGraph: {
    title: 'LLM Fine-Tuning & Model Studio | AXGLYNNE',
    description: 'Interactive playground to fine-tune open-source AI models with QLoRA 4-bit, quantization, and fast inference testing.',
    url: 'https://axglynne.com/TrainModel',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Model Fine-Tuning Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLM Fine-Tuning & Model Studio | AXGLYNNE',
    description: 'Fine-tune open-source AI models effortlessly with QLoRA 4-bit/8-bit and custom JSONL datasets.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function TrainModelLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AXGLYNNE Model Fine-Tuning Studio",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "url": "https://axglynne.com/TrainModel",
    "description": "Accessible development platform and playground to re-train, align, and indoctrinate open-source Large Language Models (LLMs) using QLoRA 4-bit/8-bit, LoRA, and Unsloth kernel acceleration.",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Re-training of Qwen 2.5, Llama 3.2, and Phi 3.5 open-source models",
      "Support for custom JSONL datasets and AI synthetic dataset generation",
      "QLoRA 4-bit/8-bit NF4 quantization and Unsloth kernel optimization",
      "Real-time interactive playground testing and live model inference"
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
