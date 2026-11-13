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
  applicationName: 'AXGLYNNE',
  title: {
    template: '%s | AXGLYNNE (GLYNNE S.A.S.)',
    default: 'AXGLYNNE (GLYNNE S.A.S.) | Frontier AI Research, Open-Weights Models & Fine-Tuning',
  },
  description: 'AXGLYNNE (GLYNNE S.A.S.) is an enterprise AI engineering and research corporation specializing in open-weights LLM fine-tuning (QLoRA, Unsloth), NVIDIA H100 accelerated inference, autonomous MCP agents, and corporate automation.',
  authors: [{ name: 'Alexander Quiroga', url: 'https://axglynne.com/CEO_GLYNNE' }],
  creator: 'AXGLYNNE (GLYNNE S.A.S.)',
  publisher: 'GLYNNE S.A.S.',
  category: 'Artificial Intelligence & Enterprise Software Engineering',
  keywords: [
    'AXGLYNNE',
    'GLYNNE S.A.S.',
    'AX GLYNNE AI',
    'Frontier Artificial Intelligence Research',
    'Open-Weights Intelligence',
    'Open Source Model Fine-Tuning',
    'Custom LLM Re-training & Indoctrination',
    'QLoRA 4-bit & 8-bit Quantization',
    'Unsloth Acceleration Kernels',
    'NVIDIA H100 Inference Gateway',
    'Model Context Protocol (MCP)',
    'Specialized Autonomous Agent Systems',
    'Advanced RAG Architectures & Vector Pipelines',
    'Data Science Optimization & Engineering',
    'AI Model Curation & Benchmarking',
    'Public AI Developer Tools',
    'Enterprise Data Sovereignty & Security',
    'AXGLYNNE Frontier AI Labs'
  ],
  alternates: {
    canonical: 'https://axglynne.com',
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
    title: 'AXGLYNNE (GLYNNE S.A.S.) | Frontier AI Research, Open-Weights Models & Fine-Tuning',
    description: 'Enterprise AI research and infrastructure corporation: Open-weights LLM fine-tuning (QLoRA, Unsloth), NVIDIA H100 inference sub-APIs, and autonomous MCP agents.',
    url: 'https://axglynne.com',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE (GLYNNE S.A.S.) Enterprise AI & Neural Engineering Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AXGLYNNE (GLYNNE S.A.S.) | Frontier AI Research & Open-Weights Models',
    description: 'Enterprise AI research: Open-weights fine-tuning (QLoRA, Unsloth), NVIDIA H100 inference gateway, and autonomous MCP agents.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "Corporation"],
        "@id": "https://axglynne.com/#organization",
        "name": "AXGLYNNE",
        "legalName": "GLYNNE S.A.S.",
        "alternateName": [
          "AXGLYNNE",
          "GLYNNE S.A.S.",
          "AX GLYNNE",
          "GLYNNE AI",
          "AXGLYNNE Frontier AI Labs",
          "AXGLYNNE Open-Weights AI Research",
          "AXGLYNNE Data Science & Neural Engineering"
        ],
        "disambiguatingDescription": "AXGLYNNE (legally incorporated as GLYNNE S.A.S., Tax ID NIT 901966512) is a B2B software architecture and Artificial Intelligence engineering corporation founded by Alexander Quiroga, specializing in NVIDIA H100 GPU compute, open-weights LLM fine-tuning (QLoRA 4-bit/8-bit, Unsloth), Model Context Protocol (MCP) autonomous agents, and enterprise workflow automation. Distinct from and unrelated to any musical artist or entertainment entity.",
        "description": "Enterprise AI research and development corporation specializing in open-weights model fine-tuning (QLoRA 4-bit/8-bit, Unsloth), NVIDIA H100 accelerated inference gateways, autonomous MCP agent systems, RAG pipelines, and corporate data science.",
        "url": "https://axglynne.com",
        "taxID": "901966512",
        "isicV4": "6201",
        "naics": "541511",
        "logo": {
          "@type": "ImageObject",
          "url": "https://axglynne.com/logos/GLYNNE.svg",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://www.linkedin.com/company/glynne/",
          "https://www.linkedin.com/company/glynne/posts/",
          "https://www.youtube.com/@AXGLYNNE",
          "https://www.instagram.com/axglynne/",
          "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
          "https://www.informacolombia.com/directorio-empresas/informacion-empresa/glynne-sas"
        ],
        "subjectOf": {
          "@type": "WebPage",
          "name": "AXGLYNNE Official YouTube Channel (@AXGLYNNE) — Enterprise AI, QLoRA Fine-Tuning & Open-Weights Models",
          "url": "https://www.youtube.com/@AXGLYNNE",
          "description": "Official video channel produced by AXGLYNNE (GLYNNE S.A.S.) covering LLM fine-tuning, NVIDIA H100 inference clusters, open-weights AI models, and autonomous enterprise agents."
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Carrera 2 A 1 24 Sur",
          "addressLocality": "Madrid",
          "addressRegion": "Cundinamarca",
          "addressCountry": "CO"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+57-312-345-5328",
          "email": "alexglynne7@gmail.com",
          "contactType": "customer service",
          "availableLanguage": ["Spanish", "English"],
          "areaServed": ["US", "LATAM", "ES", "Global"]
        },
        "founder": {
          "@type": "Person",
          "@id": "https://axglynne.com/CEO_GLYNNE#person",
          "name": "Alexander Quiroga",
          "jobTitle": "CEO, Software Architect & Lead AI Engineering Researcher",
          "url": "https://axglynne.com/CEO_GLYNNE",
          "sameAs": [
            "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
            "https://www.instagram.com/axglynne/",
            "https://www.youtube.com/@AXGLYNNE",
            "https://www.linkedin.com/company/glynne/posts/"
          ]
        },
        "knowsAbout": [
          "Frontier Artificial Intelligence Research",
          "Open-Weights Intelligence & Model Fine-Tuning",
          "Custom LLM Re-training & Indoctrination",
          "QLoRA 4-bit & 8-bit Quantization & PEFT Architecture",
          "Unsloth Model Acceleration & High-Performance Kernels",
          "NVIDIA H100 & GH100 Accelerated GPU Inference",
          "Model Context Protocol (MCP) Process Engineering",
          "Specialized Autonomous Agent Orchestration",
          "Advanced RAG Architectures & Vector Pipelines",
          "Enterprise XML Matrix Automation (SERVEX / CET Designer)",
          "AI Model Curation, Compilation & Benchmarking",
          "Public AI Developer Tools & Sub-API Gateways",
          "Enterprise Data Sovereignty, Air-Gapped AI & Security"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://axglynne.com/#website",
        "url": "https://axglynne.com",
        "name": "AXGLYNNE",
        "alternateName": ["GLYNNE S.A.S.", "AXGLYNNE Enterprise AI Platform"],
        "publisher": {
          "@id": "https://axglynne.com/#organization"
        },
        "inLanguage": ["es", "en"]
      },
      {
        "@type": "ItemList",
        "name": "AXGLYNNE Primary Site Navigation Sitelinks",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "GLYNNE Train · Custom QLoRA LLM Fine-Tuning Studio",
            "url": "https://axglynne.com/TrainModel"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI Models Directory & Inference Benchmarks (Llama, Qwen, DeepSeek, AX 5.2)",
            "url": "https://axglynne.com/ia_vailable"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Enterprise AI Solutions & SERVEX Case Study",
            "url": "https://axglynne.com/Servex_solution"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Unified AI Models Provider & Sub-API Gateway",
            "url": "https://axglynne.com/models_provider"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Open-Weights AI Model Library (GGUF & Air-Gapped Runtimes)",
            "url": "https://axglynne.com/Librarymodel"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Scientific AI Research & MCP Engineering Methodology",
            "url": "https://axglynne.com/Methodology"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Developer Documentation, API Reference & Quickstart",
            "url": "https://axglynne.com/docs"
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
