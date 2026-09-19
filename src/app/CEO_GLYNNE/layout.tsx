import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alexander Quiroga | CEO & Software Architect',
  description: 'Alexander Quiroga is the CEO, Software Architect, and Lead Researcher at AXGLYNNE, specializing in Artificial Intelligence and B2B automation.',
  keywords: ['Alexander Quiroga', 'CEO AXGLYNNE', 'Software Architect', 'AI Researcher', 'Artificial Intelligence', 'B2B Automation'],
  openGraph: {
    title: 'Alexander Quiroga - Founder & CEO of AXGLYNNE',
    description: 'Learn about Alexander Quiroga, the Software Architect and AI Researcher leading AXGLYNNE.',
    url: 'https://axglynne.com/CEO_GLYNNE',
    type: 'profile',
    images: ['/AlexanderCEO.png'],
  },
};

export default function AlexanderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
