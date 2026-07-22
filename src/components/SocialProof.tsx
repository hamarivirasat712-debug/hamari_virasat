import React from 'react';

const testimonials = [
  {
    quote:
      'My grandmother was the only one who knew all the Godbharai songs. When she passed, we thought we had lost them forever. Virasat helped us recover what we remembered and capture it properly. That document is now the most precious thing in our home.',
    author: 'Priya Mehta',
    location: 'Pune, Maharashtra',
    ritual: 'Godbharai & Mundan',
    initials: 'PM',
    color: '#BD5319',
  },
  {
    quote:
      'We were planning my daughter\'s wedding and realised none of us agreed on the order of the Pheras. Everyone had a different memory. Virasat gave us a way to sit with the elders, record the right sequence, and now it\'s preserved for her children too.',
    author: 'Rajesh Sharma',
    location: 'Jaipur, Rajasthan',
    ritual: 'Vivah Mandap & Pheras',
    initials: 'RS',
    color: '#C9A84C',
  },
  {
    quote:
      'The intake form was so thoughtfully written — it felt like someone who truly understood our culture had designed it. It prompted questions I wouldn\'t have thought to ask. The final document made my parents cry when they read it.',
    author: 'Ananya Krishnan',
    location: 'Bengaluru, Karnataka',
    ritual: 'Complete Heritage Record',
    initials: 'AK',
    color: '#BD5319',
  },
];

const stats = [
  { value: '9', label: 'Rituals documented' },
  { value: '6+', label: 'Sub-sections per ritual' },
  { value: '100%', label: 'Family-specific record' },
  { value: '∞', label: 'Generations it will last' },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="bg-[#FAF6F0] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase">
              Families We&apos;ve Helped
            </p>
          </div>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#2A1208] leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Stories from families who{' '}
            <span className="italic text-[#BD5319]">chose to preserve</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-[#EFEAE2] rounded-2xl p-7 flex flex-col hover:shadow-xl hover:shadow-[#2A1208]/5 hover:border-[#C9A84C]/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} width="14" height="14" viewBox="0 0 14 14" fill="#C9A84C">
                    <path d="M7 1l1.5 4.5H13l-3.5 2.5 1.5 4.5L7 10l-4 2.5 1.5-4.5L1 5.5h4.5L7 1z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[#5C564F] text-sm leading-relaxed font-light italic flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-[#EFEAE2] pt-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[#2A1208] text-sm font-medium">{t.author}</p>
                  <p className="text-[#8C847C] text-xs">{t.location}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[#BD5319] text-xs font-medium bg-[#BD5319]/8 px-2 py-0.5 rounded-full">
                    {t.ritual}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="bg-[#2A1208] rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-serif text-4xl md:text-5xl text-[#C9A84C] font-normal mb-2"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {stat.value}
                </p>
                <p className="text-[#5C564F] text-xs tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
