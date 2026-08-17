'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'What is Hamari Virasat?',
    a: 'Hamari Virasat is a secure digital-first family rituals archiving platform. We help you systematically record your family’s unique traditions, food, recipes, ritual-specific songs, and document ritual-specific images. We turn your rituals into a structured, permanent family legacy.',
  },
  {
    q: 'What format does the final document come in?',
    a: 'You receive a beautifully formatted PDF — designed with heritage typography and structured sections, built to be printed and kept. It is not a data export or a plain text file. It is a document that looks like the heirloom it is.',
  },
  {
    q: 'How long does it take to receive the finished document?',
    a: 'Once your intake form is fully completed, we assemble and deliver your document within 7 working days. Most families complete their form over 3–7 days, working in sittings with their elders. You can save and resume at any time — there is no deadline.',
  },
  {
    q: 'Can we add our own custom family rituals which are not listed?',
    a: 'Absolutely. Every family has its own unique flavor. While we provide pre-built baseline templates, your family can create custom entries for any regional or unique traditions that fall outside the documented ceremonies.',
  },
  {
    q: 'How do you collect stories from your elders?',
    a: 'We make it effortless. The platform features an intuitive, guided template where you can write details from your memory or by asking your elders.',
  },
  {
    q: 'Do my grandparents need to download a mobile app?',
    a: 'Not at all. We know technology can be an obstacle for elders. They can contribute their memories, songs, and stories simply by replying to voice notes or text prompts inside WhatsApp.',
  },
  {
    q: 'What if my elders speak a regional language or dialect?',
    a: 'We embrace it. Regional language support is being incorporated. Our platform features an intake pipeline that captures raw regional audio and transcribes/translates the dialect into a clean, written format for your review before logging it in your digital guide.',
  },
  {
    q: 'Are there hidden charges for custom rituals?',
    a: 'No hidden surprises. The launching plan includes 3 rituals at a flat discounted rate, and additional rituals can be added anytime.',
  },
  {
    q: 'Who has access to our family\'s data and media?',
    a: 'Your privacy is our highest priority. Your cloud vault is encrypted and entirely private. No external user or search engine can view your stories, photos, or voice clips without your direct invitation.',
  },
  {
    q: 'Can my siblings or cousins contribute to the same vault?',
    a: 'Yes! You can collaborate easily by sharing your secure link with family members so they can add details, songs, and photographs to your shared vault.',
  },
  {
    q: 'What if I don\'t remember all the details of a ritual?',
    a: 'That is completely fine. Fill in what you know, and leave the rest for later. Our save-and-resume feature means you can go back to consult a grandparent, look through old photos, or gather the family before finishing.',
  },
  {
    q: 'What is your refund policy?',
    a: 'We offer a 7-day money-back guarantee. If you are not completely satisfied after completing the intake form and receiving your document, contact us within 7 days of delivery and we will make it right, or issue a full refund.',
  },
  {
    q: 'How do I get started with the onboarding process?',
    a: 'Once you subscribe, you will receive an email with your secure link. You can complete step-by-step ritual prompts and upload high-definition family media. You can take your time to ask and collect information from your elders and family members.',
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
