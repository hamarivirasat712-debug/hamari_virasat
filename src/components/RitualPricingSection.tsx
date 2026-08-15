'use client';

import { RitualSelectionProvider } from '@/context/RitualSelectionContext';
import RitualGrid from '@/components/RitualGrid';
import Pricing from '@/components/Pricing';

type Ritual = {
  number: string;
  title: string;
  category: string;
  description: string;
  subSections: string[];
  color: string;
  isDIY?: boolean;
  imageIcon?: string;
};

export default function RitualPricingSection({ rituals }: { rituals: Ritual[] }) {
  return (
    <RitualSelectionProvider>
      <RitualGrid rituals={rituals} />
      <Pricing />
    </RitualSelectionProvider>
  );
}
