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
    template: '%s | AXGLYNNE Frontier AI & Data Science Labs',
    default: 'AXGLYNNE | Frontier AI Research, Open Weights, Data Science & MCP Agents',
  },
  description: 'Frontier AI research and development organization: Open-weights model fine-tuning (QLoRA 4-bit/8-bit, Unsloth), custom model indoctrination, specialized MCP autonomous agent architectures, ML/DL modeling, advanced RAG pipelines, and data science.',
  keywords: [
    // Global Frontier AI & Research Intent Keywords
    'Frontier Artificial Intelligence Research',
    'Open-Weights Intelligence',
    'Open Source Model Fine-Tuning',
    'Custom LLM Re-training & Indoctrination',
    'QLoRA 4-bit & 8-bit Quantization',
    'Unsloth Acceleration Kernels',
    'Machine Learning & Deep Learning (ML/DL)',
    'Neural Network Modeling',
    'Model Context Protocol (MCP)',
    'Specialized Autonomous Agent Systems',
    'Advanced RAG Architectures & Vector Pipelines',
    'Data Science Optimization & Engineering',
    'AI Model Curation & Benchmarking',
    'Public AI Developer Tools',
    'Autonomous AI Systems',
    'Enterprise Data Sovereignty & Security',
    'AXGLYNNE Frontier AI Labs'
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
    title: 'AXGLYNNE | Frontier AI Research, Open Weights & Data Science Labs',
    description: 'Pioneering research in frontier AI, open-weights model training (QLoRA 4-bit/8-bit), specialized MCP autonomous agent architectures, ML/DL modeling, and advanced data science.',
    url: 'https://axglynne.com',
    siteName: 'AXGLYNNE Frontier AI Labs',
    locale: 'en_US',
    alternateLocale: ['es_US', 'es_ES', 'es_MX', 'es_CO'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AXGLYNNE | Frontier AI Research, Open Weights & MCP Agent Systems',
    description: 'Frontier AI research, open-weights model training (QLoRA 4-bit/8-bit), custom model indoctrination, specialized MCP agent architectures, ML/DL modeling, data science engineering, and public developer tools.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ResearchOrganization",
        "name": "AXGLYNNE",
        "legalName": "GLYNNE S.A.S.",
        "alternateName": ["AXGLYNNE Frontier AI Labs", "AXGLYNNE Open-Weights AI Research", "AXGLYNNE Data Science & Neural Engineering"],
        "disambiguatingDescription": "AXGLYNNE (GLYNNE S.A.S.) is a pioneer technology and innovation organization specializing in frontier Artificial Intelligence research, Data Science, open-weights model fine-tuning and indoctrination (QLoRA 4-bit/8-bit, Unsloth), Model Context Protocol (MCP) specialized agent workflows, ML/DL modeling, and RAG systems founded by Alexander Quiroga.",
        "url": "https://axglynne.com",
        "inLanguage": ["en", "es"],
        "description": "Pioneer technology research organization specializing in Frontier Artificial Intelligence, Data Science, and Autonomous Systems: AI process optimization research, open-weights model re-training and indoctrination (QLoRA 4-bit/8-bit, PEFT, Unsloth), Model Context Protocol (MCP) specialized autonomous agent architectures, advanced RAG pipeline engineering, data science optimization, AI model curation, and public developer tools.",
        "areaServed": ["US", "LATAM", "ES", "Global"],
        "founder": {
          "@type": "Person",
          "name": "Alexander Quiroga",
          "jobTitle": "CEO, Software Architect & Lead AI Engineering Researcher",
          "sameAs": "https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
        },
        "knowsAbout": [
          "Frontier Artificial Intelligence Research",
          "Open-Weights Intelligence & Model Fine-Tuning",
          "Custom LLM Re-training & Indoctrination",
          "QLoRA 4-bit & 8-bit Quantization & PEFT Architecture",
          "Unsloth Model Acceleration & High-Performance Kernels",
          "Machine Learning & Deep Learning Modeling (ML/DL)",
          "Model Context Protocol (MCP) Process Engineering",
          "Specialized Autonomous Agent Orchestration",
          "Advanced RAG Architectures & Vector Pipelines",
          "Data Science Development & Matrix Optimization",
          "AI Model Curation, Compilation & Benchmarking",
          "Public AI Developer Tools & Fast Inference Engines",
          "Enterprise Data Sovereignty, Privacy & Security"
        ]
      },
      {
        "@type": "ItemList",
        "name": "AXGLYNNE Primary Site Navigation Sitelinks",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "AXGLYNNE | Frontier AI Research & Data Science",
            "url": "https://axglynne.com"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Model Re-training & Indoctrination Studio (TrainModel)",
            "url": "https://axglynne.com/TrainModel"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "About AXGLYNNE & Technological Vision",
            "url": "https://axglynne.com/About"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "AI Model Catalog & Directory",
            "url": "https://axglynne.com/ia_vailable"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "AI Solutions & SERVEX Case Study",
            "url": "https://axglynne.com/Servex_solution"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 6,
            "name": "AI Process Research Methodology",
            "url": "https://axglynne.com/Methodology"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 7,
            "name": "Contact & Technical Research Consultation",
            "url": "https://axglynne.com/contact"
          }
        ]
      }
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
