'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('virasat_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('virasat_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[90] bg-[#2A1208]/95 backdrop-blur-md border border-[#C9A84C]/30 text-white rounded-2xl p-5 shadow-2xl animate-fade-in-up">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-base">
          🍪
        </div>
        <div className="flex-1">
          <h4 className="font-serif text-white text-base font-medium mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
            Cookie &amp; Privacy Notice
          </h4>
          <p className="text-white/75 text-xs font-light leading-relaxed mb-4">
            We use strictly necessary functional cookies to keep your family workspace secure. We do <strong>not</strong> track your browsing or sell your data. Read our{' '}
            <Link href="/privacy" className="text-[#C9A84C] underline hover:text-white transition-colors">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAccept}
              className="bg-[#BD5319] hover:bg-[#D4AF37] text-white hover:text-[#2A1208] text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            >
              Accept Essential Cookies
            </button>
            <button
              onClick={handleAccept}
              className="text-white/60 hover:text-white text-xs font-normal transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
