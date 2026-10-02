'use client';

import React, { createContext, useContext, useState } from 'react';

// Legacy mapping: maps old hardcoded indices (0–7) to slugs for backward compat
// with existing JWT tokens that used ritualIndices
export const LEGACY_INDEX_TO_SLUG: Record<number, string> = {
  0: 'namkaran',
  1: 'mundan',
  2: 'upanayana',
  3: 'engagement',
  4: 'wedding-haldi',
  5: 'wedding-mehendi',
  6: 'wedding-main',
  7: 'griha-pravesh',
};

interface SelectedRitual {
  number: string;  // Sanity number string e.g. "01"
  title: string;   // e.g. "Namkaran"
  slug: string;    // e.g. "namkaran" — machine key from Sanity
}

interface RitualSelectionContextType {
  selectedRituals: SelectedRitual[];
  setSelectedRituals: React.Dispatch<React.SetStateAction<SelectedRitual[]>>;
  // Returns slugs of selected rituals e.g. ['namkaran', 'wedding-haldi']
  getIntakeSlugs: () => string[];
  // Returns total price: ₹299 per ritual (flat rate)
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

  const getIntakeSlugs = () => {
    return selectedRituals.map(r => r.slug).filter(Boolean);
  };

  const calculateTotal = () => {
    return selectedRituals.length * 299;
  };

  const openPaymentModal = () => {
    if (selectedRituals.length < 1) {
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
        getIntakeSlugs,
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
              Please select at least <strong className="text-[#BD5319] font-semibold">1 ritual</strong> from our <strong className="text-[#2A1208] font-semibold">Riti Riwaj</strong> collection below before proceeding to payment.
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
