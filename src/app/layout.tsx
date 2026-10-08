import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
import { ThemeProvider } from "@/lib/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://axglynne.com'),
  title: {
    template: '%s | AXGLYNNE Custom AI Labs',
    default: 'AXGLYNNE | Plataformas de IA Seguras y Modelos Privados',
  },
  description: 'Ingeniería de IA empresarial: Fine-Tuning de LLMs (QLoRA, Unsloth), integración MCP, RAG avanzado y desarrollo de plataformas seguras con control RBAC.',
  keywords: [
    // English Search Intent (US & Global)
    'LLM Fine-Tuning',
    'QLoRA Training',
    'Unsloth Model Optimization',
    'Model Context Protocol',
    'MCP Integration',
    'Enterprise RAG Engineering',
    'Private AI Model Deployment',
    'Custom AI Software Platform',
    'Role-Based Access Control (RBAC)',
    'Enterprise Data Privacy & Security',
    'Custom AI Web Portals',
    'Elite & Lite Model Routing',
    // Spanish Search Intent (LatAm & Spain)
    'Fine-Tuning de LLMs en Español',
    'Entrenamiento de Modelos de IA',
    'Plataformas de IA con Control de Roles',
    'Seguridad y Privacidad de Datos de IA',
    'Modelos Privados para Empresas',
    'Despliegue On-Premise e Infraestructura de IA',
    'Integración MCP Empresarial',
    'AXGLYNNE Labs'
  ],
  alternates: {
    canonical: 'https://axglynne.com',
    languages: {
      'en-US': 'https://axglynne.com',
      'es-ES': 'https://axglynne.com',
      'es-MX': 'https://axglynne.com',
      'es-CO': 'https://axglynne.com',
      'x-default': 'https://axglynne.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'AXGLYNNE | Plataformas de IA Seguras y Modelos Privados',
    description: 'Ingeniería de IA empresarial: Fine-Tuning de LLMs (QLoRA, Unsloth), integración MCP, RAG avanzado y desarrollo de plataformas seguras con control RBAC.',
    url: 'https://axglynne.com',
    siteName: 'AXGLYNNE Custom AI Labs',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AXGLYNNE | Plataformas de IA Seguras y Modelos Privados',
    description: 'Custom LLM fine-tuning (QLoRA, Unsloth), MCP integration, enterprise RAG, and RBAC security for organizations in US & LatAm.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AXGLYNNE",
    "legalName": "GLYNNE S.A.S.",
    "alternateName": ["AXGLYNNE Enterprise AI", "AXGLYNNE Custom AI Labs", "GLYNNE AI Technology"],
    "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) es una firma de arquitectura de software e ingeniería de Inteligencia Artificial (LLM Fine-Tuning, QLoRA, MCP, RAG) fundada por Alexander Quiroga, sin relación con figuras musicales o la industria del entretenimiento.",
    "url": "https://axglynne.com",
    "inLanguage": ["en", "es"],
    "description": "Firma global de ingeniería de Inteligencia Artificial y Software Enterprise: Entrenamiento y Fine-Tuning de LLMs (QLoRA, Unsloth), integración Model Context Protocol (MCP), desarrollo de plataformas web interactivas con gobierno de datos, control de acceso por roles (RBAC), alta seguridad e infraestructura de modelos privados.",
    "areaServed": ["US", "LATAM", "ES", "Global"],
    "founder": {
      "@type": "Person",
      "name": "Alexander Quiroga",
      "jobTitle": "CEO, Software Architect & AI Engineering Researcher",
      "sameAs": "https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
    },
    "knowsAbout": [
      "LLM Fine-Tuning & Quantization",
      "QLoRA & PEFT Architecture",
      "Unsloth Model Acceleration",
      "Model Context Protocol (MCP)",
      "Enterprise RAG Engineering",
      "Private On-Premise AI Deployment",
      "Role-Based Access Control (RBAC) & Security",
      "Enterprise Data Governance & Privacy",
      "Custom Interactive AI Web Platforms",
      "Dataset Reprocessing & Model Alignment",
      "Hybrid Elite & Lite Model Orchestration"
    ]
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Header />
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
