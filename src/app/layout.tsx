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
    template: '%s | AXGLYNNE Enterprise AI',
    default: 'AXGLYNNE | Autonomous Enterprise AI Platform',
  },
  description: 'AXGLYNNE provides frontier AI inference and autonomous systems to optimize enterprise workflows, offering unparalleled efficiency and scalable solutions.',
  keywords: ['Enterprise AI', 'Autonomous Systems', 'Workflow Optimization', 'AI Automation', 'AXGLYNNE', 'AX Engine'],
  openGraph: {
    title: 'AXGLYNNE | Autonomous Enterprise AI Platform',
    description: 'Frontier AI inference and autonomous systems to optimize enterprise workflows.',
    url: 'https://axglynne.com',
    siteName: 'AXGLYNNE Enterprise AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AXGLYNNE | Autonomous Enterprise AI Platform',
    description: 'Frontier AI inference and autonomous systems to optimize enterprise workflows.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AXGLYNNE",
    "legalName": "GLYNNE S.A.S.",
    "url": "https://axglynne.com",
    "description": "Enterprise AI automation, agent orchestration, and deterministic technology infrastructure.",
    "founder": {
      "@type": "Person",
      "name": "Alexander Quiroga",
      "jobTitle": "CEO, Software Architect and AI Researcher",
      "sameAs": "https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "B2B Automation",
      "Agent Orchestration",
      "Deterministic AI",
      "Software Architecture",
      "LLMs"
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
