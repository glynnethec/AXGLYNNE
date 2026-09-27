import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre AXGLYNNE | Firma de Ingeniería de IA, Fine-Tuning & Plataformas Corporativas',
  description: 'Conoce la visión y la infraestructura de AXGLYNNE: Especialistas en entrenamiento de modelos de lenguaje propietarios (QLoRA, Unsloth), arquitectura MCP, RAG de alta precisión y plataformas de software con control de roles (RBAC) y privacidad absoluta para EE.UU. y Latinoamérica.',
  keywords: [
    'Sobre AXGLYNNE',
    'AXGLYNNE AI Engineering',
    'Alexander Quiroga CEO',
    'Custom LLM Fine-Tuning Lab',
    'Enterprise AI Architecture',
    'Ingeniería de Inteligencia Artificial',
    'Desarrollo de Modelos Privados',
    'Plataformas de IA Seguras',
    'Control de Acceso RBAC',
    'Model Context Protocol MCP',
    'IA para Empresas EE.UU. y LatAm'
  ],
  alternates: {
    canonical: 'https://axglynne.com/About',
    languages: {
      'en-US': 'https://axglynne.com/About',
      'es-ES': 'https://axglynne.com/About',
      'es-MX': 'https://axglynne.com/About',
      'es-CO': 'https://axglynne.com/About',
      'x-default': 'https://axglynne.com/About',
    },
  },
  openGraph: {
    title: 'Sobre AXGLYNNE | Firma de Ingeniería de IA & Plataformas Corporativas',
    description: 'Nuestra historia, arquitectura e infraestructura de IA: Fine-tuning a medida, plataformas de software interactivas, control de roles (RBAC) y privacidad de datos.',
    url: 'https://axglynne.com/About',
    siteName: 'AXGLYNNE Custom AI Labs',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre AXGLYNNE | AI Engineering & Secure Platform Labs',
    description: 'Discover AXGLYNNE: Custom LLM fine-tuning, interactive enterprise platforms, RBAC access control, data privacy, and private AI deployment.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Enterprise AI", "AXGLYNNE Custom AI Labs", "GLYNNE AI Technology"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) es una firma de arquitectura de software e ingeniería de Inteligencia Artificial (LLM Fine-Tuning, QLoRA, MCP, RAG) fundada por Alexander Quiroga, sin relación con figuras musicales o la industria del entretenimiento.",
      "url": "https://axglynne.com",
      "inLanguage": ["en", "es"],
      "description": "AXGLYNNE es una firma de ingeniería de Inteligencia Artificial y arquitectura de software especializada en Fine-Tuning de LLMs (QLoRA, Unsloth), integración MCP, RAG enterprise y plataformas seguras con control de acceso por roles (RBAC) para corporaciones en Estados Unidos y Latinoamérica.",
      "founder": {
        "@type": "Person",
        "name": "Alexander Quiroga",
        "jobTitle": "CEO, Software Architect & AI Engineering Researcher",
        "sameAs": "https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
      },
      "knowsAbout": [
        "LLM Fine-Tuning & Quantization",
        "QLoRA & PEFT Architecture",
        "Unsloth Acceleration",
        "Model Context Protocol (MCP)",
        "Enterprise RAG Infrastructure",
        "Private On-Premise Model Deployment",
        "Role-Based Access Control (RBAC)",
        "Enterprise Data Security & Privacy",
        "Custom Interactive AI Web Applications"
      ]
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
