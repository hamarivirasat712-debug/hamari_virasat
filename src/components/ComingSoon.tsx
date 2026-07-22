'use client';

import React, { useState } from 'react';

const comingSoonRituals = [
  {
    number: '10',
    title: 'Boy\'s Wedding',
    category: 'Wedding (Groom)',
    description: 'The full set of groom-side ceremonies — Tilak, Baarat, Jaimala, and the post-wedding rituals specific to the groom\'s family.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l3 8h8l-6.5 5 2.5 8L14 20l-7 5 2.5-8L3 12h8l3-8z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '11',
    title: 'Girl\'s Wedding',
    category: 'Wedding (Bride)',
    description: 'The bride-side ceremonies — Mehendi, Haldi, Sangeet, and the deeply emotional rituals that mark a daughter\'s departure.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5c-2.5 0-4.5 2-4.5 4.5 0 1.5.7 2.8 1.8 3.7C8.5 14.3 7 16.5 7 19h14c0-2.5-1.5-4.7-4.3-5.8 1.1-.9 1.8-2.2 1.8-3.7C18.5 7 16.5 5 14 5z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 23c0-1 .5-2.5 4-2.5s4 1.5 4 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '12',
    title: 'Family Last Rituals',
    category: 'Ancestral',
    description: 'The Antim Sanskar, the Dasah, the Terahvin — end-of-life ceremonies that carry profound meaning and deserve the most careful documentation.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M14 18v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function ComingSoon() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openModal = (title: string) => {
    setSelectedRitual(title);
    setModalOpen(true);
    setSubmitted(false);
    setEmail('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to your backend/Google Sheet
    setSubmitted(true);
  };

  return (
    <>
      <section id="coming-soon" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#EFEAE2]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* Header */}
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
                Coming Soon
              </p>
            </div>
            <h2
              className="font-serif text-3xl md:text-4xl font-normal text-[#2A1208] leading-tight mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              More rituals are on their way
            </h2>
            <p className="text-[#8C847C] text-base font-light leading-relaxed">
              Join the waitlist for any upcoming ritual and be the first to know when it launches — at a reserved early-access price.
            </p>
          </div>

          {/* Locked cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comingSoonRituals.map((ritual) => (
              <button
                key={ritual.number}
                onClick={() => openModal(ritual.title)}
                className="group relative bg-white border border-[#EFEAE2] rounded-2xl p-7 text-left hover:border-[#BD5319]/30 hover:shadow-lg hover:shadow-[#2A1208]/5 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Blur overlay */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                  <div className="w-10 h-10 bg-[#BD5319] rounded-full flex items-center justify-center shadow-lg shadow-[#BD5319]/40">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 7V5a4 4 0 018 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <rect x="2" y="7" width="12" height="8" rx="2" stroke="white" strokeWidth="1.5"/>
                      <circle cx="8" cy="11" r="1" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-[#2A1208] text-sm font-semibold">Join Waitlist</span>
                </div>

                {/* Card content */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-[#FAF6F0] border border-[#EFEAE2] rounded-xl flex items-center justify-center text-[#8C847C]">
                    {ritual.icon}
                  </div>
                  {/* Lock icon */}
                  <div className="w-7 h-7 bg-[#FAF6F0] border border-[#EFEAE2] rounded-full flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 5.5V4a3 3 0 016 0v1.5" stroke="#8C847C" strokeWidth="1.2" strokeLinecap="round"/>
                      <rect x="1.5" y="5.5" width="9" height="6" rx="1.5" stroke="#8C847C" strokeWidth="1.2"/>
                      <circle cx="6" cy="8.5" r="0.75" fill="#8C847C"/>
                    </svg>
                  </div>
                </div>

                <span className="text-[#BD5319] text-xs font-semibold tracking-wide px-2.5 py-1 rounded-full bg-[#BD5319]/8 inline-block mb-3">
                  {ritual.category}
                </span>
                <h3
                  className="font-serif text-xl text-[#2A1208] font-normal mb-3"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {ritual.title}
                </h3>
                <p className="text-[#8C847C] text-sm leading-relaxed font-light">
                  {ritual.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[#BD5319] text-xs font-medium">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Notify me when available
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="bg-[#2A1208] border border-[#5E2E14] rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {!submitted ? (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[#BD5319] text-xs font-bold tracking-[0.25em] uppercase mb-2">Join Waitlist</p>
                    <h3
                      className="font-serif text-2xl text-white font-normal"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {selectedRitual}
                    </h3>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-[#5C564F] hover:text-white transition-colors p-1"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                <p className="text-[#8C847C] text-sm font-light mb-6 leading-relaxed">
                  Be the first to know when {selectedRitual} documentation launches — with a reserved early-access price.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-[#3E1A0C] border border-[#5E2E14] rounded-xl px-4 py-3.5 text-white placeholder-[#5C564F] text-sm focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#BD5319] hover:bg-[#A34310] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#BD5319]/30 active:scale-95"
                  >
                    Notify Me When It Launches
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-[#BD5319]/15 border border-[#BD5319]/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#BD5319" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  You&apos;re on the list
                </h3>
                <p className="text-[#8C847C] text-sm font-light mb-6">
                  We&apos;ll email you the moment {selectedRitual} launches — at a reserved early price.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-[#BD5319] text-sm font-medium hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
