import React from 'react';

const reasons = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="#BD5319" strokeWidth="1.5"/>
        <path d="M14 9v5l3.5 3.5" stroke="#BD5319" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Time is not on our side',
    body:
      'Every elder who passes carries irreplaceable knowledge with them. The Mama\'s role, the exact Samagri list, the order of the Pheras - none of it is written down, and each generation knows a little less than the one before.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 20l4-8 4 5 3-3 5 6" stroke="#BD5319" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="#BD5319" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Photos fade. Memory fades faster.',
    body:
      'You have the photos, but who remembers what song was sung, or why the ritual was performed that way? Hamari Virasat captures the context, not just the image - so the meaning is never lost.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 6c-4.418 0-8 3.582-8 8 0 2.21.897 4.21 2.343 5.657L14 25l5.657-5.343A7.97 7.97 0 0022 14c0-4.418-3.582-8-8-8z" stroke="#BD5319" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="2.5" stroke="#BD5319" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Your family is unique',
    body:
      'No two families celebrate a wedding the same way. The regional customs, the family-specific variations, the inside meanings - your rituals deserve to be documented in your words, not generic templates.',
  },

];

export default function WhyPreserve() {
  return (
    <section id="why-preserve" className="bg-[#F4DEB0] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
              Why It Matters
            </p>
          </div>
          <h2
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1208] leading-tight mb-5"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            What happens when no one writes{' '}
            <span className="italic text-[#BD5319]">it down?</span>
          </h2>
          <p className="text-[#0d0c0c] text-base md:text-lg font-light leading-relaxed">
            Most of us assume these traditions are being passed down automatically, but they aren&apos;t. While the rituals themselves may survive, the heart - the specific details will quietly fade away.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group bg-white border border-[#e8d5b0] rounded-2xl p-7 hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#2A1208]/5 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F4DEB0] border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/50 transition-all duration-300">
                {reason.icon}
              </div>
              <h3
                className="font-serif text-lg font-bold text-[#0d0c0c] mb-3"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {reason.title}
              </h3>
              <p className="text-[#0d0c0c] text-sm leading-relaxed font-light">
                {reason.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 bg-[#2A1208] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[#C9A84C] text-sm font-semibold">
              Start documenting before the details are lost to time.
            </p>
          </div>
          <a
            href="#pricing"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#BD5319] text-[#2A1208] hover:text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#BD5319]/30 active:scale-95"
          >
            Preserve My Family&apos;s Rituals
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}

