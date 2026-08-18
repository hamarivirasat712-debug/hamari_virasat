'use client';

import React, { createContext, useContext, useState } from 'react';

// Maps ritual titles from Sanity CMS to the intake form index (0–7)
// Update this if ritual titles in Sanity change
export const RITUAL_TITLE_TO_INDEX: Record<string, number> = {
  'Namkaran': 0,
  'Mundan': 1,
  'Upanayana': 2,
  'Upanayana / Janeu': 2,
  'Janeu': 2,
  'Engagement': 3,
  'Sagai': 3,
  'Wedding – Haldi': 4,
  'Wedding - Haldi': 4,
  'Haldi': 4,
  'Wedding – Mehendi': 5,
  'Wedding - Mehendi': 5,
  'Mehendi': 5,
  'Wedding – Main Ceremony': 6,
  'Wedding - Main Ceremony': 6,
  'Vivah': 6,
  'Griha Pravesh': 7,
  'Grih Pravesh': 7,
};

interface SelectedRitual {
  number: string;  // Sanity number string e.g. "01"
  title: string;   // e.g. "Namkaran"
}

interface RitualSelectionContextType {
  selectedRituals: SelectedRitual[];
  setSelectedRituals: React.Dispatch<React.SetStateAction<SelectedRitual[]>>;
  // Converts selected rituals to intake form indices e.g. [0, 3, 6]
  getIntakeIndices: () => number[];
  // Returns total price: ₹501 base + ₹199 per ritual beyond 3
  calculateTotal: () => number;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
}

const RitualSelectionContext = createContext<RitualSelectionContextType | null>(null);

export function RitualSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedRituals, setSelectedRituals] = useState<SelectedRitual[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const getIntakeIndices = () => {
    return selectedRituals
      .map(r => RITUAL_TITLE_TO_INDEX[r.title])
      .filter(idx => idx !== undefined);
  };

  const calculateTotal = () => {
    const base = 501;
    const extra = Math.max(0, selectedRituals.length - 3) * 199;
    return base + extra;
  };

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  return (
    <RitualSelectionContext.Provider
      value={{
        selectedRituals,
        setSelectedRituals,
        getIntakeIndices,
        calculateTotal,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        openPaymentModal,
        closePaymentModal,
      }}
    >
      {children}
    </RitualSelectionContext.Provider>
  );
}

export function useRitualSelection() {
  const ctx = useContext(RitualSelectionContext);
  if (!ctx) throw new Error('useRitualSelection must be used within RitualSelectionProvider');
  return ctx;
}
