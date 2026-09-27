import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Architecture & AI Methodology (US & LATAM)',
    default: 'AXGLYNNE | Arquitectura de Software, Creación de Ecosistemas & IA Determinista',
  },
  description: 'Metodología de Arquitectura e Ingeniería de IA: Cómo construimos ecosistemas tecnológicos completos, diseñamos arquitecturas de software modulares, ejecutamos Fine-Tuning de LLMs (QLoRA, Unsloth), integramos MCP y desplegamos infraestructura con control de roles (RBAC) para EE.UU., LatAm y Global.',
  keywords: [
    // Architecture & Ecosystem Creation Terms
    'Creación de Ecosistemas Tecnológicos',
    'Arquitectura de Software para IA',
    'Diseño de Ecosistemas Inteligentes',
    'Metodología de Arquitectura Empresarial',
    'Integración de Sistemas Complejos',
    'Arquitectura Modular de Software',
    // AI & Model Engineering Process
    'Metodología de Ingeniería de IA',
    'Proceso de Entrenamiento LLM',
    'Fine-Tuning QLoRA & Unsloth',
    'Arquitectura Determinista de IA',
    'Protocolo de Contexto MCP',
    'Orquestación de Agentes y Modelos',
    'Despliegue On-Premise e Infraestructura Privada',
    'Control de Acceso RBAC y Gobierno de Datos',
    // English Search Terms (US & Global)
    'Enterprise AI Architecture Methodology',
    'AI Ecosystem Creation',
    'Software Architecture & System Design',
    'Deterministic AI Process',
    'LLM Fine-Tuning Workflow',
    'AXGLYNNE Architecture Labs'
  ],
  alternates: {
    canonical: 'https://axglynne.com/Methodology',
    languages: {
      'en-US': 'https://axglynne.com/Methodology',
      'es-ES': 'https://axglynne.com/Methodology',
      'es-MX': 'https://axglynne.com/Methodology',
      'es-CO': 'https://axglynne.com/Methodology',
      'x-default': 'https://axglynne.com/Methodology',
    },
  },
  openGraph: {
    title: 'Arquitectura de Software, Creación de Ecosistemas & IA Determinista | AXGLYNNE',
    description: 'Metodología de creación de ecosistemas de IA: Diseño de arquitectura de software, reprocesamiento de datos, fine-tuning especializado (QLoRA/Unsloth), protocolo MCP y plataformas corporativas seguras.',
    url: 'https://axglynne.com/Methodology',
    siteName: 'AXGLYNNE Custom AI Labs',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Architecture, Ecosystem Creation & Deterministic AI | AXGLYNNE',
    description: 'How AXGLYNNE operates: End-to-end tech ecosystem creation, system architecture design, fine-tuning (QLoRA, Unsloth), MCP server integration, and secure private deployment.',
  },
};

export default function MethodologyLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Metodología de Arquitectura de Software y Creación de Ecosistemas de IA AXGLYNNE",
    "description": "Metodología determinista paso a paso para la creación de ecosistemas tecnológicos e ingeniería de Inteligencia Artificial: Diseño de arquitectura de software modular, reprocesamiento de datasets, Fine-Tuning avanzado (QLoRA/Unsloth), integración MCP, RAG enterprise y despliegue en plataformas con control de roles (RBAC) y alta seguridad.",
    "url": "https://axglynne.com/Methodology",
    "inLanguage": ["en", "es"],
    "author": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Enterprise AI", "AXGLYNNE Custom AI Labs", "GLYNNE AI Technology"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) es una firma de arquitectura de software e ingeniería de Inteligencia Artificial (LLM Fine-Tuning, QLoRA, MCP, RAG) fundada por Alexander Quiroga, sin relación con figuras musicales o la industria del entretenimiento.",
      "url": "https://axglynne.com"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Diseño de Arquitectura y Creación del Ecosistema",
        "text": "Modelado de la arquitectura de software modular, definición de componentes interactivos y diseño del ecosistema donde coexistirán los modelos de IA y las aplicaciones de usuario."
      },
      {
        "@type": "HowToStep",
        "name": "Ingesta y Reprocesamiento de Datos",
        "text": "Extracción, limpieza y alineación de datos corporativos no estructurados para crear datasets de entrenamiento de alta densidad."
      },
      {
        "@type": "HowToStep",
        "name": "Fine-Tuning de Modelos Propietarios (QLoRA & Unsloth)",
        "text": "Entrenamiento de precisión empleando técnicas PEFT/QLoRA y aceleración Unsloth para adaptar modelos de lenguaje al dominio específico de la arquitectura."
      },
      {
        "@type": "HowToStep",
        "name": "Integración MCP & RAG Enterprise",
        "text": "Implementación de servidores Model Context Protocol (MCP) y arquitecturas de recuperación de información para interconectar el ecosistema con bases de datos y software corporativo."
      },
      {
        "@type": "HowToStep",
        "name": "Despliegue de Plataforma & Gobierno de Seguridad (RBAC)",
        "text": "Instalación del ecosistema tecnológico en infraestructura segura con control de acceso por roles (RBAC), monitoreo en tiempo real, auditoría de ejecución y privacidad absoluta."
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
