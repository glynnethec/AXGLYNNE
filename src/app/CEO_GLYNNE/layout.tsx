import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Alexander Quiroga | CEO & Lead AI',
  description: 'Alexander Quiroga is CEO and Lead AI Researcher at AXGLYNNE, specializing in open-weights fine-tuning, MCP agent protocols, and neural systems.',
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
  },
  openGraph: {
    title: 'Alexander Quiroga | CEO & Lead AI | AXGLYNNE',
    description: 'Alexander Quiroga leads frontier AI research, open-weights model fine-tuning, MCP protocols, and neural engineering at AXGLYNNE.',
    url: 'https://axglynne.com/CEO_GLYNNE',
    type: 'profile',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    images: [
      {
        url: '/AlexanderCEO.png',
        width: 800,
        height: 800,
        alt: 'Alexander Quiroga CEO AXGLYNNE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexander Quiroga | CEO & Lead AI | AXGLYNNE',
    description: 'CEO, Software Architect & Lead AI Researcher at AXGLYNNE. Specialized in LLM fine-tuning, open weights, and MCP architectures.',
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
