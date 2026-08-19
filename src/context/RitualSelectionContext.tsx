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
  isSelectionRequiredPopupOpen: boolean;
  setIsSelectionRequiredPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
}

const RitualSelectionContext = createContext<RitualSelectionContextType | null>(null);

export function RitualSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedRituals, setSelectedRituals] = useState<SelectedRitual[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSelectionRequiredPopupOpen, setIsSelectionRequiredPopupOpen] = useState(false);

  const getIntakeIndices = () => {
    return selectedRituals
      .map(r => RITUAL_TITLE_TO_INDEX[r.title])
      .filter(idx => idx !== undefined);
  };

  const calculateTotal = () => {
    const extraCount = Math.max(0, selectedRituals.length - 3);
    return 501 + extraCount * 199;
  };

  const openPaymentModal = () => {
    if (selectedRituals.length < 3) {
      setIsSelectionRequiredPopupOpen(true);
      const el = document.getElementById('rituals');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setIsPaymentModalOpen(true);
    }
  };

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
        isSelectionRequiredPopupOpen,
        setIsSelectionRequiredPopupOpen,
        openPaymentModal,
        closePaymentModal,
      }}
    >
      {children}

      {/* Selection Required Popup Modal */}
      {isSelectionRequiredPopupOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#FAF6F0] rounded-2xl w-full max-w-md p-7 text-center border border-[#EFEAE2] shadow-2xl animate-fade-in-up">
            <div className="w-16 h-16 bg-[#BD5319]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#BD5319]/20">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="font-serif text-2xl text-[#2A1208] mb-3 font-normal" style={{ fontFamily: 'var(--font-serif)' }}>
              Please Select Your Rituals First
            </h3>
            <p className="text-[#8C847C] text-sm leading-relaxed mb-6 font-light">
              You must select at least <strong className="text-[#BD5319] font-semibold">3 rituals</strong> from our <strong className="text-[#2A1208] font-semibold">Riti Riwaj</strong> collection below before proceeding to payment.
            </p>
            <button
              onClick={() => {
                setIsSelectionRequiredPopupOpen(false);
                const el = document.getElementById('rituals');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-[#BD5319] hover:bg-[#A34310] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              Choose Rituals in Riti Riwaj Section →
            </button>
          </div>
        </div>
      )}
    </RitualSelectionContext.Provider>
  );
}

export function useRitualSelection() {
  const ctx = useContext(RitualSelectionContext);
  if (!ctx) throw new Error('useRitualSelection must be used within RitualSelectionProvider');
  return ctx;
}
