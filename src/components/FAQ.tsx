'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'What format does the final document come in?',
    a: 'You receive a beautifully formatted PDF — designed with heritage typography and structured sections, built to be printed and kept. It is not a data export or a plain text file. It is a document that looks like the heirloom it is.',
  },
  {
    q: 'How long does it take to receive the finished document?',
    a: 'Once your intake form is fully completed, we assemble and deliver your document within 7 working days. Most families complete their form over 3–7 days, working in sittings with their elders. You can save and resume at any time — there is no deadline.',
  },
  {
    q: 'What if I don\'t remember all the details of a ritual?',
    a: 'That is completely fine. Fill in what you know, and leave the rest for later. Our save-and-resume feature means you can go back to consult a grandparent, look through old photos, or gather the family before finishing. Partial records are better than none — and we will work with what you have.',
  },
  {
    q: 'Can I document more than 3 rituals, or fewer?',
    a: 'Our standard package covers any 3 rituals of your choice at one flat price. If you would like to document more, each additional ritual can be added at the same per-ritual rate — just mention it in your enquiry or after payment. We do not offer a single-ritual option as a minimum, because three rituals ensures your document is a meaningful heritage record, not just a fragment.',
  },
  {
    q: 'What is your refund policy?',
    a: 'If you are not satisfied after completing the intake form and receiving your document, we offer a 7-day satisfaction window. Contact us within 7 days of delivery and we will make it right, or issue a full refund. We stand behind the quality of every document we produce.',
  },
  {
    q: 'Is my family\'s information kept private?',
    a: 'Completely. Your family\'s information — the Gotra, the songs, the ritual details, the photographs — is used only to produce your document and is never shared with any third party. We take the privacy of something this personal very seriously.',
  },
  {
    q: 'What if my family has rituals that are not in your standard list?',
    a: 'We have designed the intake form with a custom section for family-specific or regional rituals that fall outside the 9 documented ceremonies. If your family observes a unique ritual, you can describe it in full and we will include it in your document. No family\'s heritage should be left out.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#2A1208] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
              Common Questions
            </p>
          </div>
          <h2
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Everything you need to{' '}
            <span className="italic text-[#C9A84C]">know</span>
          </h2>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'border-[#C9A84C]/30 bg-[#3E1A0C]' : 'border-[#5E2E14] bg-[#3E1A0C]/50'
              }`}
            >
              <button
                className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-white text-sm md:text-base font-medium leading-relaxed">
                  {faq.q}
                </span>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                    openIndex === i ? 'border-[#C9A84C]/50 bg-[#C9A84C]/10 rotate-180' : 'border-[#5E2E14]'
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4.5l4 4 4-4" stroke={openIndex === i ? '#C9A84C' : '#5C564F'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-[#8C847C] text-sm leading-relaxed font-light border-t border-[#5E2E14] pt-5">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <p className="text-[#5C564F] text-sm mb-4">Still have a question?</p>
          <a
            href="#book-a-call"
            className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white text-sm font-medium transition-colors"
          >
            Book a free 15-minute call — we&apos;ll answer everything
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
