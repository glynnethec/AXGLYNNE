import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AX Voice · Real-Time Voice Synthesis | AXGLYNNE',
  description: 'Zero-latency neural acoustic voice modulation for enterprise communications.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AXVoiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
