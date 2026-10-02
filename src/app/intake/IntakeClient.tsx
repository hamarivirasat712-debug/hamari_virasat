'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { decodeJwt } from 'jose';

// ─── Types ─────────────────────────────────────────────────────────────────

interface SanityRitual {
  slug: string;
  title: string;
  sublabel?: string;
  number: string;
}

const SUB_QUESTIONS = [
  { key: 'steps',          label: "Ritual steps in your family's sequence",    placeholder: 'Describe what happens, in order, from start to finish...' },
  { key: 'samagri',       label: 'Samagri / items required',                   placeholder: 'List everything needed: materials, utensils, flowers...' },
  { key: 'songs',         label: 'Songs, prayers & mantras',                   placeholder: 'Include the words or phonetic spelling as your family says them...' },
  { key: 'roles',         label: 'Roles of each family member',                placeholder: 'Who stands where, who performs which action...' },
  { key: 'variations',    label: 'Regional or family-specific variations',     placeholder: 'Anything your family does differently from the standard version...' },
  { key: 'photos',        label: 'Photos or videos you can share later',       placeholder: 'Just describe what you have — we will follow up for the actual files...' },
  { key: 'additionalInfo', label: 'Additional Information',                     placeholder: 'Share any special memories, stories, unique family customs, or personal touches you want included...' },
];

const STORAGE_KEY = 'Hamari Virasat-intake-v3';

type RitualData = Record<string, string>;
type StepId = 'intro' | 'contact' | 'ancestral' | string | 'card9' | 'review';

interface FormData {
  email: string;
  name: string;
  phone: string;
  selectedSlugs: string[];    // slugs of purchased rituals
  includeCard9: boolean;
  gotra: string;
  kuldevi: string;
  kuldevta: string;
  rituals: Record<string, RitualData>;  // keyed by slug
  customRitualName: string;
}

// Legacy index→slug map for backward compat
const LEGACY_INDEX_TO_SLUG: Record<number, string> = {
  0: 'namkaran', 1: 'mundan', 2: 'upanayana', 3: 'engagement',
  4: 'wedding-haldi', 5: 'wedding-mehendi', 6: 'wedding-main', 7: 'griha-pravesh',
};

const emptyRitual = (): RitualData => ({ steps: '', samagri: '', songs: '', roles: '', variations: '', photos: '', additionalInfo: '' });

const defaultForm = (email = '', slugs: string[] = []): FormData => ({
  email, name: '', phone: '',
  selectedSlugs: slugs, includeCard9: false,
  gotra: '', kuldevi: '', kuldevta: '',
  rituals: {},
  customRitualName: '',
});

function buildSteps(sel: string[], card9: boolean): StepId[] {
  const s: StepId[] = ['intro', 'contact', 'ancestral'];
  sel.forEach(slug => s.push(slug));
  if (card9) s.push('card9');
  s.push('review');
  return s;
}

interface IntakeClientProps {
  initialEmail?: string;
  initialRitualSlugs?: string[];
  sanityRituals?: SanityRitual[];
  token?: string;
}

// ─── Inner (needs useSearchParams) ────────────────────────────────────────

function IntakeInner({ initialEmail = '', initialRitualSlugs = [], sanityRituals = [], token = '' }: IntakeClientProps) {
  const searchParams = useSearchParams();

  // Build a lookup map from sanity rituals
  const ritualBySlug = React.useMemo(() => {
    const map: Record<string, SanityRitual> = {};
    sanityRituals.forEach(r => { if (r.slug) map[r.slug] = r; });
    return map;
  }, [sanityRituals]);

  const [form, setForm] = useState<FormData>(() => {
    const f = defaultForm(initialEmail, initialRitualSlugs);
    // Pre-initialize ritual data objects for selected slugs
    initialRitualSlugs.forEach(slug => {
      if (!f.rituals[slug]) f.rituals[slug] = emptyRitual();
    });
    return f;
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [hasRestored, setHasRestored] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const steps = buildSteps(form.selectedSlugs, form.includeCard9);
  const currentId = steps[stepIndex] ?? 'review';

  // Build the magic link URL for copy/share
  const magicLink = React.useMemo(() => {
    if (!token) return '';
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    const rParam = form.selectedSlugs.length > 0 ? `&r=${form.selectedSlugs.join(',')}` : '';
    return `${base}/intake?token=${token}${rParam}`;
  }, [token, form.selectedSlugs]);

  // Apply server-decoded JWT props directly
  useEffect(() => {
    if (initialEmail || (initialRitualSlugs && initialRitualSlugs.length > 0)) {
      setForm(prev => {
        const newSlugs = initialRitualSlugs.length > 0 ? initialRitualSlugs : prev.selectedSlugs;
        const newRituals = { ...prev.rituals };
        newSlugs.forEach(slug => {
          if (!newRituals[slug]) newRituals[slug] = emptyRitual();
        });
        return {
          ...prev,
          email: initialEmail || prev.email,
          selectedSlugs: newSlugs,
          rituals: newRituals,
        };
      });
    }
  }, [initialEmail, initialRitualSlugs]);

  // URL params fallback (Razorpay flow & magic link)
  useEffect(() => {
    const urlToken = searchParams.get('token');
    const r = searchParams.get('r');
    const c9 = searchParams.get('c9');

    let emailFromToken = '';
    let slugs: string[] = [];

    if (urlToken) {
      try {
        const decoded = decodeJwt(urlToken);
        if (decoded && typeof decoded.email === 'string') {
          emailFromToken = decoded.email;
        }
        // New slug-based JWT
        if (decoded && Array.isArray(decoded.ritualSlugs)) {
          slugs = (decoded.ritualSlugs as string[]).filter(s => typeof s === 'string' && s.length > 0);
        }
        // Legacy index-based JWT
        if (slugs.length === 0 && decoded && Array.isArray(decoded.ritualIndices)) {
          slugs = (decoded.ritualIndices as number[])
            .map(Number)
            .filter(n => !isNaN(n) && n >= 0 && n <= 7)
            .map(i => LEGACY_INDEX_TO_SLUG[i])
            .filter(Boolean);
        }
      } catch {
        /* ignore invalid token format */
      }
    }

    if (r && slugs.length === 0) {
      const parts = r.split(',').map(s => s.trim()).filter(Boolean);
      const allNumeric = parts.every(p => /^\d+$/.test(p));
      if (allNumeric) {
        slugs = parts.map(Number).filter(n => n >= 0 && n <= 7).map(i => LEGACY_INDEX_TO_SLUG[i]).filter(Boolean);
      } else {
        slugs = parts;
      }
    }

    if (slugs.length > 0 || emailFromToken) {
      setForm(prev => {
        const newSlugs = slugs.length > 0 ? slugs : prev.selectedSlugs;
        const newRituals = { ...prev.rituals };
        newSlugs.forEach(slug => {
          if (!newRituals[slug]) newRituals[slug] = emptyRitual();
        });
        return {
          ...prev,
          email: emailFromToken || prev.email || initialEmail,
          selectedSlugs: newSlugs,
          includeCard9: c9 === '1' || prev.includeCard9,
          rituals: newRituals,
        };
      });
    }
  }, [searchParams, initialEmail]);

  // Restore localStorage — merge saved form data with token ritual selections
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.form) {
          setForm(prev => {
            // Token defines which rituals the user paid for (authoritative)
            // localStorage has the user's progress on filling those rituals (to be restored)
            const tokenSlugs = prev.selectedSlugs; // Already set from token/URL above
            const mergedRituals = { ...prev.rituals };

            // Restore saved ritual data for slugs the user has paid for
            if (saved.form.rituals && typeof saved.form.rituals === 'object') {
              // Handle both old array format and new object format
              if (Array.isArray(saved.form.rituals)) {
                // Old v2 format: rituals is an array indexed by number
                // We need to convert using legacy mapping
                saved.form.rituals.forEach((ritualData: RitualData, idx: number) => {
                  const slug = LEGACY_INDEX_TO_SLUG[idx];
                  if (slug && tokenSlugs.includes(slug) && ritualData) {
                    const hasContent = Object.values(ritualData).some(v => typeof v === 'string' && v.trim());
                    if (hasContent) {
                      mergedRituals[slug] = { ...emptyRitual(), ...ritualData };
                    }
                  }
                });
              } else {
                // New v3 format: rituals is an object keyed by slug
                Object.entries(saved.form.rituals).forEach(([slug, ritualData]) => {
                  if (tokenSlugs.includes(slug) && ritualData && typeof ritualData === 'object') {
                    const hasContent = Object.values(ritualData as RitualData).some(v => typeof v === 'string' && v.trim());
                    if (hasContent) {
                      mergedRituals[slug] = { ...emptyRitual(), ...(ritualData as RitualData) };
                    }
                  }
                });
              }
            }

            return {
              ...prev,
              // Restore personal info from saved progress
              name: saved.form.name || prev.name,
              phone: saved.form.phone || prev.phone,
              gotra: saved.form.gotra || prev.gotra,
              kuldevi: saved.form.kuldevi || prev.kuldevi,
              kuldevta: saved.form.kuldevta || prev.kuldevta,
              customRitualName: saved.form.customRitualName || prev.customRitualName,
              // Keep token's slug selection (authoritative)
              selectedSlugs: tokenSlugs,
              rituals: mergedRituals,
            };
          });
          setStepIndex(saved.stepIndex ?? 1);
          setSavedAt(saved.savedAt ?? null);
          setHasRestored(true);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const persist = useCallback((f: FormData, si: number) => {
    const ts = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form: f, stepIndex: si, savedAt: ts }));
    setSavedAt(ts);
  }, []);

  const updateForm = (patch: Partial<FormData>) =>
    setForm(prev => { const n = { ...prev, ...patch }; persist(n, stepIndex); return n; });

  const updateRitual = (slug: string, key: string, value: string) =>
    setForm(prev => {
      const rituals = { ...prev.rituals };
      rituals[slug] = { ...(rituals[slug] || emptyRitual()), [key]: value };
      const n = { ...prev, rituals };
      persist(n, stepIndex);
      return n;
    });

  const goTo = (ni: number) => { setStepIndex(ni); persist(form, ni); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const clearAndRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setForm(defaultForm()); setStepIndex(0); setHasRestored(false); setSavedAt(null);
  };

  const handleSaveAndContinue = () => {
    persist(form, stepIndex);
    setShowSaveModal(true);
  };

  const copyLink = async () => {
    if (!magicLink) return;
    try {
      await navigator.clipboard.writeText(magicLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      // Fallback: select a hidden input
    }
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    try {
      // Build ritual names from sanity data or from the slugs
      const selectedRitualNames = form.selectedSlugs.map(slug => {
        const r = ritualBySlug[slug];
        return r ? r.title : slug;
      });

      const payload = {
        ...form,
        selectedRitualNames,
        // Convert rituals object to array-like structure for the submission API
        rituals: form.selectedSlugs.map(slug => ({
          slug,
          title: ritualBySlug[slug]?.title || slug,
          ...(form.rituals[slug] || emptyRitual()),
        })),
      };

      // Save to Supabase (admin dashboard) via our own API
      await fetch('/api/admin/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Also save to Google Sheets as raw backup
      const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_INTAKE_URL;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_APPS_SCRIPT_SHARED_SECRET,
            type: 'intake',
            ...payload,
          }),
          mode: 'no-cors',
        });
      }

      localStorage.removeItem(STORAGE_KEY);
      setStatus('success');
    } catch { setStatus('error'); }
  };

  const visibleSteps = steps.filter(s => s !== 'intro') as StepId[];
  const visibleIdx = visibleSteps.indexOf(currentId);
  const pct = visibleIdx < 0 ? 0 : Math.round((visibleIdx / visibleSteps.length) * 100);
  const stepLabel = visibleIdx + 1;
  const stepTotal = visibleSteps.length;

  const inputCls = 'w-full bg-[#3E1A0C] border border-[#5E2E14] rounded-xl px-4 py-3 text-white placeholder-[#5C564F] text-sm focus:outline-none focus:border-[#C9A84C]/60 transition-colors resize-none leading-relaxed';
  const showBar = currentId !== 'intro' && status !== 'success';

  if (status === 'success') {
    return (
      <Shell bar={false} pct={0} savedAt={null}>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center">
          <div className="w-20 h-20 bg-[#BD5319]/15 border border-[#BD5319]/30 rounded-full flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16l8 8 14-14" stroke="#BD5319" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h1 className="font-serif text-4xl text-white font-normal mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Submitted. <span className="italic text-[#C9A84C]">Thank you.</span>
          </h1>
          <p className="text-[#8C847C] text-base font-light leading-relaxed max-w-md mb-6">
            Our team will begin documentation and deliver your record within 7 days.
          </p>
          <p className="text-[#5C564F] text-sm">Confirmation sent to <span className="text-white">{form.email}</span></p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell bar={showBar} pct={pct} savedAt={savedAt}>
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* INTRO */}
        {currentId === 'intro' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="section-divider mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl text-white font-normal leading-tight mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Your Family&apos;s Rituals,<br /><span className="italic text-[#C9A84C]">Written Down Forever.</span>
            </h1>
            <p className="text-[#8C847C] text-base font-light leading-relaxed max-w-lg mb-10">
              This form takes about 20–40 minutes. You don&apos;t have to do it all at once — your answers are saved automatically as you go. You can save and continue anytime.
            </p>
            {hasRestored && (
              <div className="w-full max-w-md bg-[#3E1A0C] border border-[#C9A84C]/30 rounded-2xl p-5 mb-8 text-left">
                <p className="text-[#C9A84C] text-sm font-medium mb-1">Welcome back</p>
                <p className="text-[#8C847C] text-sm font-light">We found your saved progress{savedAt ? ` from ${savedAt}` : ''}.</p>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => goTo(stepIndex === 0 ? 1 : stepIndex)} className="flex-1 bg-[#BD5319] hover:bg-[#A34310] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">Continue</button>
                  <button onClick={clearAndRestart} className="text-[#5C564F] hover:text-white text-sm px-4 py-2.5 transition-colors">Start over</button>
                </div>
              </div>
            )}
            <button onClick={() => goTo(1)} className="inline-flex items-center gap-2 bg-[#BD5319] hover:bg-[#A34310] text-white font-semibold text-base px-10 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-[#BD5319]/30 active:scale-95">
              {hasRestored ? 'View My Progress' : 'Begin Documentation'} <Arrow />
            </button>
            <p className="text-[#5C564F] text-xs mt-6 font-light">Takes 20–40 min · Save & resume anytime · Completely private</p>
          </div>
        )}

        {/* CONTACT */}
        {currentId === 'contact' && (
          <Card step={stepLabel} total={stepTotal} title="Let's start with you" sub="We'll use your details to manage your account and send final files.">
            <Fld label="Your name" req><input className={inputCls} type="text" placeholder="Rohit Sharma" value={form.name} onChange={e => updateForm({ name: e.target.value })} /></Fld>
            <Fld label="Email address" req><input className={inputCls} type="email" placeholder="rohit@example.com" value={form.email} onChange={e => updateForm({ email: e.target.value })} /></Fld>
            <Fld label="Phone number" hint="optional"><input className={inputCls} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => updateForm({ phone: e.target.value })} /></Fld>
            <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)} canNext={!!(form.name && form.email)} onSave={handleSaveAndContinue} />
          </Card>
        )}



        {/* ANCESTRAL PROFILE */}
        {currentId === 'ancestral' && (
          <Card step={stepLabel} total={stepTotal} title="Ancestral Profile" sub="These details ground every ritual in your specific lineage. Leave blank if you don't know.">
            <Fld label="Gotra" hint="e.g. Kashyap, Bharadwaj"><input className={inputCls} type="text" placeholder="Your family's patrilineal lineage" value={form.gotra} onChange={e => updateForm({ gotra: e.target.value })} /></Fld>
            <Fld label="Kuldevi" hint="Ancestral goddess"><input className={inputCls} type="text" placeholder="e.g. Chamunda Mata, Vaishno Devi" value={form.kuldevi} onChange={e => updateForm({ kuldevi: e.target.value })} /></Fld>
            <Fld label="Kuldevta" hint="Ancestral deity"><input className={inputCls} type="text" placeholder="e.g. Shiva, Vishnu, Ganesha" value={form.kuldevta} onChange={e => updateForm({ kuldevta: e.target.value })} /></Fld>
            <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)} canNext onSave={handleSaveAndContinue} />
          </Card>
        )}

        {/* RITUAL DETAIL (dynamic — driven by selectedSlugs and Sanity data) */}
        {typeof currentId === 'string' && currentId !== 'intro' && currentId !== 'contact' && currentId !== 'ancestral' && currentId !== 'card9' && currentId !== 'review' && (() => {
          const slug = currentId;
          const info = ritualBySlug[slug];
          const pos = form.selectedSlugs.indexOf(slug) + 1;
          const title = info?.title || slug;
          const sublabel = info?.sublabel || '';

          // Ensure ritual data exists for this slug
          if (!form.rituals[slug]) {
            form.rituals[slug] = emptyRitual();
          }

          return (
            <Card step={stepLabel} total={stepTotal} title={title} sub={`Ritual ${pos} of ${form.selectedSlugs.length}${sublabel ? ` — ${sublabel}` : ''}. Fill in as much or as little as you know.`}>
              {SUB_QUESTIONS.map(q => (
                <Fld key={q.key} label={q.label}>
                  <textarea className={`${inputCls} min-h-[80px]`} rows={3} placeholder={q.placeholder}
                    value={form.rituals[slug]?.[q.key] || ''} onChange={e => updateRitual(slug, q.key, e.target.value)} />
                </Fld>
              ))}
              <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)} canNext onSave={handleSaveAndContinue} />
            </Card>
          );
        })()}

        {/* CARD 9 */}
        {currentId === 'card9' && (
          <Card step={stepLabel} total={stepTotal} title="Your Custom Ritual" sub="Describe your family's unique ritual — one that might not be in any standard list.">
            <Fld label="Name of this ritual"><input className={inputCls} type="text" placeholder="e.g. Satyanarayan Puja, Sheetla Ashtami" value={form.customRitualName} onChange={e => updateForm({ customRitualName: e.target.value })} /></Fld>
            {SUB_QUESTIONS.map(q => (
              <Fld key={q.key} label={q.label}>
                <textarea className={`${inputCls} min-h-[80px]`} rows={3} placeholder={q.placeholder}
                  value={form.rituals['_custom']?.[q.key] || ''} onChange={e => updateRitual('_custom', q.key, e.target.value)} />
              </Fld>
            ))}
            <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)} canNext onSave={handleSaveAndContinue} />
          </Card>
        )}

        {/* REVIEW */}
        {currentId === 'review' && (
          <Card step={stepLabel} total={stepTotal} title="Review & Submit" sub="Everything looks good? Submit your details and we'll begin your family's documentation.">
            <div className="space-y-2 mb-8">
              <Row label="Name" value={form.name} />
              <Row label="Email" value={form.email} />
              {form.phone && <Row label="Phone" value={form.phone} />}
              {form.gotra && <Row label="Gotra" value={form.gotra} />}
              <div className="border-t border-[#5E2E14] pt-4 mt-4">
                <p className="text-[#5C564F] text-xs uppercase tracking-wider mb-3">Rituals selected</p>
                {form.selectedSlugs.map(slug => {
                  const info = ritualBySlug[slug];
                  const title = info?.title || slug;
                  const filled = form.rituals[slug] ? Object.values(form.rituals[slug]).some(v => v.trim()) : false;
                  return (
                    <div key={slug} className="flex items-center gap-3 py-2 border-b border-[#5E2E14]/40">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border ${filled ? 'bg-[#BD5319]/20 border-[#BD5319]/40' : 'border-[#5E2E14]'}`}>
                        {filled && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#BD5319" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span className="text-[#8C847C] text-sm font-light flex-1">{title}</span>
                      {!filled && <span className="text-[#5C564F] text-xs">not filled yet</span>}
                    </div>
                  );
                })}
                {form.includeCard9 && (
                  <div className="flex items-center gap-3 py-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border ${form.rituals['_custom'] && Object.values(form.rituals['_custom']).some(v => v.trim()) ? 'bg-[#C9A84C]/20 border-[#C9A84C]/40' : 'border-[#5E2E14]'}`}>
                      {form.rituals['_custom'] && Object.values(form.rituals['_custom']).some(v => v.trim()) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <span className="text-[#8C847C] text-sm font-light flex-1">Custom Ritual{form.customRitualName ? ` — ${form.customRitualName}` : ''}</span>
                  </div>
                )}
              </div>
            </div>
            {status === 'error' && <p className="text-[#BD5319] text-sm mb-4">Something went wrong. Please try again.</p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => goTo(stepIndex - 1)} className="text-[#5C564F] hover:text-white text-sm px-5 py-3 rounded-xl border border-[#5E2E14] hover:border-white/20 transition-all">← Back</button>
              <button onClick={handleSubmit} disabled={status === 'submitting' || !form.email}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#BD5319] hover:bg-[#A34310] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-all active:scale-95">
                {status === 'submitting'
                  ? <><svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" /></svg>Submitting...</>
                  : <>Submit My Family&apos;s Details <Arrow /></>}
              </button>
            </div>
          </Card>
        )}
      </div>

      {/* ── Save & Continue Later Modal ── */}
      {showSaveModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#FAF6F0] rounded-2xl w-full max-w-md p-7 text-center border border-[#EFEAE2] shadow-2xl animate-fade-in-up">
            <div className="w-16 h-16 bg-[#0D9488]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0D9488]/20">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14l6 6 10-10" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-[#2A1208] mb-2 font-normal" style={{ fontFamily: 'var(--font-serif)' }}>
              Progress Saved!
            </h3>
            <p className="text-[#8C847C] text-sm leading-relaxed mb-5 font-light">
              Your answers have been saved. You can close this tab and return anytime using your magic link. You&apos;ll continue exactly where you left off.
            </p>

            {magicLink && (
              <div className="bg-[#F4DEB0] border border-[#EFEAE2] rounded-xl p-4 mb-5 text-left">
                <p className="text-[#8C847C] text-xs mb-2 font-medium">Your magic link (bookmark this!):</p>
                <p className="text-[#2A1208] text-xs break-all font-mono leading-relaxed mb-3 max-h-16 overflow-y-auto">{magicLink}</p>
                <button
                  onClick={copyLink}
                  className={`w-full text-sm font-semibold px-4 py-2.5 rounded-lg transition-all ${
                    linkCopied
                      ? 'bg-[#0D9488] text-white'
                      : 'bg-[#2A1208] text-white hover:bg-[#3E1A0C]'
                  }`}
                >
                  {linkCopied ? '✓ Copied to clipboard!' : 'Copy Link'}
                </button>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 bg-[#BD5319] hover:bg-[#A34310] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all"
              >
                Keep Filling
              </button>
            </div>
            <p className="text-[#8C847C] text-xs mt-4 font-light">
              You can safely close this tab now. Your progress is saved locally and will be here when you return.
            </p>
          </div>
        </div>
      )}
    </Shell>
  );
}

// ─── Page export (Suspense wraps useSearchParams) ──────────────────────────
export default function IntakeClient({ initialEmail = '', initialRitualSlugs = [], sanityRituals = [], token = '' }: IntakeClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2A1208] flex items-center justify-center"><span className="text-[#5C564F] text-sm">Loading...</span></div>}>
      <IntakeInner initialEmail={initialEmail} initialRitualSlugs={initialRitualSlugs} sanityRituals={sanityRituals} token={token} />
    </Suspense>
  );
}

// ─── Tiny reusable components ──────────────────────────────────────────────

function Shell({ children, bar, pct, savedAt }: { children: React.ReactNode; bar: boolean; pct: number; savedAt: string | null }) {
  return (
    <div className="min-h-screen bg-[#2A1208]">
      <div className="sticky top-0 z-50 bg-[#2A1208]/95 backdrop-blur-sm border-b border-[#5E2E14]">
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#BD5319]/20 border border-[#BD5319]/40 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10 C2 6, 6 2, 10 2" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M2 10 C6 10, 10 6, 10 2" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-serif text-lg text-white font-normal" style={{ fontFamily: 'var(--font-serif)' }}>Hamari Virasat</span>
          </div>
          {savedAt && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
              <span className="text-[#5C564F] text-xs font-light">Saved {savedAt}</span>
            </div>
          )}
        </div>
        {bar && <div className="h-0.5 bg-[#3E1A0C]"><div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(to right,#BD5319,#C9A84C)' }} /></div>}
      </div>
      {children}
    </div>
  );
}

function Card({ children, title, sub, step, total }: { children: React.ReactNode; title: string; sub: string; step: number; total: number }) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <p className="text-[#BD5319] text-xs font-bold tracking-[0.3em] uppercase mb-3">Step {step} of {total}</p>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-3" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h2>
        <p className="text-[#8C847C] text-sm font-light leading-relaxed">{sub}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Fld({ label, hint, req, children }: { label: string; hint?: string; req?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#8C847C] text-xs uppercase tracking-wider mb-2 font-medium">
        {label}{req && <span className="text-[#BD5319] ml-1">*</span>}
        {hint && <span className="text-[#5C564F] normal-case tracking-normal font-light ml-2">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function Nav({ back, next, canNext, nextLabel, onSave }: { back: () => void; next: () => void; canNext: boolean; nextLabel?: string; onSave?: () => void }) {
  return (
    <div className="flex flex-col gap-3 pt-4">
      <div className="flex gap-3">
        <button onClick={back} className="text-[#5C564F] hover:text-white text-sm px-5 py-3 rounded-xl border border-[#5E2E14] hover:border-white/20 transition-all">← Back</button>
        <button onClick={next} disabled={!canNext} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#BD5319] hover:bg-[#A34310] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all active:scale-95">
          {nextLabel ?? 'Continue'} <Arrow />
        </button>
      </div>
      {onSave && (
        <button
          onClick={onSave}
          className="w-full inline-flex items-center justify-center gap-2 text-[#C9A84C] hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl border border-[#C9A84C]/30 hover:border-[#C9A84C]/60 hover:bg-[#C9A84C]/10 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 8.5V11a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5.5L11 3.5V8.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 2v2.5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Save & Continue Later
        </button>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 py-2 border-b border-[#5E2E14]/50">
      <span className="text-[#5C564F] text-xs uppercase tracking-wider w-20 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-white text-sm font-light">{value}</span>
    </div>
  );
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
