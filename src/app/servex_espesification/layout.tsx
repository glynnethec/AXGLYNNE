import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Especificación Técnica SERVEX | AXGLYNNE',
  description: 'Especificación técnica del proyecto SERVEX: Conversión automatizada de esquemas XML (CET Designer), matrices de datos y ejecución autónoma de procesos.',
  keywords: [
    'Especificación Técnica SERVEX',
    'CET Designer XML Matrix',
    'Caso de Estudio SERVEX',
    'Convertidor XML a Datos Estructurados',
    'IA para Procesos BPO',
    'Automatización de Catálogos Complejos',
    'Servex AI Case Study',
    'AXGLYNNE Servex'
  ],
  alternates: {
    canonical: 'https://axglynne.com/servex_espesification',
    languages: {
      'en-US': 'https://axglynne.com/servex_espesification',
      'es-ES': 'https://axglynne.com/servex_espesification',
      'es-MX': 'https://axglynne.com/servex_espesification',
      'es-CO': 'https://axglynne.com/servex_espesification',
      'x-default': 'https://axglynne.com/servex_espesification',
    },
  },
  openGraph: {
    title: 'Especificación Técnica SERVEX | Conversor de Matrices XML & IA',
    description: 'Documentación técnica del ecosistema de IA desarrollado para SERVEX: Procesamiento de matrices XML y automatización autónoma.',
    url: 'https://axglynne.com/servex_espesification',
    siteName: 'AXGLYNNE Enterprise AI',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERVEX Technical Specification | XML Matrix AI Pipeline',
    description: 'Detailed case study on how AXGLYNNE deployed autonomous AI solutions for SERVEX complex XML catalog matrices (CET Designer).',
  },
};

export default function ServexCaseStudyLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Especificación Técnica y Arquitectura de IA para SERVEX",
    "description": "Estudio detallado sobre la implementación de algoritmos de procesamiento de datos y modelos de IA para la automatización de catálogos matriciales XML (CET Designer) en SERVEX.",
    "url": "https://axglynne.com/servex_espesification",
    "inLanguage": ["en", "es"],
    "author": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Enterprise AI", "AXGLYNNE Custom AI Labs", "GLYNNE AI Technology"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) es una firma de arquitectura de software e ingeniería de Inteligencia Artificial (LLM Fine-Tuning, QLoRA, MCP, RAG) fundada por Alexander Quiroga, sin relación con figuras musicales o la industria del entretenimiento.",
      "url": "https://axglynne.com"
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
