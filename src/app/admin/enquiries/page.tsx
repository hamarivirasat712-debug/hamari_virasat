'use client';

import { useEffect, useState } from 'react';

type Enquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string | null;
  type: string;
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/enquiries')
      .then(async r => {
        if (r.status === 401) {
          window.location.href = '/admin/login';
          return [];
        }
        return r.json();
      })
      .then(data => { setEnquiries(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-semibold text-lg">Enquiries</h1>
        <span className="text-[#5C564F] text-xs">{enquiries.length} total</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-6 h-6 border-2 border-[#BD5319] border-t-transparent rounded-full" />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-[#2A1208] border border-[#5E2E14] rounded-2xl text-center py-20">
          <p className="text-[#5C564F] text-sm">No enquiries yet. They will appear here when someone fills the contact form.</p>
        </div>
      ) : (
        <div className="bg-[#2A1208] border border-[#5E2E14] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#5E2E14]">
                  {['Date', 'Name', 'Email', 'Interest', 'Message', ''].map(h => (
                    <th key={h} className="text-left text-[#5C564F] text-xs uppercase tracking-wider px-6 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enquiries.map(enq => (
                  <>
                    <tr key={enq.id} className="border-b border-[#5E2E14]/40 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-[#5C564F] whitespace-nowrap text-xs">
                        {new Date(enq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{enq.name}</td>
                      <td className="px-6 py-4 text-[#8C847C]">{enq.email}</td>
                      <td className="px-6 py-4">
                        {enq.interest && (
                          <span className="text-xs bg-[#5E2E14]/40 text-[#C9A84C] px-2 py-0.5 rounded-full">
                            {enq.interest}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[#5C564F] text-xs max-w-xs truncate">
                        {enq.message || '—'}
                      </td>
                      <td className="px-6 py-4">
                        {enq.message && (
                          <button
                            onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
                            className="text-[#5C564F] hover:text-white text-xs transition-colors"
                          >
                            {expanded === enq.id ? 'Hide' : 'Read →'}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expanded === enq.id && (
                      <tr key={`${enq.id}-expanded`} className="border-b border-[#5E2E14]/40 bg-[#3E1A0C]/30">
                        <td colSpan={6} className="px-6 py-4">
                          <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{enq.message}</p>
                          <a
                            href={`mailto:${enq.email}?subject=Re: Your enquiry to Hamari Virasat`}
                            className="inline-flex items-center gap-1.5 mt-3 text-[#BD5319] hover:text-[#C9A84C] text-xs font-medium transition-colors"
                          >
                            Reply via email →
                          </a>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
