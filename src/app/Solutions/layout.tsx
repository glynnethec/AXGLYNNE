import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soluciones de IA & Automatización de Catálogos XML (Caso SERVEX)',
  description: 'Caso de éxito e infraestructura de IA para SERVEX: Conversión automatizada de esquemas complejos XML (CET Designer), reprocesamiento de matrices de datos y ejecución autónoma de análisis mediante modelos de IA para EE.UU. y Latinoamérica.',
  keywords: [
    // Solution Specific (XML, Catalog Automation, SERVEX, CET Designer)
    'Automatización de Catálogos XML',
    'CET Designer XML Matrix Converter',
    'Procesamiento de Esquemas XML Complejos',
    'Caso de Estudio SERVEX IA',
    'Ecosistema de Datos Autónomo',
    'Convertidores XML a Data Estructurada',
    'Ejecución Autónoma de Análisis de Datos',
    // English & Global Search Terms
    'Automated XML Catalog Processing',
    'CET Designer XML Integration',
    'Enterprise Data Matrix Converters',
    'Autonomous AI Data Pipeline',
    'Custom AI Ecosystem SERVEX',
    'AXGLYNNE Solutions'
  ],
  alternates: {
    canonical: 'https://axglynne.com/Solutions',
    languages: {
      'en-US': 'https://axglynne.com/Solutions',
      'es-ES': 'https://axglynne.com/Solutions',
      'es-MX': 'https://axglynne.com/Solutions',
      'es-CO': 'https://axglynne.com/Solutions',
      'x-default': 'https://axglynne.com/Solutions',
    },
  },
  openGraph: {
    title: 'Soluciones de IA & Automatización de Catálogos XML Complejos | Ecosistema SERVEX',
    description: 'Infraestructura de IA para la conversión automática de catálogos XML complejos (CET Designer), matrices de datos y ejecución autónoma de procesos corporativos.',
    url: 'https://axglynne.com/Solutions',
    siteName: 'AXGLYNNE Enterprise AI Solutions',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions & Complex XML Catalog Automation | SERVEX Infrastructure',
    description: 'Enterprise AI ecosystem for SERVEX: Automated XML matrix converters (CET Designer), structured data pipelines, and autonomous execution of complex analysis.',
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Ecosistema de IA y Automatización de Catálogos XML Complejos para SERVEX",
    "name": "Soluciones de IA Corporativa & Conversión XML Matrix",
    "description": "Solución de ingeniería desarrollada para SERVEX: Integración de modelos de IA para la lectura, conversión y actualización autónoma de catálogos XML de alta complejidad (CET Designer), transformando esquemas en datos estructurados y ejecutando análisis automáticos sin intervención manual del usuario.",
    "url": "https://axglynne.com/Solutions",
    "inLanguage": ["en", "es"],
    "author": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Enterprise AI", "AXGLYNNE Custom AI Labs", "GLYNNE AI Technology"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) es una firma de arquitectura de software e ingeniería de Inteligencia Artificial (LLM Fine-Tuning, QLoRA, MCP, RAG) fundada por Alexander Quiroga, sin relación con figuras musicales o la industria del entretenimiento.",
      "url": "https://axglynne.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "url": "https://axglynne.com"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "CET Designer XML Matrix Conversion"
      },
      {
        "@type": "Thing",
        "name": "Autonomous AI Data Processing & Execution"
      },
      {
        "@type": "Thing",
        "name": "Enterprise Catalog Automation for SERVEX"
      },
      {
        "@type": "Thing",
        "name": "Complex Schema Parsing & Model Fine-Tuning"
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
