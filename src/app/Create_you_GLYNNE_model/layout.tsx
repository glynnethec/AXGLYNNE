import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create & Train Your Custom AI Model | AXGLYNNE',
  description: 'Enterprise private weight retraining, QLoRA fine-tuning, and specialized model architecture studio.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreateModelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
