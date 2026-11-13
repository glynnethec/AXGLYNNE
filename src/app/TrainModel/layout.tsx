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
    "@graph": [
      {
        "@type": ["WebApplication", "SoftwareApplication"],
        "@id": "https://axglynne.com/TrainModel#software",
        "name": "GLYNNE Train · QLoRA LLM Fine-Tuning & Model Alignment Studio",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser / Cloud NVIDIA H100 GPU Cluster",
        "url": "https://axglynne.com/TrainModel",
        "description": "Enterprise development platform by AXGLYNNE (GLYNNE S.A.S.) to fine-tune, align, and adapt open-weights Large Language Models (Qwen 2.5, Llama 3.2, Phi 3.5) using QLoRA 4-bit/8-bit quantization and Unsloth kernel acceleration.",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "provider": {
          "@type": "Organization",
          "@id": "https://axglynne.com/#organization",
          "name": "AXGLYNNE",
          "legalName": "GLYNNE S.A.S.",
          "url": "https://axglynne.com",
          "sameAs": [
            "https://www.linkedin.com/company/glynne/",
            "https://www.linkedin.com/company/glynne/posts/",
            "https://www.youtube.com/@AXGLYNNE",
            "https://www.instagram.com/axglynne/",
            "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
            "https://www.informacolombia.com/directorio-empresas/informacion-empresa/glynne-sas"
          ]
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "featureList": [
          "Re-training of Qwen 2.5, Llama 3.2, and Phi 3.5 open-weights models",
          "Support for custom JSONL datasets and automated synthetic dataset generation",
          "QLoRA 4-bit/8-bit NF4 quantization and Unsloth kernel optimization on NVIDIA H100",
          "Export quantized .GGUF weights for local air-gapped or private API inference"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "AXGLYNNE (GLYNNE S.A.S.)",
            "item": "https://axglynne.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "GLYNNE Train · LLM Fine-Tuning Studio",
            "item": "https://axglynne.com/TrainModel"
          }
        ]
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
