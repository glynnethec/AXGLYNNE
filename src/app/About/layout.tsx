import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about GLYNNE and our mission to revolutionize enterprise workflows through autonomous AI systems. Discover the team and vision behind the technology.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
