import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Custom AI Labs',
    default: 'Contacto & Asesoría Técnica',
  },
  description: 'Contacta al equipo de ingeniería de AXGLYNNE: Consulta sobre Fine-Tuning de LLMs, arquitectura de software, integración MCP y despliegue de modelos privados.',
  keywords: [
    // Contact Specific Terms (Spanish)
    'Contacto AXGLYNNE',
    'Asesoría de Ingeniería de IA',
    'Consultoría Fine-Tuning LLM',
    'Contacto Arquitectura de Software IA',
    'Cotizar Modelos de IA Privados',
    'Agendar Demostración de IA Corporativa',
    'Contacto GLYNNE S.A.S.',
    // Contact Specific Terms (English)
    'Contact AXGLYNNE Sales & Engineering',
    'AI Engineering Consultation',
    'Enterprise AI Demo Request',
    'Custom LLM Fine-Tuning Sales',
    'Private AI Infrastructure Quote',
    'AXGLYNNE Contact Us'
  ],
  alternates: {
    canonical: 'https://axglynne.com/contact',
    languages: {
      'en-US': 'https://axglynne.com/contact',
      'es-ES': 'https://axglynne.com/contact',
      'es-MX': 'https://axglynne.com/contact',
      'es-CO': 'https://axglynne.com/contact',
      'x-default': 'https://axglynne.com/contact',
    },
  },
  openGraph: {
    title: 'Contacto & Asesoría de Ingeniería de IA | AXGLYNNE Enterprise Labs',
    description: 'Habla directamente con nuestro equipo de arquitectura de software e ingeniería de IA: Consulta sobre entrenamiento de modelos propietarios, MCP, RAG y plataformas seguras.',
    url: 'https://axglynne.com/contact',
    siteName: 'AXGLYNNE Custom AI Labs',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AXGLYNNE | AI Engineering & Private Platform Consultation',
    description: 'Schedule a technical consultation for custom LLM fine-tuning, software architecture, MCP integration, and private AI deployment in US & LatAm.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacto y Asesoría Técnica AXGLYNNE",
    "description": "Página oficial de contacto y solicitud de asesoría en ingeniería de Inteligencia Artificial, Fine-Tuning de LLMs, arquitectura de software y despliegue de modelos privados.",
    "url": "https://axglynne.com/contact",
    "inLanguage": ["en", "es"],
    "mainEntity": {
      "@type": "Organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
      "alternateName": ["AXGLYNNE Enterprise AI", "AXGLYNNE Custom AI Labs", "GLYNNE AI Technology"],
      "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) es una firma de arquitectura de software e ingeniería de Inteligencia Artificial (LLM Fine-Tuning, QLoRA, MCP, RAG) fundada por Alexander Quiroga, sin relación con figuras musicales o la industria del entretenimiento.",
      "url": "https://axglynne.com",
      "email": "alexglynne7@gmail.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+57-314-253-4962",
          "contactType": "secretary",
          "availableLanguage": ["Spanish", "English"],
          "areaServed": ["US", "LATAM", "ES", "Global"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+57-312-345-5328",
          "contactType": "management",
          "availableLanguage": ["Spanish", "English"],
          "areaServed": ["US", "LATAM", "ES", "Global"]
        }
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
