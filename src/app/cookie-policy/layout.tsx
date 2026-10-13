import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Understand how AXGLYNNE uses cookies and local storage technologies to ensure platform functionality and service security.',
  alternates: {
    canonical: 'https://axglynne.com/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | AXGLYNNE',
    description: 'Understand how AXGLYNNE uses cookies and tracking technologies to ensure platform stability.',
    url: 'https://axglynne.com/cookie-policy',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'AXGLYNNE Cookie Policy',
      },
    ],
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
