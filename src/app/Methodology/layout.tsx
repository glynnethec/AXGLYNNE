import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Methodology (How We Operate)',
  description: 'Discover how GLYNNE transforms business processes into intelligent technological ecosystems. We build the infrastructure required for AI to operate, analyze, decide, execute, and evolve.',
};

export default function MethodologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
