import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Your Custom AI Model',
  description: 'Enterprise private weight retraining, QLoRA fine-tuning, and specialized model architecture studio.',
  alternates: {
    canonical: 'https://axglynne.com/Create_you_GLYNNE_model',
  },
  openGraph: {
    title: 'Create Your Custom AI Model | AXGLYNNE',
    description: 'Enterprise private weight retraining, QLoRA fine-tuning, and specialized model architecture studio.',
    url: 'https://axglynne.com/Create_you_GLYNNE_model',
    siteName: 'AXGLYNNE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logos/GLYNNE.svg',
        width: 1200,
        height: 630,
        alt: 'Create Custom AI Model',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CreateModelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
