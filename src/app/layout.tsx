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
    template: '%s | AXGLYNNE',
    default: 'AXGLYNNE | Frontier AI Research & Models',
  },
  description: 'Frontier AI research organization: Open-weights model fine-tuning (QLoRA, Unsloth), autonomous MCP agents, RAG pipelines, and data science.',
  keywords: [
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
    title: 'AXGLYNNE | Frontier AI Research & Models',
    description: 'Frontier AI research: Open-weights fine-tuning (QLoRA, Unsloth), autonomous MCP agents, RAG pipelines, and enterprise data science.',
    url: 'https://axglynne.com',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Frontier AI Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AXGLYNNE | Frontier AI Research & Models',
    description: 'Frontier AI research: Open-weights fine-tuning (QLoRA, Unsloth), autonomous MCP agents, RAG pipelines, and enterprise data science.',
    images: ['/logos/GLYNNE.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "AXGLYNNE",
        "legalName": "GLYNNE S.A.S.",
        "alternateName": [
          "AXGLYNNE Frontier AI Labs",
          "AXGLYNNE Open-Weights AI Research",
          "AXGLYNNE Data Science & Neural Engineering"
        ],
        "description": "Frontier AI research and development organization specializing in open-weights model fine-tuning (QLoRA 4-bit/8-bit, Unsloth), autonomous MCP agent systems, RAG pipelines, and data science.",
        "url": "https://axglynne.com",
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
            "@type": "ListItem",
            "position": 1,
            "name": "AXGLYNNE | Frontier AI Research & Data Science",
            "url": "https://axglynne.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Model Fine-Tuning & Indoctrination Studio",
            "url": "https://axglynne.com/TrainModel"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "About AXGLYNNE & Technological Vision",
            "url": "https://axglynne.com/About"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "AI Model Catalog & Directory",
            "url": "https://axglynne.com/ia_vailable"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "AI Solutions & SERVEX Case Study",
            "url": "https://axglynne.com/Servex_solution"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "AI Process Research Methodology",
            "url": "https://axglynne.com/Methodology"
          },
          {
            "@type": "ListItem",
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
