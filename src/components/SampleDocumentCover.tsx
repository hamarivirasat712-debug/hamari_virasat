'use client';

import React, { useState } from 'react';

export default function SampleDocumentCover() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div
        style={{
          background: '#3E1A0C',
          padding: '3rem 2rem',
          textAlign: 'center',
          minHeight: '360px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6h18l12 12v24a2 2 0 01-2 2H12a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="#C9A84C" strokeWidth="2" fill="none"/>
          <path d="M30 6v12h12" stroke="#C9A84C" strokeWidth="2"/>
          <path d="M18 26h12M18 32h8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p style={{ color: '#C9A84C', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>Sample Document</p>
        <p style={{ color: '#5C564F', fontSize: '0.72rem', margin: 0 }}>Cover image coming soon</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/sample-ritual-document-cover.png"
      alt="Sample Ritual Document cover"
      className="w-full h-auto object-cover"
      onError={() => setImageError(true)}
    />
  );
}
