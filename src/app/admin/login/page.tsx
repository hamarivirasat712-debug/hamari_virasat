'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Incorrect password. Try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0C04] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-full bg-[#BD5319]/20 border border-[#BD5319]/40 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M2 10 C2 6, 6 2, 10 2" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M2 10 C6 10, 10 6, 10 2" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-serif text-xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Hamari Virasat
          </span>
        </div>

        <div className="bg-[#2A1208] border border-[#5E2E14] rounded-2xl p-8">
          <h1 className="font-serif text-2xl text-white font-normal mb-1 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            Admin Dashboard
          </h1>
          <p className="text-[#5C564F] text-sm text-center mb-8">Enter your password to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#3E1A0C] border border-[#5E2E14] rounded-xl px-4 py-3 text-white placeholder-[#5C564F] text-sm focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
              autoFocus
              required
            />
            {error && (
              <p className="text-[#BD5319] text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#BD5319] hover:bg-[#A34310] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all active:scale-95"
            >
              {loading ? 'Entering...' : 'Enter Dashboard →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
