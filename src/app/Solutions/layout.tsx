import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Solutions',
  description: 'Explore GLYNNE enterprise AI solutions. Automate workflows, enhance decision-making, and scale your business with our autonomous systems.',
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
