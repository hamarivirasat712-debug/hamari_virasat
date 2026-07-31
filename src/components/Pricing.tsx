import React from 'react';

const inclusions = [
  'Your choice of any 3 rituals — documented in full',
  'Complete Samagri list for each ceremony',
  'Ritual steps in your family\'s sequence',
  'Songs, prayers & mantras — as your family says them',
  'Every relative\'s role, captured precisely',
  'Gotra, Kuldevi & Kuldevta — your ancestral roots',
  'Photo integration with captions & context',
  'Beautifully formatted PDF heirloom document',
  'Delivered to your inbox within 7 days of form completion',
  'Save & resume — fill at your own pace over multiple sittings',
  '25% discount on your next ritual documentation',
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#FAF6F0] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider" />
            <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
              Investment
            </p>
            <div className="section-divider" style={{ background: 'linear-gradient(to left, #BD5319, #C9A84C)' }} />
          </div>
          <h2
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#2A1208] leading-tight mb-5"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            One price. Any 3 rituals.{' '}
              <span className="italic text-[#BD5319]">Yours forever.</span>
          </h2>
          <p className="text-[#8C847C] text-base font-light leading-relaxed">
            No tiers. No hidden fees. No subscriptions. Pick any 3 rituals from our collection of 9 — each one documented in full at one flat price.
          </p>
        </div>

        {/* Pricing card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute -inset-px rounded-3xl"
              style={{ background: 'linear-gradient(135deg, #C9A84C40, #BD531920, transparent 60%)' }}
            />

            <div className="relative bg-[#2A1208] rounded-3xl overflow-hidden">
              {/* Top band */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(to right, #BD5319, #C9A84C, #BD5319)' }}
              />

              <div className="p-8 md:p-12">
                {/* Price */}
                {/* Price */}
                <div className="flex flex-col gap-4 mb-3">
                  <div className="flex items-end gap-3">
                    <span className="text-[#5C564F] text-lg md:text-2xl mb-2 font-medium">₹</span>
                    <span className="font-sans text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-none tracking-tight">
                      501 <span className="text-3xl md:text-4xl text-[#8C847C] line-through ml-2 font-medium">999</span>
                    </span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-[#5C564F] text-lg md:text-2xl mb-1 font-medium">$</span>
                    <span className="font-sans text-3xl md:text-4xl lg:text-5xl text-[#C9A84C] font-semibold leading-none tracking-tight">
                      10 <span className="text-xl md:text-2xl text-[#8C847C] line-through ml-2 font-medium">15</span> <span className="text-sm md:text-base text-[#5C564F] ml-2 tracking-wide uppercase">Global</span>
                    </span>
                  </div>
                </div>
                <p className="text-[#5C564F] text-sm mb-2">One-time payment · Any 3 of 9 rituals · No subscription</p>
                <p className="text-[#C9A84C] text-sm font-medium mb-10">
                  ✦ Early access price — limited time offer
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a
                    href="/intake"
                    id="pricing-pay-now"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#BD5319] text-[#2A1208] hover:text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#BD5319]/30 active:scale-95 text-center"
                  >
                    Preserve My Family&apos;s Rituals
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a
                    href="#book-a-call"
                    id="pricing-book-call"
                    className="flex-1 inline-flex items-center justify-center text-[#8C847C] hover:text-white text-base font-medium px-8 py-4 rounded-xl border border-[#5E2E14] hover:border-white/20 transition-all duration-200 text-center"
                  >
                    Contact Us
                  </a>
                </div>

                {/* Divider */}
                <div className="border-t border-[#5E2E14] pt-8 mb-8">
                  <p className="text-[#8C847C] text-xs uppercase tracking-wider font-medium mb-5">
                    Everything that&apos;s included:
                  </p>
                  <div className="space-y-3">
                    {inclusions.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#A0B0E0]/15 border border-[#A0B0E0]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                             <path d="M1.5 4l2 2 3-3" stroke="#A0B0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </div>
                        <span className="text-[#8C847C] text-sm font-light leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: '🔒', text: 'Secure Razorpay checkout' },
                    { icon: '↩️', text: '7-day satisfaction guarantee' },
                    { icon: '📧', text: 'Confirmation email instantly' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="text-center">
                      <div className="text-xl mb-1.5">{icon}</div>
                      <p className="text-[#5C564F] text-xs leading-tight">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Below card note */}
          <p className="text-center text-[#8C847C] text-xs mt-6 font-light">
            Payments processed securely via Razorpay · UPI, cards & net banking accepted
          </p>
        </div>

      </div>
    </section>
  );
}
