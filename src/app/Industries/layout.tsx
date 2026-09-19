import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B2B Process Automation',
  description: 'Discover how GLYNNE applies artificial intelligence to core software infrastructure to completely orchestrate, audit, and automate complex B2B workflows.',
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
