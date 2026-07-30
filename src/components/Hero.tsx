import React from 'react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-[#2A1208] text-white min-h-screen flex items-center overflow-hidden pt-24"
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
            className="font-serif text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em' }}
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
            className="text-[#f5ede2] text-base md:text-lg font-light leading-relaxed max-w-md mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            The greatest wealth we can pass on to our children is not just property or gold, but the knowledge of who they are and where they come from.
          </p>
          <p
            className="text-[#de8721] text-sm md:text-base font-light leading-relaxed max-w-md mb-10"
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
        </div>

        {/* Right â€” Decorative heritage card */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
          />

          {/* Heritage document card */}
          <div className="relative w-full max-w-sm">
            {/* Card glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#C9A84C]/30 via-[#BD5319]/10 to-transparent" />

            <div className="relative bg-[#3E1A0C] border border-[#5E2E14] rounded-2xl p-8 overflow-hidden">
              {/* Card inner texture */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 8px)',
                }}
              />

              {/* Card content */}
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase">
                    Family Heritage Record
                  </p>
                  <span className="text-[#5E2E14] text-xs">2026</span>
                </div>

                <div className="mb-6">
                  <p className="text-[#f5ede2] text-xs mb-1">Family</p>
                  <p className="font-serif text-2xl text-white italic" style={{ fontFamily: 'var(--font-serif)' }}>
                    The Sharma Kula
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Gotra', value: 'Bharadwaja' },
                    { label: 'Kuldevi', value: 'Vaishno Devi' },
                    { label: 'Kuldevta', value: 'Shiva' },
                    { label: 'Region', value: 'Rajasthan' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#2A1208]/60 rounded-lg p-3">
                      <p className="text-[#f5ede2] text-xs uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-[#C9A84C] text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#5E2E14] pt-4">
                  <p className="text-[#f5ede2] text-xs mb-3">Rituals Preserved</p>
                  <div className="flex flex-wrap gap-2">
                    {['Godbharai', 'Mundan', 'Vivah Mandap', 'Pheras', '+5 more'].map((r) => (
                      <span
                        key={r}
                        className="text-[#f5ede2] text-xs bg-[#2A1208] border border-[#5E2E14] rounded-full px-3 py-1"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#BD5319] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#BD5319]/40">
              Yours Forever âœ¦
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

