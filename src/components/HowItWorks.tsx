import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Choose rituals/Festivals',
    body:
      'Select any 3 rituals/festivals from the list. If your ritual/festival is not listed, select the custom ritual/festival.',
    detail: 'Godbharai, Mundan, Vivah Mandap, Pheras & more',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="#C9A84C" strokeWidth="1.5"/>
        <path d="M10 12h12M10 16h12M10 20h8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="8" r="4" fill="#BD5319"/>
        <path d="M22 8l1.5 1.5L26 6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Treasure it effortlessly',
    body:
      'Take your time to fill out the form using the link provided. Once you submit all the information, we will send you draft version for approval.',
    detail: '6 sub-sections per ritual · Save & resume anytime',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 4h16a2 2 0 012 2v20a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#C9A84C" strokeWidth="1.5"/>
        <path d="M11 10h10M11 14h10M11 18h7" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="6" fill="#BD5319"/>
        <path d="M21 24l2 2 4-4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Preserve it forever',
    body:
      'After your approval, you will receive a beautiful document to preserve, share and treasure.',
    detail: 'Beautifully formatted PDF · Delivered to your inbox',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3 9h9l-7 5.5 3 9L16 22l-8 5.5 3-9L4 13h9l3-9z" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="4" fill="#BD5319" opacity="0.8"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#2A1208] py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
              The Process
            </p>
          </div>
          <h2
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-5"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Three steps to a heritage{' '}
            <span className="italic text-[#C9A84C]">that lasts</span>
          </h2>
          <p className="text-[#8C847C] text-base md:text-lg font-semibold leading-relaxed">
            No writing skills needed. No historian required. Just your family&apos;s stories, and a little time.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5E2E14] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Step card */}
                <div className="bg-[#3E1A0C] border border-[#5E2E14] rounded-2xl p-8 h-full hover:border-[#C9A84C]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40">

                  {/* Number + Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="font-serif text-5xl font-bold text-[#3E1A0C] group-hover:text-[#5E2E14] transition-colors duration-300 leading-none select-none"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        WebkitTextStroke: '1px #5E2E14',
                        color: 'transparent',
                      }}
                    >
                      {step.number}
                    </span>
                    <div className="w-14 h-14 bg-[#2A1208] border border-[#5E2E14] rounded-xl flex items-center justify-center group-hover:border-[#C9A84C]/20 transition-all duration-300">
                      {step.icon}
                    </div>
                  </div>

                  <h3
                    className="font-serif text-xl text-white font-normal mb-4"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white text-sm leading-relaxed font-light mb-6">
                    {step.body}
                  </p>

                </div>

                {/* Arrow between steps (mobile) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-2">
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                      <path d="M8 0v20M2 14l6 8 6-8" stroke="#5E2E14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline note */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-[#3E1A0C] border border-[#5E2E14] rounded-xl" style={{ borderLeft: '3px solid #C9A84C' }}>
          <div className="w-10 h-10 bg-[#BD5319]/10 border border-[#BD5319]/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="#BD5319" strokeWidth="1.2"/>
              <path d="M9 5.5v3.5l2.5 2.5" stroke="#BD5319" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-1">
              Fill at your own pace — no rush, no deadline
            </p>
            <p className="text-[#C9A84C] text-xs font-semibold">
              After payment, you receive a save-and-resume link. Gather your family, consult your elders, and come back when you&apos;re ready. Most families complete their form over 3–7 days.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
