'use client';

import React from 'react';

export default function AboutUs() {
  return (
    <section id="about-us" className="relative bg-[#2A1208] py-20 md:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, #BD5319 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/15 border border-[#C9A84C]/30 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">
              An IIM Alumnus on a Mission
            </span>
          </div>

          <h2
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            The Story Behind{' '}
            <span className="italic text-[#C9A84C]">Hamari Virasat</span>
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60 mt-4" />
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-5 text-white/80 text-sm md:text-base font-light leading-relaxed">
            <p>
              We all carry a unique thread of heritage — the subtle fragrance of a morning puja, the authentic sequence of a ritual. Yet, too often, when the time comes to perform these precious traditions, we find ourselves confused, searching for answers, unsure of the steps.
            </p>
            <p>
              As families become nuclear and spread across the globe, the living libraries once held by our elders are quietly fading away.
            </p>
            <p className="text-white font-medium pt-1">
              Hamari Virasat is that home. It is a secure, timeless digital space created for you to document, preserve, and honor your family’s unique rituals and festivals.
            </p>
            <p>
              With Hamari Virasat, your family’s traditions will never be forgotten. Through intuitive, step-by-step guided templates, we empower you to document, preserve, and keep your family’s legacy alive forever.
            </p>
          </div>

          {/* Featured Pull Quote Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#3E1A0C] to-[#2A1208] border border-[#C9A84C]/35 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase bg-[#C9A84C]/10 border border-[#C9A84C]/30 px-3 py-1 rounded-full">
                Founder&apos;s Note
              </span>
            </div>
            <div className="text-[#C9A84C] text-4xl font-serif leading-none mb-2 opacity-40">“</div>
            <p className="text-white/90 text-sm md:text-base font-light italic leading-relaxed">
              Hamari Virasat was born from this exact heartfelt realization. As a family person, I watched family gatherings get clouded by uncertainty and chaos, simply because no one could recall the authentic ways our elders celebrated life&apos;s milestones. I realized that without a home for our traditions, we risk losing not just the steps of a ritual, but the very essence of who we are.
            </p>
          </div>

        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-16 text-center bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="text-[#C9A84C] font-serif text-xl md:text-2xl font-normal italic" style={{ fontFamily: 'var(--font-serif)' }}>
              Preserve your roots. Honor your legacy.
            </p>
            <p className="text-white/70 text-xs font-light mt-1">
              Start recording your family&apos;s rituals today in a permanent digital heirloom.
            </p>
          </div>
          <a
            href="#pricing"
            className="bg-[#D4AF37] hover:bg-[#BD5319] text-[#2A1208] hover:text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg whitespace-nowrap active:scale-95"
          >
            Start Preserving Now
          </a>
        </div>

      </div>
    </section>
  );
}
