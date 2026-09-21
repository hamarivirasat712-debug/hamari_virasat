import React from 'react';
import SampleDocumentCover from './SampleDocumentCover';

export default function WhatYouReceive() {
  return (
    <section id="what-you-receive" className="bg-[#2A1208] py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ═══ SAMPLE DOCUMENT PREVIEW + DOWNLOAD CTA ═══ */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Cover image / placeholder */}
          <div className="relative flex-shrink-0 w-full max-w-[280px] md:max-w-[320px] group">
            {/* Glow */}
            <div
              className="absolute -inset-6 rounded-3xl opacity-20 blur-2xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
            />
            {/* Cover slot — swap src for real cover image when available */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-[#5E2E14] group-hover:border-[#C9A84C]/30 transition-all duration-300">
              <SampleDocumentCover />
            </div>
            {/* "Preview only" pill */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#2A1208] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
              Sample · No login required
            </div>
          </div>

          {/* Right — copy + CTA */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
                See It First
              </p>
            </div>
            <h3
              className="font-serif text-2xl sm:text-3xl font-normal text-white leading-tight mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              See exactly what your{' '}
              <span className="italic text-[#C9A84C]">family receives</span>
            </h3>
            <p className="text-[#8C847C] text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Before you commit to anything, download a finished sample ritual document — the same format and depth your family will receive. No account, no payment needed.
            </p>
            {/* Download CTA */}
            <a
              href="/sample-ritual-document.pdf"
              download
              id="download-sample-pdf"
              className="inline-flex items-center gap-3 bg-[#C9A84C] hover:bg-[#D4AF37] text-[#2A1208] font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#C9A84C]/20 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 7l3 4 3-4M3 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Sample PDF
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
