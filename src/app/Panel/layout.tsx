import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AX Console · Assembly Dashboard | AXGLYNNE',
  description: 'Enterprise AI operations control center and centralized infrastructure dashboard.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
