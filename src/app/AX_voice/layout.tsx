import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AX Voice · Real-Time Voice Synthesis',
  description: 'Zero-latency neural acoustic voice modulation for enterprise communications and autonomous AI.',
  alternates: {
    canonical: 'https://axglynne.com/AX_voice',
  },
  openGraph: {
    title: 'AX Voice · Real-Time Voice Synthesis | AXGLYNNE',
    description: 'Zero-latency neural acoustic voice modulation for enterprise communications.',
    url: 'https://axglynne.com/AX_voice',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AX Voice',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AXVoiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
