import React from 'react';
import Image from 'next/image';
import logoAsset from '../assets/logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2A1208] border-t border-[#3E1A0C] pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <div className="relative h-16 w-44 rounded-xl overflow-hidden bg-[#FAF6F0] ring-1 ring-[#C9A84C]/25">
                <Image src={logoAsset} alt="Hamari Virasat Logo" fill className="object-contain" />
              </div>
            </div>
            <p className="text-white/80 text-sm font-normal leading-relaxed max-w-xs mb-4">
              A structured platform where Indian families can record the rituals that define them
              from Prebirth to the Ancestral rites and preserve them in a form that lasts.
            </p>
            <p className="text-[#C9A84C] text-xs font-semibold mb-4">
              25% returning family discount on your next ritual documentation
            </p>

            {/* Social Handles */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/hamarivirasat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2 text-xs text-white/70 hover:text-[#E1306C] bg-white/5 border border-white/10 hover:border-[#E1306C]/40 px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </a>
              <a
                href="https://facebook.com/hamarivirasat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center gap-2 text-xs text-white/70 hover:text-[#1877F2] bg-white/5 border border-white/10 hover:border-[#1877F2]/40 px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase mb-5">Navigate</p>
            <div className="space-y-3">
              {[
                { label: 'Our Rituals', href: '#rituals' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'What You Receive', href: '#what-you-receive' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Coming Soon', href: '#coming-soon' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Book a Call', href: '#book-a-call' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/75 hover:text-[#C9A84C] text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact + CTAs */}
          <div>
            <p className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase mb-5">Get in Touch</p>
            <div className="space-y-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919238820685'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white text-sm font-medium transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="#25D366">
                    <path d="M7 1C3.686 1 1 3.686 1 7c0 1.05.28 2.04.77 2.89L1 13l3.16-.76A6 6 0 1013 7c0-3.314-2.686-6-6-6zm3.32 8.48c-.14.4-.82.78-1.12.82-.3.04-.56.14-1.88-.4-1.6-.66-2.62-2.26-2.7-2.36-.08-.1-.66-.88-.66-1.68 0-.8.42-1.2.56-1.36.14-.16.3-.2.4-.2h.28c.1 0 .22-.04.34.26.12.3.42 1.04.46 1.12.04.08.06.18 0 .28-.06.1-.1.16-.2.26-.1.1-.2.22-.28.3-.08.1-.18.2-.08.4.1.2.46.76.98 1.22.68.6 1.24.78 1.44.86.2.08.32.06.44-.04.12-.1.5-.58.64-.78.14-.2.28-.16.46-.1.18.06 1.16.56 1.36.66.2.1.34.14.38.22.04.08.04.48-.1.88z"/>
                  </svg>
                </div>
                WhatsApp Us
              </a>

              <a
                href="#book-a-call"
                className="flex items-center gap-3 text-white/80 hover:text-white text-sm font-medium transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#BD5319]/20 border border-[#BD5319]/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="#BD5319" strokeWidth="1.2"/>
                    <path d="M4 2v1.5M10 2v1.5" stroke="#BD5319" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M1.5 5.5h11" stroke="#BD5319" strokeWidth="1.2"/>
                  </svg>
                </div>
                Book a Free Call
              </a>

              <a
                href="#pricing"
                className="flex items-center gap-3 text-white/80 hover:text-white text-sm font-medium transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1l1.5 4.5H13l-3.5 2.5 1.5 4.5L7 10l-4 2.5 1.5-4.5L1 5.5h4.5L7 1z" stroke="#C9A84C" strokeWidth="1.1" strokeLinejoin="round"/>
                  </svg>
                </div>
                Pay &amp; Preserve Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#3E1A0C] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-xs font-normal text-center sm:text-left">
            © {year} Hamari Virasat. All rights reserved. Memory &amp; Ritual Preservation Platform
          </p>
          <div className="flex items-center gap-5 pr-0 sm:pr-14">
            <a href="#" className="text-white/70 hover:text-[#C9A84C] text-xs font-normal transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-[#C9A84C] text-xs font-normal transition-colors">Terms</a>
            <a href="#" className="text-white/70 hover:text-[#C9A84C] text-xs font-normal transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

