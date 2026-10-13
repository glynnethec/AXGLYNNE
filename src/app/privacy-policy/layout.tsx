import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn about AXGLYNNE data protection standards, client privacy practices, and compliance with enterprise security protocols.',
  alternates: {
    canonical: 'https://axglynne.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | AXGLYNNE',
    description: 'Learn about AXGLYNNE data protection standards, client privacy, and enterprise security policies.',
    url: 'https://axglynne.com/privacy-policy',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Privacy Policy',
      },
    ],
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
