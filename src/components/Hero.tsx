import React from 'react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-[#2A1208] text-white min-h-screen flex items-center overflow-hidden pt-16 md:pt-24"
    >
      {/* Background decorative mandala rings */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Large faint ring â€” top right */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-[#C9A84C]/8"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
        />
        {/* Medium ring */}
        <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full border border-[#C9A84C]/6" />
        {/* Small ring */}
        <div className="absolute top-0 right-0 w-[220px] h-[220px] rounded-full border border-[#BD5319]/10" />

        {/* Bottom left accent */}
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(189,83,25,0.06) 0%, transparent 70%)' }}
        />

        {/* Subtle dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-8 items-center">

        {/* Left â€” Text Content */}
        <div className="flex flex-col items-start">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="section-divider" />
            <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
              Memory Â· Ritual Â· Continuity
            </p>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-light leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em', fontSize: 'clamp(1.75rem, 2.5rem + 2vw, 4rem)' }}
          >
            The rituals your family{' '}
            <span className="italic font-normal text-[#D4AF37]">carries</span> deserve to be{' '}
            <span className="relative inline-block font-semibold">
              written down.
              <span
                className="absolute bottom-1 left-0 w-full h-0.5 bg-[#BD5319]"
                style={{ borderRadius: '1px' }}
              />
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-[#f5ede2] text-sm md:text-base font-light leading-relaxed max-w-md mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            The greatest wealth we can pass on to our children is not just property or gold, but the knowledge of who they are and where they come from.
          </p>
          <p
            className="text-[#de8721] text-xs md:text-sm font-light leading-relaxed max-w-md mb-10"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Hamari Virasat ensures that even a grandchild born across the globe can hear their grandmother's voice and know exactly how she lit the evening diya in her home.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
            <a
              href="#pricing"
              id="hero-pay-now"
              className="inline-flex items-center justify-center gap-2 bg-[#BD5319] hover:bg-[#A34310] text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#BD5319]/30 active:scale-95"
            >
              Preserve My Family&apos;s Rituals
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#book-a-call"
              id="hero-book-call"
              className="inline-flex items-center justify-center gap-2 text-[#8C847C] hover:text-white text-base font-medium px-8 py-4 rounded-xl border border-[#5E2E14] hover:border-[#8C847C]/50 transition-all duration-200"
            >
              Book a Free Call
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#BD5319]" />
              <span className="text-[#5C564F] text-xs">Rituals documented</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#A0E0F0]" />
              <span className="text-[#5C564F] text-xs">Yours forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8C847C]" />
              <span className="text-[#5C564F] text-xs">100% personal</span>
            </div>
          </div>

          {/* Right — Decorative Image */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
            />

            {/* Image */}
            <div className="relative w-full max-w-lg">
              <img 
                src="/hero-rituals.png" 
                alt="Hamari Virasat Rituals" 
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[#8C847C] text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#8C847C] to-transparent" />
      </div>
    </section>
  );
}

