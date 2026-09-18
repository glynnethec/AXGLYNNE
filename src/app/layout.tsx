import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
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
    template: '%s | GLYNNE Enterprise AI',
    default: 'GLYNNE | Autonomous Enterprise AI Platform',
  },
  description: 'GLYNNE provides frontier AI inference and autonomous systems to optimize enterprise workflows, offering unparalleled efficiency and scalable solutions.',
  keywords: ['Enterprise AI', 'Autonomous Systems', 'Workflow Optimization', 'AI Automation', 'GLYNNE', 'AX Engine'],
  openGraph: {
    title: 'GLYNNE | Autonomous Enterprise AI Platform',
    description: 'Frontier AI inference and autonomous systems to optimize enterprise workflows.',
    url: 'https://axglynne.com',
    siteName: 'GLYNNE Enterprise AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GLYNNE | Autonomous Enterprise AI Platform',
    description: 'Frontier AI inference and autonomous systems to optimize enterprise workflows.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
