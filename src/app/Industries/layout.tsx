import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Industry AI Solutions',
    default: 'Industrias & Automatización de Procesos Complejos | AXGLYNNE Enterprise',
  },
  description: 'Aplicación de Inteligencia Artificial e Ingeniería de Software a sectores clave: Automatización de operaciones B2B, procesamiento de matrices de datos, integración de modelos de lenguaje privados e infraestructura segura en EE.UU. y Latinoamérica.',
  keywords: [
    'IA para Industrias',
    'Automatización de Procesos B2B',
    'Inteligencia Artificial para Operaciones',
    'IA para Sector Financiero y Servicios',
    'Modelos de IA por Industria',
    'Enterprise AI Architecture for Industries',
    'B2B Process Automation',
    'AXGLYNNE Industries'
  ],
  alternates: {
    canonical: 'https://axglynne.com/Industries',
    languages: {
      'en-US': 'https://axglynne.com/Industries',
      'es-ES': 'https://axglynne.com/Industries',
      'es-MX': 'https://axglynne.com/Industries',
      'es-CO': 'https://axglynne.com/Industries',
      'x-default': 'https://axglynne.com/Industries',
    },
  },
  openGraph: {
    title: 'Industrias & Automatización de Procesos Complejos | AXGLYNNE Enterprise',
    description: 'Soluciones de IA a medida para optimizar operaciones B2B, matrices de datos complejas e infraestructura corporativa.',
    url: 'https://axglynne.com/Industries',
    siteName: 'AXGLYNNE Enterprise AI',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries & Enterprise AI Automation | AXGLYNNE',
    description: 'Custom AI solutions automating B2B operations, complex data matrices, and private model deployment across key enterprise sectors.',
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Enterprise AI & B2B Process Automation",
    "provider": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Enterprise AI", "AXGLYNNE Custom AI Labs", "GLYNNE AI Technology"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) es una firma de arquitectura de software e ingeniería de Inteligencia Artificial (LLM Fine-Tuning, QLoRA, MCP, RAG) fundada por Alexander Quiroga, sin relación con figuras musicales o la industria del entretenimiento.",
      "url": "https://axglynne.com"
    },
    "areaServed": ["US", "LATAM", "ES", "Global"],
    "description": "Servicios de integración de Inteligencia Artificial, fine-tuning y automatización de procesos complejos para sectores industriales y empresariales."
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
