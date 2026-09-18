import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Sales',
  description: 'Get in touch with GLYNNE to discuss how our enterprise AI platform can transform your organization. Request a demo or consultation today.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
