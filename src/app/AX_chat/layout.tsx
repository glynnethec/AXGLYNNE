import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AX Chat · Intelligent Assistant | AXGLYNNE',
  description: 'Enterprise AI conversational core powered by frontier reasoning and multimodal models.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AXChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
