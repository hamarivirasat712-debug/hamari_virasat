'use client';

import React, { useState } from 'react';

const interests = [
  'General enquiry about the service',
  'Understanding what is documented',
  'Question about a specific ritual',
  'Pricing and payment options',
  'Custom or regional ritual not in standard list',
  'Other',
];

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          interest: form.interest,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', interest: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-[#3E1A0C] border border-[#5E2E14] rounded-xl px-4 py-3.5 text-white placeholder-[#5C564F] text-sm focus:outline-none focus:border-[#C9A84C]/50 transition-colors duration-200';

  return (
    <section id="enquiry" className="bg-[#2A1208] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-14 items-start">

          {/* ---- Left: Form ---- */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="section-divider" />
              <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
                Send a Message
              </p>
            </div>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Still have a question?{' '}
              <span className="italic text-[#C9A84C]">Write to us.</span>
            </h2>
            <p className="text-[#8C847C] text-base font-light leading-relaxed mb-10">
              We read every message personally and reply within one business day. No automated
              responses — just a real answer from someone who understands what you are trying to preserve.
            </p>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-[#BD5319]/15 border border-[#BD5319]/30 rounded-full flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 14l6 6 10-12" stroke="#BD5319" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3
                  className="font-serif text-2xl text-white font-normal mb-3"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Message received
                </h3>
                <p className="text-[#8C847C] text-sm font-light leading-relaxed max-w-xs">
                  Thank you for reaching out. We will get back to you within one business day.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[#C9A84C] text-sm hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#8C847C] text-xs uppercase tracking-wider mb-2">
                      Your Name <span className="text-[#BD5319]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rohit Sharma"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[#8C847C] text-xs uppercase tracking-wider mb-2">
                      Email Address <span className="text-[#BD5319]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="rohit@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 2: Phone + Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#8C847C] text-xs uppercase tracking-wider mb-2">
                      Phone{' '}
                      <span className="text-[#5C564F] normal-case tracking-normal font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[#8C847C] text-xs uppercase tracking-wider mb-2">
                      I am asking about <span className="text-[#BD5319]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="interest"
                        required
                        value={form.interest}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none cursor-pointer pr-10`}
                      >
                        <option value="" disabled>Select a topic</option>
                        {interests.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#3E1A0C]">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                      >
                        <path d="M2 4.5l4 4 4-4" stroke="#5C564F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label className="block text-[#8C847C] text-xs uppercase tracking-wider mb-2">
                    Your Message <span className="text-[#BD5319]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your family, the rituals you want to preserve, or any question you have..."
                    className={`${inputClass} resize-none leading-relaxed`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-[#BD5319] text-sm">
                    Something went wrong. Please try again or reach out via WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  id="enquiry-submit-btn"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#BD5319] hover:bg-[#A34310] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-10 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#BD5319]/30 active:scale-95"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send My Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ---- Right: Info + Contact options ---- */}
          <div className="md:pt-28">

            {/* What happens next card */}
            <div className="bg-[#3E1A0C] border border-[#5E2E14] rounded-2xl p-8 mb-6">
              <h3
                className="font-serif text-xl text-white font-normal mb-6"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                What happens after you write to us
              </h3>
              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'We read it personally',
                    body: 'Every enquiry is read by the team — no bots, no auto-responders.',
                  },
                  {
                    step: '02',
                    title: 'You hear back within 1 business day',
                    body: 'Usually much sooner. We take every family\'s question seriously.',
                  },
                  {
                    step: '03',
                    title: 'No pressure, ever',
                    body: 'We will answer honestly — even if the answer is "we are not the right fit."',
                  },
                ].map(({ step, title, body }) => (
                  <div key={step} className="flex gap-4">
                    <span
                      className="font-serif text-3xl font-bold leading-none flex-shrink-0 mt-0.5"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        WebkitTextStroke: '1px #5E2E14',
                        color: 'transparent',
                      }}
                    >
                      {step}
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium mb-1">{title}</p>
                      <p className="text-[#5C564F] text-xs font-light leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternate contact options */}
            <div className="space-y-3">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                id="enquiry-whatsapp-link"
                className="flex items-center gap-4 p-4 bg-[#3E1A0C] border border-[#5E2E14] rounded-xl hover:border-[#C9A84C]/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1.667A8.333 8.333 0 001.667 10c0 1.458.375 2.833 1.041 4.025L1.667 18.333l4.458-1.016A8.333 8.333 0 1010 1.667z" stroke="#25D366" strokeWidth="1.3" strokeLinejoin="round"/>
                    <path d="M7.5 7.083s.833-1.25 1.667 0c.416.625.416 1.25 0 1.667-.417.833-1.25 1.667 2.083 3.75" stroke="#25D366" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Chat on WhatsApp</p>
                  <p className="text-[#5C564F] text-xs">Quick questions — we reply fast</p>
                </div>
                <svg className="text-[#5C564F] group-hover:text-[#C9A84C] transition-colors flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href="#book-a-call"
                className="flex items-center gap-4 p-4 bg-[#3E1A0C] border border-[#5E2E14] rounded-xl hover:border-[#C9A84C]/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-[#BD5319]/10 border border-[#BD5319]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="#BD5319" strokeWidth="1.3"/>
                    <path d="M6.5 2.5v2M13.5 2.5v2" stroke="#BD5319" strokeWidth="1.3" strokeLinecap="round"/>
                    <path d="M2.5 7.5h15" stroke="#BD5319" strokeWidth="1.3"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Book a Free 15-min Call</p>
                  <p className="text-[#5C564F] text-xs">Prefer to speak? Schedule below</p>
                </div>
                <svg className="text-[#5C564F] group-hover:text-[#C9A84C] transition-colors flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <p className="text-[#5C564F] text-xs font-light mt-5 leading-relaxed">
              We typically respond within 4-8 hours during business hours (Mon-Sat, 10 AM - 7 PM IST).
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
