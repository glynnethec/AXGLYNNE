import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: 'Enterprise AI Security, Cryptographic Isolation & Governance',
  description: 'AXGLYNNE (GLYNNE S.A.S.) enterprise security architecture: Zero data retention, air-gapped LLM deployment, deterministic guardrails, and cryptographic isolation.',
  keywords: [
    'AXGLYNNE Security Architecture',
    'GLYNNE S.A.S. Data Sovereignty',
    'Air-Gapped Enterprise AI',
    'Zero Data Retention LLM',
    'Deterministic AI Governance',
    'Cryptographic GPU Isolation',
    'Private Model Deployment Security'
  ],
  alternates: {
    canonical: 'https://axglynne.com/Segurity',
  },
  openGraph: {
    title: 'Enterprise AI Security & Cryptographic Isolation | AXGLYNNE (GLYNNE S.A.S.)',
    description: 'Zero data retention, deterministic access control, full traceability, and air-gapped infrastructure for corporate AI deployments.',
    url: 'https://axglynne.com/Segurity',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Enterprise Security Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI Security & Data Sovereignty | AXGLYNNE',
    description: 'Cryptographic isolation, zero data retention, and deterministic AI governance by AXGLYNNE (GLYNNE S.A.S.).',
    images: ['/logos/GLYNNE.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SegurityLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AXGLYNNE Enterprise AI Security & Data Sovereignty Architecture",
    "description": "Comprehensive security architecture by AXGLYNNE (GLYNNE S.A.S.) guaranteeing cryptographic isolation, zero external training retention, role-based access control, and deterministic auditability.",
    "url": "https://axglynne.com/Segurity",
    "publisher": {
      "@type": "Organization",
      "@id": "https://axglynne.com/#organization",
      "name": "AXGLYNNE",
      "legalName": "GLYNNE S.A.S.",
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

