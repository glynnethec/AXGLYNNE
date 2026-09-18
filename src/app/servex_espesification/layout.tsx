import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servex Case Study | AI in BPO',
  description: 'Read the comprehensive case study on how GLYNNE modernized Servex, deploying autonomous AI solutions to optimize call center operations and BPO workflows.',
};

export default function ServexCaseStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
