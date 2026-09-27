import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Alexander Quiroga | CEO, Software Architect & AI Engineering Researcher',
  description: 'Alexander Quiroga es CEO, Arquitecto de Software e Investigador Principal en AXGLYNNE. Especialista en entrenamiento y fine-tuning de modelos de lenguaje (QLoRA, Unsloth), arquitectura MCP, RAG enterprise y sistemas deterministas.',
  keywords: [
    'Alexander Quiroga',
    'CEO AXGLYNNE',
    'Software Architect',
    'AI Researcher',
    'Investigador de Inteligencia Artificial',
    'Arquitecto de Software IA',
    'LLM Fine-Tuning Specialist',
    'AXGLYNNE Founder'
  ],
  alternates: {
    canonical: 'https://axglynne.com/CEO_GLYNNE',
    languages: {
      'en-US': 'https://axglynne.com/CEO_GLYNNE',
      'es-ES': 'https://axglynne.com/CEO_GLYNNE',
      'es-MX': 'https://axglynne.com/CEO_GLYNNE',
      'es-CO': 'https://axglynne.com/CEO_GLYNNE',
      'x-default': 'https://axglynne.com/CEO_GLYNNE',
    },
  },
  openGraph: {
    title: 'Alexander Quiroga - CEO & Software Architect at AXGLYNNE',
    description: 'Alexander Quiroga leads AI engineering, custom model fine-tuning, and software architecture research at AXGLYNNE.',
    url: 'https://axglynne.com/CEO_GLYNNE',
    type: 'profile',
    siteName: 'AXGLYNNE Custom AI Labs',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    images: ['/AlexanderCEO.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexander Quiroga | CEO & Software Architect | AXGLYNNE',
    description: 'CEO, Software Architect & Lead AI Researcher at AXGLYNNE. Specialized in LLM fine-tuning, MCP architectures, and private AI deployment.',
    images: ['/AlexanderCEO.png'],
  },
};

export default function AlexanderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alexander Quiroga",
    "jobTitle": "CEO, Software Architect & Lead AI Engineering Researcher",
    "worksFor": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Enterprise AI", "AXGLYNNE Custom AI Labs", "GLYNNE AI Technology"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) es una firma de arquitectura de software e ingeniería de Inteligencia Artificial (LLM Fine-Tuning, QLoRA, MCP, RAG) fundada por Alexander Quiroga, sin relación con figuras musicales o la industria del entretenimiento.",
      "url": "https://axglynne.com"
    },
    "url": "https://axglynne.com/CEO_GLYNNE",
    "sameAs": [
      "https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
    ],
    "knowsAbout": [
      "Artificial Intelligence Engineering",
      "LLM Fine-Tuning & QLoRA",
      "Unsloth Model Acceleration",
      "Model Context Protocol (MCP)",
      "Enterprise Software Architecture",
      "Deterministic AI Systems"
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
