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
    template: '%s | AXGLYNNE Custom AI Labs (US & LATAM)',
    default: 'AXGLYNNE | LLM Fine-Tuning, Secure AI Platforms & Private Infrastructure',
  },
  description: 'Ingeniería de IA & Plataformas de Software a Medida: Fine-Tuning de LLMs (QLoRA, Unsloth), integración MCP, RAG avanzado y desarrollo de infraestructura segura con control de roles (RBAC), máxima privacidad e interfaces interactivas corporativas para EE.UU., LatAm y Global.',
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
    title: 'AXGLYNNE | LLM Fine-Tuning, Secure AI Platforms & Enterprise Infrastructure',
    description: 'Entrenamiento de modelos propietarios, plataformas de software interactivas a medida, control de acceso por roles (RBAC), alta seguridad y privacidad de datos.',
    url: 'https://axglynne.com',
    siteName: 'AXGLYNNE Custom AI Labs',
    locale: 'es_US',
    alternateLocale: ['en_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AXGLYNNE | LLM Fine-Tuning, Secure AI Platforms & Enterprise Infrastructure',
    description: 'Custom LLM fine-tuning (QLoRA, Unsloth), interactive enterprise web portals, RBAC access control, data privacy, and private AI deployment in US & LatAm.',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
