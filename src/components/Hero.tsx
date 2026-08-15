import React from 'react';

// ── Inline decorative SVG components ──────────────────────────────────────

function TempleBell({ width = 44, className = '' }: { width?: number; className?: string }) {
  const h = Math.round(width * 1.55);
  return (
    <svg width={width} height={h} viewBox="0 0 50 78" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="25" y1="0" x2="25" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 8 Q25 3 31 8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M25 11 C13 12 6 24 6 37 L6 52 Q6 55 9 56 L41 56 Q44 55 44 52 L44 37 C44 24 37 12 25 11Z"
        stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M14 25 Q25 22 36 25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M11 37 Q25 34 39 37" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M10 47 Q25 44 40 47" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M3 56 Q25 64 47 56" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <line x1="25" y1="57" x2="25" y2="66" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="25" cy="70" r="4.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="16" cy="38" r="1.2" fill="currentColor" opacity="0.35" />
      <circle cx="34" cy="38" r="1.2" fill="currentColor" opacity="0.35" />
      <circle cx="25" cy="36" r="1.4" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function LotusFlower({ size = 90, className = '' }: { size?: number; className?: string }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  const innerPetals = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {petals.map((angle) => (
        <ellipse key={angle} cx="50" cy="22" rx="6.5" ry="16"
          transform={`rotate(${angle} 50 50)`} stroke="currentColor" strokeWidth="1.2" fill="none" />
      ))}
      {innerPetals.map((angle) => (
        <ellipse key={angle} cx="50" cy="31" rx="4.5" ry="10"
          transform={`rotate(${angle} 50 50)`} stroke="currentColor" strokeWidth="1" fill="none" opacity="0.75" />
      ))}
      <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="50" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
}

function Diya({ width = 38, className = '' }: { width?: number; className?: string }) {
  const h = Math.round(width * 1.3);
  return (
    <svg width={width} height={h} viewBox="0 0 44 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M22 2 C18 9 14 14 17 19 C19 23 25 23 27 19 C30 14 26 9 22 2Z"
        stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M22 8 C20 12 18 15 20 17 C21 19 23 19 24 17 C26 15 24 12 22 8Z"
        stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
      <line x1="22" y1="20" x2="22" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 25 L36 25 Q40 25 40 31 Q40 40 22 42 Q4 40 4 31 Q4 25 8 25Z"
        stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M36 27 Q42 29 44 34 Q39 31 35 31" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="13" cy="34" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="22" cy="36" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="31" cy="34" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ── Main Hero component ────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-[#D4AF37] text-[#2A1208] min-h-screen flex items-center overflow-hidden pt-16 md:pt-24"
    >
      {/* ═══════════════════ DECORATIVE BACKGROUND ═══════════════════ */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">

        {/* ── Large OM (ॐ) watermark — desktop only, right image column (Remove this as it overlap the image) ── */}
        <div
          className="hidden md:block absolute top-1/2 right-[2%] -translate-y-[52%] text-[#2A1208] opacity-[0.22]"
          style={{ fontSize: 'clamp(160px, 24vw, 340px)', fontFamily: 'Georgia, serif', lineHeight: 1 }}
        >
          ॐ
        </div>

        {/* ── Mandala rings — top-RIGHT corner (responsive sizes) ── */}
        <div className="absolute -top-14 -right-14 w-[280px] h-[280px] md:-top-20 md:-right-20 md:w-[560px] md:h-[560px] rounded-full border-[2.5px] border-[#2A1208]/55" />
        <div className="absolute -top-6 -right-6 w-[210px] h-[210px] md:-top-8 md:-right-8 md:w-[420px] md:h-[420px] rounded-full border-[1.5px] border-dashed border-[#5E2E14]/50" />
        <div className="absolute top-2 right-2 w-[150px] h-[150px] md:top-4 md:right-4 md:w-[300px] md:h-[300px] rounded-full border-2 border-[#2A1208]/48" />
        <div className="absolute top-10 right-10 w-[90px] h-[90px] md:top-16 md:right-16 md:w-[180px] md:h-[180px] rounded-full border border-[#2A1208]/52" />
        <div className="hidden md:block absolute top-[104px] right-[104px] w-[90px] h-[90px] rounded-full border border-[#5E2E14]/58" />
        <div
          className="absolute -top-20 -right-20 md:-top-28 md:-right-28 w-[320px] h-[320px] md:w-[640px] md:h-[640px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(42,18,8,0.12) 0%, transparent 65%)' }}
        />

        {/* ── Mandala rings — bottom-LEFT corner (responsive sizes) ── */}
        <div className="absolute -bottom-16 -left-16 w-[240px] h-[240px] md:-bottom-24 md:-left-24 md:w-[480px] md:h-[480px] rounded-full border-[2.5px] border-[#2A1208]/52" />
        <div className="absolute -bottom-8 -left-8 w-[175px] h-[175px] md:-bottom-12 md:-left-12 md:w-[350px] md:h-[350px] rounded-full border-[1.5px] border-dashed border-[#5E2E14]/48" />
        <div className="absolute -bottom-1 -left-1 w-[120px] h-[120px] md:-bottom-2 md:-left-2 md:w-[240px] md:h-[240px] rounded-full border-2 border-[#2A1208]/46" />
        <div className="hidden md:block absolute bottom-16 left-16 w-[120px] h-[120px] rounded-full border border-[#2A1208]/50" />
        <div
          className="absolute -bottom-24 -left-24 md:-bottom-36 md:-left-36 w-[280px] h-[280px] md:w-[560px] md:h-[560px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(42,18,8,0.10) 0%, transparent 65%)' }}
        />

        {/* ── Temple Bells — extreme corners only, well above text content ── */}
        {/* Bell far LEFT */}
        <div className="absolute top-0 left-2 text-[#2A1208] opacity-[0.65]">
          <TempleBell width={42} />
        </div>
        {/* Smaller bell — second from left, desktop only */}
        <div className="hidden md:block absolute top-1 left-[72px] text-[#2A1208] opacity-[0.50]">
          <TempleBell width={28} />
        </div>
        {/* Smaller bell — second from right, desktop only */}
        <div className="hidden md:block absolute top-1 right-[72px] text-[#2A1208] opacity-[0.50]">
          <TempleBell width={28} />
        </div>
        {/* Bell far RIGHT */}
        <div className="absolute top-0 right-2 text-[#2A1208] opacity-[0.65]">
          <TempleBell width={42} />
        </div>

        {/* ── Lotus flowers — bottom corners only, no overlap with any content ── */}
        {/* Large — bottom-RIGHT: responsive size */}
        <div className="absolute bottom-4 right-6 text-[#2A1208] opacity-[0.60]">
          <LotusFlower size={70} className="block md:hidden" />
          <LotusFlower size={110} className="hidden md:block" />
        </div>
        {/* Medium — bottom-LEFT: responsive size */}
        <div className="absolute bottom-4 left-6 text-[#2A1208] opacity-[0.55]">
          <LotusFlower size={55} className="block md:hidden" />
          <LotusFlower size={80} className="hidden md:block" />
        </div>

        {/* ── Diyas — desktop only (right column doesn't exist on mobile) ── */}
        <div className="hidden md:flex absolute bottom-28 right-16 items-end gap-8 text-[#2A1208] opacity-[0.60]">
          <Diya width={28} />
          <Diya width={34} />
          <Diya width={28} />
        </div>

        {/* ── Dot grid texture ── */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, #2A1208 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ════════════════════ MAIN CONTENT ════════════════════ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-28 grid md:grid-cols-2 gap-10 md:gap-8 items-center">

        {/* Left – Text Content */}
        <div className="flex flex-col items-start">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="section-divider" />
            <p className="text-[#6B2A07] text-xs font-bold tracking-[0.3em] uppercase">
              Legacy · Preservation · Continuity
            </p>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-light leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.01em', fontSize: 'clamp(2.1rem, 3rem + 2vw, 4.75rem)' }}
          >
            Your family&apos;s {' '}
            <span className="italic font-normal text-[#6B2A07]">authentic</span> traditions deserves to be{' '}
            <span className="relative inline-block font-semibold">
              documented.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-[#3D1A0A] text-base md:text-lg font-medium leading-relaxed max-w-md mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            More than any wealth, give your next generation the story of their identity.
          </p>
          <p
            className="text-[#5E2E14] text-sm md:text-base font-medium leading-relaxed max-w-md mb-10"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            We bridge the distance of time and geography. Keep your family&apos;s traditions, recipes and core memories alive, for generations to come.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
            <a
              href="#rituals"
              id="hero-pay-now"
              className="inline-flex items-center justify-center gap-2 text-[#2A1208] hover:text-[#5E2E14] text-base font-medium px-8 py-4 rounded-xl border border-[#2A1208]/40 hover:border-[#2A1208]/80 hover:bg-[#2A1208]/10 transition-all duration-200 active:scale-95"
            >
              Preserve My Family&apos;s Rituals
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#book-a-call"
              id="hero-book-call"
              className="inline-flex items-center justify-center gap-2 text-[#4A2010] hover:text-[#2A1208] text-base font-medium px-8 py-4 rounded-xl border border-[#2A1208]/30 hover:border-[#2A1208]/60 transition-all duration-200"
            >
              Book a Free Call
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6B2A07]" />
              <span className="text-[#3D1A0A] text-xs">Rituals documented</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#5E2E14]" />
              <span className="text-[#3D1A0A] text-xs">Yours forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2A1208]" />
              <span className="text-[#3D1A0A] text-xs">100% personal</span>
            </div>
          </div>
        </div>

        {/* Right — Decorative Image */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #2A1208 0%, transparent 70%)' }}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[#2A1208] text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#2A1208] to-transparent" />
      </div>
    </section>
  );
}
