import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Document Your Family Rituals — Virasat',
  description:
    'Fill in your family ritual details at your own pace. Your answers are saved automatically so you can return anytime.',
};

export default function IntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
