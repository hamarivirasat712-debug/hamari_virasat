import React from 'react';

export default function BookACall() {
  return (
    <section id="book-a-call" className="bg-[#FAF6F0] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left â€” Copy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
                Book a Free Call
              </p>
            </div>
            <h2
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#2A1208] leading-tight mb-5"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Still having doubts?{' '}
              <span className="italic text-[#BD5319]">Talk to us.</span>
            </h2>
            <p className="text-[#8C847C] text-base font-light leading-relaxed mb-6">
              We know that handing over your family&apos;s memories to anyone requires trust. Book a free 15-minute call, ask us everything, and decide when you&apos;re ready.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'We\'ll walk you through exactly what\'s included',
                'Answer any questions about your specific rituals',
                'Explain how the intake form works, step by step',
                'No pressure, no obligation',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#BD5319]/10 border border-[#BD5319]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3" stroke="#BD5319" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[#5C564F] text-sm font-light">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                id="book-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#2A1208] hover:bg-[#3E1A0C] text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-black/20 active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 10.667c-1.2-1.2-2.467-1-3.2-.333l-.9.9c-.267.267-.667.267-.933.067-1.2-.8-2.667-2.133-3.6-3.467-.2-.267-.133-.6.067-.8l.9-.9c.667-.733.867-2-.333-3.2L5.2 2.133c-.933-.933-2.133-.867-2.8-.2l-.8.8C.4 3.933 1.6 7.067 4.333 9.8c2.733 2.733 5.867 3.933 7.067 2.733l.8-.8c.667-.667.733-1.933-.2-3.067z" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Schedule a Free Call
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 text-[#8C847C] hover:text-[#2A1208] text-sm font-medium px-7 py-3.5 rounded-xl border border-[#EFEAE2] hover:border-[#2A1208]/20 transition-all duration-200"
              >
                I&apos;m ready go to pricing
              </a>
            </div>
          </div>

          {/* Right â€” Calendly embed placeholder */}
          <div className="relative">
            <div className="bg-white border border-[#EFEAE2] rounded-2xl overflow-hidden shadow-lg shadow-[#2A1208]/5">
              {/* Header */}
              <div className="bg-[#2A1208] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#BD5319] rounded-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="white" strokeWidth="1.2"/>
                      <path d="M5 2v2M9 2v2" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M2 6h10" stroke="white" strokeWidth="1.2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Book a Free 15-min Call</p>
                    <p className="text-[#5C564F] text-xs">with Hamari Virasat</p>
                  </div>
                </div>
              </div>

              {/* Calendar placeholder */}
              <div className="p-6">
                <p className="text-[#8C847C] text-xs uppercase tracking-wider mb-4">Select a date</p>
                {/* Fake calendar grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-center text-[#8C847C] text-xs py-1 font-medium">{d}</div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2;
                    const isToday = day === 13;
                    const isAvailable = day > 0 && day <= 31 && ![1, 7, 8, 14, 15, 21, 22].includes(day);
                    return (
                      <div
                        key={i}
                        className={`text-center text-xs py-1.5 rounded-lg cursor-pointer transition-all ${
                          day <= 0 || day > 31
                            ? 'text-transparent'
                            : isToday
                            ? 'bg-[#BD5319] text-white font-semibold'
                            : isAvailable
                            ? 'text-[#2A1208] hover:bg-[#BD5319]/10 font-medium'
                            : 'text-[#EFEAE2]'
                        }`}
                      >
                        {day > 0 && day <= 31 ? day : ''}
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[#EFEAE2] pt-4">
                  <p className="text-[#8C847C] text-xs mb-3">Available times 13 July</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'].map((time) => (
                      <button
                        key={time}
                        className="text-[#2A1208] text-xs border border-[#EFEAE2] rounded-lg py-2 hover:bg-[#BD5319] hover:text-white hover:border-[#BD5319] transition-all duration-150 font-medium"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="text-center text-[#8C847C] text-xs mt-4 font-light">
              Calendly embed will be configured with your link at launch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

