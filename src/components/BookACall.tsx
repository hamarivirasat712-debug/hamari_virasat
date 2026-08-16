import React from 'react';
import Script from 'next/script';

export default function BookACall() {
  return (
    <section id="book-a-call" className="bg-[#FAF6F0] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — Copy */}
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
                href="https://calendly.com/hamarivirasat712"
                target="_blank"
                rel="noopener noreferrer"
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

          {/* Right — Calendly inline widget */}
          <div className="relative">
            <div className="bg-white border border-[#EFEAE2] rounded-2xl overflow-hidden shadow-lg shadow-[#2A1208]/5 min-h-[700px] flex items-center justify-center">
              <div 
                className="calendly-inline-widget w-full" 
                data-url="https://calendly.com/hamarivirasat712?hide_landing_page_details=1&hide_gdpr_banner=1" 
                style={{ minWidth: '320px', height: '700px' }} 
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </section>
  );
}

