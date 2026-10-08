import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Alexander Quiroga | CEO & Lead AI Engineering Researcher',
  description: 'Alexander Quiroga is CEO, Software Architect, and Lead AI Engineering Researcher at AXGLYNNE. Specialized in frontier AI research, open-weights LLM fine-tuning (QLoRA, Unsloth), MCP agent protocols, and neural architectures.',
  keywords: [
    'Alexander Quiroga',
    'CEO AXGLYNNE',
    'Software Architect',
    'Lead AI Researcher',
    'Artificial Intelligence Researcher',
    'AI Software Architect',
    'LLM Fine-Tuning Specialist',
    'Open Weights Intelligence Researcher',
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
    title: 'Alexander Quiroga - CEO, Software Architect & Lead AI Researcher | AXGLYNNE',
    description: 'Alexander Quiroga leads frontier AI research, open-weights model fine-tuning, MCP agent protocols, and data science engineering at AXGLYNNE.',
    url: 'https://axglynne.com/CEO_GLYNNE',
    type: 'profile',
    siteName: 'AXGLYNNE Frontier AI Labs',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    images: ['/AlexanderCEO.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexander Quiroga | CEO & Lead AI Researcher | AXGLYNNE',
    description: 'CEO, Software Architect & Lead AI Researcher at AXGLYNNE. Specialized in LLM fine-tuning, open weights, MCP architectures, and autonomous AI systems.',
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
      "@type": "ResearchOrganization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Frontier AI Labs", "AXGLYNNE Data Science & AI Engineering"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) is a technology research organization specializing in frontier Artificial Intelligence, open-weights model fine-tuning (QLoRA, Unsloth), MCP agent protocols, and data science founded by Alexander Quiroga.",
      "url": "https://axglynne.com"
    },
    "url": "https://axglynne.com/CEO_GLYNNE",
    "sameAs": [
      "https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
    ],
    "knowsAbout": [
      "Frontier Artificial Intelligence Engineering",
      "Open-Weights Intelligence & LLM Fine-Tuning",
      "QLoRA 4-bit/8-bit & PEFT Architecture",
      "Unsloth Model Acceleration",
      "Model Context Protocol (MCP) & Autonomous Agents",
      "Machine Learning & Deep Learning (ML/DL)",
      "Enterprise Data Science & Vector Pipelines"
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
