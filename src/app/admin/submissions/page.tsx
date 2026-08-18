'use client';

import { useEffect, useState } from 'react';

type Submission = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  gotra: string | null;
  kuldevi: string | null;
  kuldevta: string | null;
  selected_ritual_names: string[];
  ritual_data: Record<string, string>[];
  custom_ritual_name: string | null;
};

const RITUAL_LABELS = ['Namkaran', 'Mundan', 'Upanayana / Janeu', 'Engagement', 'Wedding — Haldi', 'Wedding — Mehendi', 'Wedding — Main Ceremony', 'Griha Pravesh'];

const FIELD_LABELS: Record<string, string> = {
  steps: 'Steps & Sequence',
  samagri: 'Samagri / Items',
  songs: 'Songs, Prayers & Mantras',
  roles: 'Family Roles',
  variations: 'Regional Variations',
  photos: 'Photos / Videos',
  additionalInfo: 'Additional Information',
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/submissions')
      .then(r => r.json())
      .then(data => { setSubmissions(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const printSubmission = (s: Submission) => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>${s.customer_name} — Virasat Submission</title>
      <style>
        body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; color: #1a0c04; line-height: 1.7; }
        h1 { color: #BD5319; } h2 { color: #5E2E14; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        .meta { color: #666; font-size: 14px; margin-bottom: 32px; }
        .ritual { margin-bottom: 32px; } .field { margin-bottom: 16px; }
        .label { font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #BD5319; }
        .value { margin-top: 4px; white-space: pre-wrap; }
        @media print { button { display: none; } }
      </style></head><body>
      <h1>Hamari Virasat — Family Ritual Documentation</h1>
      <div class="meta">
        <strong>${s.customer_name}</strong> · ${s.customer_email}${s.customer_phone ? ` · ${s.customer_phone}` : ''}
        <br/>Submitted: ${new Date(s.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        ${s.gotra ? `<br/>Gotra: ${s.gotra}` : ''}
        ${s.kuldevi ? ` · Kuldevi: ${s.kuldevi}` : ''}
        ${s.kuldevta ? ` · Kuldevta: ${s.kuldevta}` : ''}
      </div>
      ${(s.selected_ritual_names || []).map((name, idx) => {
        const data = s.ritual_data?.[idx] || {};
        return `<div class="ritual"><h2>${name}</h2>
          ${Object.entries(FIELD_LABELS).map(([key, label]) =>
            data[key] ? `<div class="field"><div class="label">${label}</div><div class="value">${data[key]}</div></div>` : ''
          ).join('')}
        </div>`;
      }).join('')}
      ${s.custom_ritual_name ? `<div class="ritual"><h2>Custom Ritual: ${s.custom_ritual_name}</h2>
        ${Object.entries(FIELD_LABELS).map(([key, label]) =>
          s.ritual_data?.[8]?.[key] ? `<div class="field"><div class="label">${label}</div><div class="value">${s.ritual_data[8][key]}</div></div>` : ''
        ).join('')}
      </div>` : ''}
      <script>window.print();</script></body></html>
    `);
    win.document.close();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-semibold text-lg">Intake Submissions</h1>
        <span className="text-[#5C564F] text-xs">{submissions.length} total</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-6 h-6 border-2 border-[#BD5319] border-t-transparent rounded-full" />
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-[#2A1208] border border-[#5E2E14] rounded-2xl text-center py-20">
          <p className="text-[#5C564F] text-sm">No submissions yet. They will appear here after a customer fills the intake form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map(sub => (
            <div key={sub.id} className="bg-[#2A1208] border border-[#5E2E14] rounded-2xl overflow-hidden">
              {/* Header row */}
              <div className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">{sub.customer_name}</p>
                  <p className="text-[#5C564F] text-xs mt-0.5">{sub.customer_email} · {new Date(sub.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(sub.selected_ritual_names || []).map(r => (
                      <span key={r} className="text-xs bg-[#BD5319]/10 border border-[#BD5319]/20 text-[#C9A84C] px-2 py-0.5 rounded-full">{r}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => printSubmission(sub)}
                    className="text-[#5C564F] hover:text-white text-xs border border-[#5E2E14] hover:border-white/20 px-3 py-2 rounded-lg transition-colors"
                  >
                    ⬇ Export PDF
                  </button>
                  <button
                    onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                    className="text-[#5C564F] hover:text-white text-xs border border-[#5E2E14] hover:border-white/20 px-3 py-2 rounded-lg transition-colors"
                  >
                    {expanded === sub.id ? '▲ Hide' : '▼ View details'}
                  </button>
                </div>
              </div>

              {/* Expanded ritual data */}
              {expanded === sub.id && (
                <div className="border-t border-[#5E2E14] px-6 py-6 space-y-8">
                  {/* Ancestral profile */}
                  {(sub.gotra || sub.kuldevi || sub.kuldevta) && (
                    <div>
                      <p className="text-[#BD5319] text-xs font-bold uppercase tracking-wider mb-3">Ancestral Profile</p>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {sub.gotra && <div><p className="text-[#5C564F] text-xs uppercase tracking-wide mb-1">Gotra</p><p className="text-white text-sm">{sub.gotra}</p></div>}
                        {sub.kuldevi && <div><p className="text-[#5C564F] text-xs uppercase tracking-wide mb-1">Kuldevi</p><p className="text-white text-sm">{sub.kuldevi}</p></div>}
                        {sub.kuldevta && <div><p className="text-[#5C564F] text-xs uppercase tracking-wide mb-1">Kuldevta</p><p className="text-white text-sm">{sub.kuldevta}</p></div>}
                      </div>
                    </div>
                  )}

                  {/* Ritual answers */}
                  {(sub.selected_ritual_names || []).map((ritualName, idx) => {
                    const data = sub.ritual_data?.[idx] || {};
                    const hasData = Object.values(data).some(v => v?.trim());
                    return (
                      <div key={ritualName}>
                        <p className="text-[#BD5319] text-xs font-bold uppercase tracking-wider mb-3">{ritualName}</p>
                        {hasData ? (
                          <div className="grid sm:grid-cols-2 gap-4">
                            {Object.entries(FIELD_LABELS).map(([key, label]) =>
                              data[key] ? (
                                <div key={key} className="bg-[#3E1A0C] rounded-xl p-4">
                                  <p className="text-[#5C564F] text-xs uppercase tracking-wide mb-2">{label}</p>
                                  <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{data[key]}</p>
                                </div>
                              ) : null
                            )}
                          </div>
                        ) : (
                          <p className="text-[#5C564F] text-sm italic">Not filled yet</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
