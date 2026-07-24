import React from 'react';

const deliverables = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#C9A84C" strokeWidth="1.5"/>
        <path d="M14 2v6h6M9 13h6M9 17h4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'A beautifully formatted PDF',
    body: 'Your family\'s complete ritual record, laid out with care â€” heritage typography, structured sections, and a format designed to be printed and kept.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="#C9A84C" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Every relative\'s role documented',
    body: 'Who leads the Puja, who sings, who carries the Kalash, who stands where. The specific role of each family member â€” captured in your own words.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#C9A84C" strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" stroke="#C9A84C" strokeWidth="1.2"/>
        <path d="M21 15l-5-5L5 21" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Your family\'s photographs',
    body: 'Upload the photos that matter most. We embed them into your document â€” with captions and context so future generations understand what they are seeing.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Samagri & ritual steps',
    body: 'The complete Samagri list for each ceremony. The exact sequence of ritual steps. The prayers and mantras â€” written the way your family says them, not a generic version.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18V5l12-2v13" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="18" r="3" stroke="#C9A84C" strokeWidth="1.5"/>
        <circle cx="18" cy="16" r="3" stroke="#C9A84C" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Songs and their meanings',
    body: 'The Godbharai geet, the Bidai songs, the Vivah Mandap hymns â€” recorded in your family\'s language and script, along with what each song means and when it is sung.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Ancestral roots captured',
    body: 'Gotra, Kuldevi, Kuldevta â€” the foundational roots of your lineage, documented before the form even begins. The document starts with who your family is, not just what they do.',
  },
];

export default function WhatYouReceive() {
  return (
    <section id="what-you-receive" className="bg-[#2A1208] py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
              The Heirloom
            </p>
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-5"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            What your family{' '}
            <span className="italic text-[#C9A84C]">receives</span>
          </h2>
          <p className="text-[#8C847C] text-base md:text-lg font-light leading-relaxed">
            Not a data export. Not a digital file to be forgotten in a folder. A structured, beautiful record
            of your family&apos;s rituals â€” formatted to be printed, framed, and passed down.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Left â€” Document preview mockup */}
          <div className="relative">
            {/* Glow */}
            <div
              className="absolute -inset-8 rounded-3xl opacity-15 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
            />

            <div className="relative bg-[#FAF6F0] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              {/* Document header */}
              <div className="bg-[#2A1208] px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40" />
                    <span className="text-[#C9A84C] text-sm font-medium tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>
                      Hamari Virasat
                    </span>
                  </div>
                  <span className="text-[#5C564F] text-xs">Heritage Record Â· 2026</span>
                </div>
                <h3
                  className="font-serif text-2xl text-white font-normal italic"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  The Sharma Family
                </h3>
                <div className="flex gap-4 mt-3">
                  {['Bharadwaja Gotra', 'Vaishno Devi', 'Rajasthan'].map((tag) => (
                    <span key={tag} className="text-[#5C564F] text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Document body */}
              <div className="px-8 py-6">
                {/* Ritual entry */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#C9A84C] text-xs font-bold tracking-wider uppercase">01 Â· Godbharai</span>
                    <span className="text-xs text-[#BD5319] bg-[#BD5319]/10 px-2 py-0.5 rounded-full">Prebirth</span>
                  </div>

                  {[
                    { label: 'Samagri', value: 'Sindoor, kumkum, turmeric, coconut, 7 types of grains, silk fabric...' },
                    { label: 'Ritual Steps', value: 'Ganesh Puja â†’ Kanya Puja â†’ Godbharai Ritual â†’ Blessings â†’ Feast' },
                    { label: 'Lead Role', value: 'Mama (maternal uncle) seats the mother-to-be, presents the coconut' },
                    { label: 'Song', value: '"Aayi ayi Godbharai ki raat..." â€” sung by maternal aunts only' },
                  ].map(({ label, value }) => (
                    <div key={label} className="mb-3">
                      <p className="text-[#5C564F] text-xs uppercase tracking-wider font-medium mb-1">{label}</p>
                      <p className="text-[#2A1208] text-xs leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[#EFEAE2] pt-4 flex items-center gap-3 text-[#8C847C] text-xs">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1l1.5 4.5H13l-3.5 2.5 1.5 4.5L7 10l-4 2.5 1.5-4.5L1 5.5h4.5L7 1z" stroke="#C9A84C" strokeWidth="1" strokeLinejoin="round"/>
                  </svg>
                  <span>+8 more rituals documented in this record</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right â€” Deliverables list */}
          <div className="space-y-5">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-[#3E1A0C] border border-[#5E2E14] rounded-xl hover:border-[#C9A84C]/25 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-[#2A1208] border border-[#5E2E14] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-[#C9A84C]/30 transition-all duration-200">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1.5" style={{ fontFamily: 'var(--font-sans)' }}>
                    {item.title}
                  </h4>
                  <p className="text-[#5C564F] text-xs leading-relaxed font-light">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

