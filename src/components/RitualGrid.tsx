'use client';

import React, { useState } from 'react';
import { useRitualSelection } from '@/context/RitualSelectionContext';

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

export default function RitualGrid({ rituals = [] }: { rituals?: Ritual[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { selectedRituals, setSelectedRituals, calculateTotal } = useRitualSelection();

  const isSelected = (number: string) => selectedRituals.some(r => r.number === number);

  const toggleSelect = (number: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRituals((prev) => {
      if (prev.some(r => r.number === number)) return prev.filter(r => r.number !== number);
      return [...prev, { number, title }];
    });
  };

  return (
    <section id="rituals" className="bg-[#F4DEB0] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
                Riti Riwaj
              </p>
            </div>
            <h2
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#2A1208] leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Choose from our collection of rituals.{' '}
              <span className="italic text-[#BD5319]">Pick at least 3.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-[#8C847C] text-sm md:text-base font-semibold leading-relaxed mb-1">
              Any 3 rituals for ₹501.
            </p>
            <p className="text-[#BD5319] text-sm font-semibold">
              + ₹199 for each additional ritual.
            </p>
          </div>
        </div>

        {/* ── How it works instruction banner ── */}
        <div className="bg-[#2A1208]/8 border border-[#BD5319]/20 rounded-2xl px-6 py-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#BD5319] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5"/>
              <path d="M8 5v3l2 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-[#2A1208] text-sm font-bold mb-0.5">How to get started — 3 simple steps</p>
            <p className="text-[#5E2E14] text-sm font-medium leading-relaxed">
              <span className="font-bold">①</span> Select at least 3 rituals (add more at ₹199 each) &nbsp;·&nbsp;
              <span className="font-bold">②</span> Click <span className="font-bold">&quot;Proceed to Payment&quot;</span> in the bar below &nbsp;·&nbsp;
              <span className="font-bold">③</span> Complete payment to receive your personalised form
            </p>
          </div>
        </div>

        {/* Selection counter pill */}
        {selectedRituals.length > 0 && (
          <div className="mb-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 bg-[#2A1208] text-white text-sm px-5 py-2.5 rounded-full shadow-lg">
              <span className="text-[#C9A84C] font-semibold">{selectedRituals.length} selected</span>
              <span className="text-[#5E2E14]">·</span>
              <span className="text-[#C9A84C] font-bold">₹{calculateTotal().toLocaleString('en-IN')}</span>
              {selectedRituals.length > 3 && (
                <span className="text-[#8C847C] text-xs">({selectedRituals.length - 3} extra × ₹199)</span>
              )}
            </div>
          </div>
        )}

        {/* Ritual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rituals.map((ritual) => {
            const isExpanded = expanded === ritual.number;
            const isItemSelected = isSelected(ritual.number);
            const isDisabled = false; // No cap — all rituals always selectable
            const isExtra = !isItemSelected && selectedRituals.length >= 3; // 4th+ selection costs extra

            /* ---- DIY card ---- */
            if (ritual.isDIY) {
              return (
                <div
                  key={ritual.number}
                  className={`group relative bg-white border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-300 ${
                    isItemSelected
                      ? 'border-[#D4AF37] shadow-xl shadow-[#2A1208]/8'
                      : isDisabled
                      ? 'border-[#D4AF37]/20 opacity-50'
                      : 'border-[#D4AF37]/40 hover:border-[#D4AF37]/80 hover:shadow-xl hover:shadow-[#2A1208]/8'
                  }`}
                >
                  {/* Top shimmer line */}
                  <div
                    className="h-0.5 w-full"
                    style={{ background: 'linear-gradient(to right, #D4AF37, #BD5319, transparent)' }}
                  />
                  <div className="p-6">
                    {/* Number + Select button (top-right) + Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col gap-3">
                        <span
                          className="font-serif text-4xl font-bold leading-none"
                          style={{
                            fontFamily: 'var(--font-serif)',
                            WebkitTextStroke: '1px #D4AF3740',
                            color: 'transparent',
                          }}
                        >
                          {ritual.number}
                        </span>
                        {ritual.imageIcon && (
                          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/20 flex items-center justify-center p-2 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm animate-[pulse_4s_ease-in-out_infinite] bg-white">
                            <img src={ritual.imageIcon} alt={ritual.title} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                        )}
                      </div>
                      {/* Top-right: select button + category */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={(e) => toggleSelect(ritual.number, ritual.title, e)}
                          disabled={isDisabled}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all duration-200 ${
                            isItemSelected
                              ? 'bg-[#D4AF37] text-[#2A1208] border-[#D4AF37] shadow-md'
                              : isExtra
                              ? 'text-[#BD5319] border-[#BD5319] hover:bg-[#BD5319] hover:text-white'
                              : 'text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2A1208]'
                          }`}
                        >
                          {isItemSelected ? (
                            <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> Selected</>
                          ) : isExtra ? '+ ₹199' : '+ Select'}
                        </button>
                        <span
                          className="text-xs font-semibold tracking-wide px-2.5 py-1 rounded-full"
                          style={{ background: '#D4AF3718', color: '#D4AF37' }}
                        >
                          {ritual.category}
                        </span>
                      </div>
                    </div>

                    {/* Pencil icon */}
                    <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M12.5 2.5l3 3L5 16H2v-3L12.5 2.5z" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 4.5l3 3" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-serif text-xl text-[#2A1208] font-normal mb-3 group-hover:text-[#D4AF37] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {ritual.title}
                    </h3>

                    <p className="text-[#8C847C] text-sm leading-relaxed font-light mb-5">
                      {ritual.description}
                    </p>

                    {/* Steps */}
                    <div className="flex flex-wrap gap-2">
                      {(ritual.subSections || []).map((sub) => (
                        <span
                          key={sub}
                          className="text-[#8A8076] text-xs bg-[#FAF6F0] border border-[#D4AF37]/20 rounded-full px-3 py-1"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            /* ---- Standard cards ---- */
            return (
              <div
                key={ritual.number}
                className={`group bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isItemSelected
                    ? 'border-[#BD5319]/60 shadow-xl shadow-[#2A1208]/8 ring-2 ring-[#BD5319]/20'
                    : isDisabled
                    ? 'border-[#EFEAE2] opacity-40 pointer-events-none'
                    : isExpanded
                    ? 'border-[#C9A84C]/50 shadow-xl shadow-[#2A1208]/8'
                    : 'border-[#EFEAE2] hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-[#2A1208]/5'
                }`}
                onClick={() => setExpanded(isExpanded ? null : ritual.number)}
              >
                {/* Top accent line */}
                <div
                  className="h-0.5 w-full"
                  style={{
                    background: `linear-gradient(to right, ${ritual.color}, transparent)`,
                    opacity: isExpanded ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                <div className="p-6">
                  {/* Number + Select button (top-right) + Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col gap-3">
                      <span
                        className="font-serif text-4xl font-bold leading-none"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          WebkitTextStroke: '1px #EFEAE2',
                          color: isExpanded ? ritual.color : 'transparent',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {ritual.number}
                      </span>
                      {ritual.imageIcon && (
                        <div className="w-16 h-16 rounded-full border border-[#D4AF37]/20 flex items-center justify-center p-2 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm animate-[pulse_4s_ease-in-out_infinite] bg-white">
                          <img src={ritual.imageIcon} alt={ritual.title} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                      )}
                    </div>
                    {/* Top-right: select button + category */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={(e) => toggleSelect(ritual.number, ritual.title, e)}
                        disabled={isDisabled}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all duration-200 ${
                          isItemSelected
                            ? 'bg-[#D4AF37] text-[#2A1208] border-[#D4AF37] shadow-md'
                            : isExtra
                            ? 'text-[#BD5319] border-[#BD5319] hover:bg-[#BD5319] hover:text-white'
                            : 'text-[#8C847C] border-[#EFEAE2] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                        }`}
                      >
                        {isItemSelected ? (
                          <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> Selected</>
                        ) : isExtra ? '+ ₹199' : '+ Select'}
                      </button>
                      <span
                        className="text-xs font-semibold tracking-wide px-2.5 py-1 rounded-full"
                        style={{
                          background: `${ritual.color}15`,
                          color: ritual.color,
                        }}
                      >
                        {ritual.category}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif text-xl text-[#2A1208] font-normal mb-3 group-hover:text-[#BD5319] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {ritual.title}
                  </h3>

                  {/* Description (always visible) */}
                  <p className="text-[#8C847C] text-sm leading-relaxed font-light mb-5">
                    {ritual.description}
                  </p>

                  {/* Sub-sections (visible when expanded) */}
                  {isExpanded && (
                    <div className="flex flex-wrap gap-2 mt-2 animate-fade-in-up">
                      {(ritual.subSections || []).map((sub) => (
                        <span
                          key={sub}
                          className="text-[#8A8076] text-xs bg-[#FAF6F0] border border-[#EFEAE2] rounded-full px-3 py-1"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expand toggle */}
                  <div className="mt-5 flex items-center gap-1.5 text-[#BD5319] text-xs font-medium">
                    <span>{isExpanded ? 'Show less' : `See all ${(ritual.subSections || []).length} sub-sections`}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-[#8C847C] text-sm font-light">
            Have a ritual not on this list?{' '}
            <a href="#enquiry" className="text-[#BD5319] hover:underline font-medium">
              Tell us — we will document it too →
            </a>
          </p>
        </div>

      </div>

      {/* ── Sticky bottom selection tray ── */}
      {selectedRituals.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
          <div
            className="mx-4 mb-4 md:mx-auto md:max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #2A1208, #3E1A0C)' }}
          >
            {/* Progress bar */}
            <div
              className="h-0.5 transition-all duration-500"
              style={{
                width: `${(selectedRituals.length / 3) * 100}%`,
                background: 'linear-gradient(to right, #BD5319, #C9A84C)',
              }}
            />
            <div className="px-5 py-4 flex items-center gap-4">
              {/* Selected names */}
              <div className="flex-1 min-w-0">
                <p className="text-[#C9A84C] text-xs font-bold tracking-wider uppercase mb-1.5">
                  {selectedRituals.length < 3
                    ? `${selectedRituals.length} of 3 selected — choose ${3 - selectedRituals.length} more`
                    : `${selectedRituals.length} ritual${selectedRituals.length > 1 ? 's' : ''} selected — Total: ₹${calculateTotal().toLocaleString('en-IN')}`
                  }
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedRituals.map((r) => (
                    <button
                      key={r.number}
                      onClick={(e) => toggleSelect(r.number, r.title, e)}
                      className="flex items-center gap-1 text-white text-xs bg-white/10 hover:bg-white/20 border border-white/10 rounded-full px-2.5 py-1 transition-colors"
                    >
                      {r.title}
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    </button>
                  ))}
                </div>
              </div>
              {/* CTA */}
              <a
                href="#pricing"
                className={`flex-shrink-0 inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                  selectedRituals.length >= 3
                    ? 'bg-[#BD5319] hover:bg-[#A34310] text-white hover:shadow-lg hover:shadow-[#BD5319]/30'
                    : 'bg-white/10 text-[#8C847C] border border-white/10'
                }`}
              >
                {selectedRituals.length >= 3 ? 'Proceed to Payment' : 'Select more'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
