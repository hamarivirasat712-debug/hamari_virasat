'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logoAsset from '../assets/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Our Rituals', href: '#rituals' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#2A1208]/95 backdrop-blur-md border-b border-[#A0E0F0]/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-24 flex items-center justify-between">
          {/* Logo â€” mandala circle + stacked wordmark */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Hamari Virasat home">
            {/* Circle â€” fill + object-cover shows complete logo: mandala + Hamari Virasat + tagline */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-[#FAF6F0] ring-2 ring-[#C9A84C]/40 group-hover:ring-[#C9A84C]/70 transition-all duration-300 shadow-lg shadow-black/20">
              <Image
                src={logoAsset}
                alt="Hamari Virasat logo"
                fill
                sizes="80px"
                priority
                className="object-cover"
              />
            </div>
            {/* Stacked text â€” Hamari Virasat + tagline */}
            <div className="flex flex-col leading-none">
              <span
                className="text-white font-normal tracking-wide"
                style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', letterSpacing: '0.04em' }}
              >
                Hamari Virasat
              </span>
              <span
                className="text-[#C9A84C] font-bold tracking-[0.18em] uppercase mt-1"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem' }}
              >
                Legacy · Preservation · Continuity
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#8C847C] hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#pricing"
              className="hidden md:inline-flex items-center text-[#8C847C] hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Book a Free Call
            </a>
            <a
              href="#pricing"
              id="nav-pay-now"
              className="bg-[#D4AF37] hover:bg-[#BD5319] text-[#2A1208] hover:text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#BD5319]/25 active:scale-95"
            >
              Pay Now
            </a>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {menuOpen ? (
                  <>
                    <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="19" x2="14" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-[#2A1208]/98 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#8C847C] hover:text-white text-base font-medium py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="text-[#8C847C] hover:text-white text-base font-medium py-1 transition-colors"
            >
              Book a Free Call
            </a>
          </div>
        )}
      </nav>
    </>
  );
}

