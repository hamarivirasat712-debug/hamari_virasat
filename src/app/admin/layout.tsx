'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  const tabs = [
    { label: 'Orders', href: '/admin' },
    { label: 'Submissions', href: '/admin/submissions' },
    { label: 'Enquiries', href: '/admin/enquiries' },
  ];

  return (
    <div className="min-h-screen bg-[#1A0C04]">
      {/* Top nav */}
      <nav className="bg-[#2A1208] border-b border-[#5E2E14] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#BD5319]/20 border border-[#BD5319]/40 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10 C2 6, 6 2, 10 2" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M2 10 C6 10, 10 6, 10 2" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-serif text-white text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                Virasat Admin
              </span>
            </div>

            {/* Tabs */}
            <div className="hidden sm:flex items-center gap-1">
              {tabs.map(tab => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`text-sm px-4 py-2 rounded-lg transition-colors font-medium ${
                    pathname === tab.href
                      ? 'bg-[#BD5319]/20 text-[#C9A84C]'
                      : 'text-[#5C564F] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={logout}
            className="text-[#5C564F] hover:text-white text-sm transition-colors"
          >
            Logout →
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
