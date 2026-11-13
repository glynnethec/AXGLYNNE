import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'AI Models Directory & Benchmarks',
  description: 'Explore frontier AI models: Llama 3.3, Qwen 2.5, DeepSeek R1, GPT-4o, and ultra-fast inference engines ready for deployment.',
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
  },
  openGraph: {
    title: 'AI Models Directory & Benchmarks | AXGLYNNE',
    description: 'Structured catalog of language, vision, voice, and accelerated inference systems with benchmark comparisons.',
    url: 'https://axglynne.com/ia_vailable',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE AI Model Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Models Directory & Benchmarks | AXGLYNNE',
    description: 'Explore state-of-the-art AI models available for high-speed inference and custom fine-tuning.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function IaAvailableLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DataCatalog",
        "@id": "https://axglynne.com/ia_vailable#catalog",
        "name": "AXGLYNNE AI Models Directory & Inference Benchmarks",
        "url": "https://axglynne.com/ia_vailable",
        "description": "Structured directory and technical benchmark catalog of open-weights and frontier Artificial Intelligence models (Llama 3.3 70B, DeepSeek R1, Qwen 2.5, Phi 3.5, AX 5.2, Whisper Large V3 Turbo) deployed on AXGLYNNE infrastructure.",
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
        }
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
            "name": "AI Models Directory & Benchmarks",
            "item": "https://axglynne.com/ia_vailable"
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
