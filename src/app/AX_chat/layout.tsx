import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AX Chat · AI Conversational Core',
  description: 'Enterprise AI conversational core powered by frontier reasoning and multimodal models.',
  alternates: {
    canonical: 'https://axglynne.com/AX_chat',
  },
  openGraph: {
    title: 'AX Chat · AI Conversational Core | AXGLYNNE',
    description: 'Enterprise AI conversational core powered by frontier reasoning and multimodal models.',
    url: 'https://axglynne.com/AX_chat',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AX Chat',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AXChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
