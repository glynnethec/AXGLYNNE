import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'LLM Fine-Tuning & Model Re-Training Studio (QLoRA / LoRA)',
  description: 'Accessible development environment to re-train, align, and indoctrinate open-source AI models (Qwen 2.5, Llama 3.2, Phi 3.5) using QLoRA 4-bit/8-bit and Unsloth acceleration. Fine-tune custom LLMs in minutes.',
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
    languages: {
      'en-US': 'https://axglynne.com/TrainModel',
      'es-ES': 'https://axglynne.com/TrainModel',
      'es-MX': 'https://axglynne.com/TrainModel',
      'es-CO': 'https://axglynne.com/TrainModel',
      'x-default': 'https://axglynne.com/TrainModel',
    },
  },
  openGraph: {
    title: 'LLM Fine-Tuning & Model Re-Training Studio | QLoRA Platform',
    description: 'Interactive self-serve playground to re-train open-source AI models on custom datasets with QLoRA 4-bit, quantization, and real-time inference testing.',
    url: 'https://axglynne.com/TrainModel',
    siteName: 'AXGLYNNE AI Trainer Studio',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self-Serve LLM Fine-Tuning Platform | Re-train Custom AI Models',
    description: 'Re-train and align open-source AI models (Llama, Qwen, Phi) effortlessly with QLoRA 4-bit/8-bit and custom JSONL datasets.',
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
