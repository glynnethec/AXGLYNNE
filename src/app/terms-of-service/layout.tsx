import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the terms, conditions, and legal framework governing the use of AXGLYNNE artificial intelligence platform and developer services.',
  alternates: {
    canonical: 'https://axglynne.com/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | AXGLYNNE',
    description: 'Review terms and conditions governing the use of AXGLYNNE AI platform and services.',
    url: 'https://axglynne.com/terms-of-service',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Terms of Service',
      },
    ],
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
