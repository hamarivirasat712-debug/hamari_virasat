'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ─── Data ──────────────────────────────────────────────────────────────────────

const ALL_RITUALS = [
  { index: 0, label: 'Namkaran',              sublabel: 'Naming Ceremony' },
  { index: 1, label: 'Mundan',                sublabel: 'First Haircut' },
  { index: 2, label: 'Upanayana / Janeu',     sublabel: 'Sacred Thread Ceremony' },
  { index: 3, label: 'Engagement',            sublabel: 'Sagai' },
  { index: 4, label: 'Wedding — Haldi',       sublabel: 'Turmeric Ceremony' },
  { index: 5, label: 'Wedding — Mehendi',     sublabel: 'Henna Ceremony' },
  { index: 6, label: 'Wedding — Main Ceremony', sublabel: 'Pheras & Vidaai' },
  { index: 7, label: 'Griha Pravesh',         sublabel: 'Housewarming' },
];

const SUB_QUESTIONS = [
  { key: 'steps',       label: "Ritual steps in your family's sequence",    placeholder: 'Describe what happens, in order, from start to finish...' },
  { key: 'samagri',    label: 'Samagri / items required',                   placeholder: 'List everything needed: materials, utensils, flowers...' },
  { key: 'songs',      label: 'Songs, prayers & mantras',                   placeholder: 'Include the words or phonetic spelling as your family says them...' },
  { key: 'roles',      label: 'Roles of each family member',                placeholder: 'Who stands where, who performs which action...' },
  { key: 'variations', label: 'Regional or family-specific variations',     placeholder: 'Anything your family does differently from the standard version...' },
  { key: 'photos',     label: 'Photos or videos you can share later',       placeholder: 'Just describe what you have — we will follow up for the actual files...' },
];

const MAX_SELECT = 3;
const STORAGE_KEY = 'virasat-intake-v2';

type RitualData = Record<string, string>;
type StepId = 'intro' | 'contact' | 'select' | 'ancestral' | number | 'card9' | 'review';

interface FormData {
  email: string;
  name: string;
  phone: string;
  selectedRituals: number[];
  includeCard9: boolean;
  gotra: string;
  kuldevi: string;
  kuldevta: string;
  rituals: RitualData[];
  customRitualName: string;
}

const emptyRitual = (): RitualData => ({ steps: '', samagri: '', songs: '', roles: '', variations: '', photos: '' });

const defaultForm = (): FormData => ({
  email: '', name: '', phone: '',
  selectedRituals: [], includeCard9: false,
  gotra: '', kuldevi: '', kuldevta: '',
  rituals: Array.from({ length: 9 }, emptyRitual),
  customRitualName: '',
});

function buildSteps(sel: number[], card9: boolean): StepId[] {
  const s: StepId[] = ['intro', 'contact', 'select', 'ancestral'];
  sel.slice(0, MAX_SELECT).forEach(i => s.push(i));
  if (card9) s.push('card9');
  s.push('review');
  return s;
}

// ─── Inner (needs useSearchParams) ────────────────────────────────────────────

function IntakeInner() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormData>(defaultForm());
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [hasRestored, setHasRestored] = useState(false);
  const [urlLocked, setUrlLocked] = useState(false);

  const steps = buildSteps(form.selectedRituals, form.includeCard9);
  const currentId = steps[stepIndex] ?? 'review';

  // URL params (Razorpay flow)
  useEffect(() => {
    const r = searchParams.get('r');
    const c9 = searchParams.get('c9');
    if (r) {
      const indices = r.split(',').map(Number).filter(n => n >= 0 && n <= 7).slice(0, MAX_SELECT);
      if (indices.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm(prev => ({ ...prev, selectedRituals: indices, includeCard9: c9 === '1' }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUrlLocked(true);
      }
    }
  }, [searchParams]);

  // Restore localStorage
  useEffect(() => {
    if (searchParams.get('r')) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm(saved.form);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStepIndex(saved.stepIndex ?? 1);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSavedAt(saved.savedAt ?? null);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasRestored(true);
      }
    } catch { /* ignore */ }
  }, [searchParams]);

  const persist = useCallback((f: FormData, si: number) => {
    const ts = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form: f, stepIndex: si, savedAt: ts }));
    setSavedAt(ts);
  }, []);

  const updateForm = (patch: Partial<FormData>) =>
    setForm(prev => { const n = { ...prev, ...patch }; persist(n, stepIndex); return n; });

  const updateRitual = (ri: number, key: string, value: string) =>
    setForm(prev => {
      const rituals = prev.rituals.map((r, i) => i === ri ? { ...r, [key]: value } : r);
      const n = { ...prev, rituals };
      persist(n, stepIndex);
      return n;
    });

  const goTo = (ni: number) => { setStepIndex(ni); persist(form, ni); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const clearAndRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setForm(defaultForm()); setStepIndex(0); setHasRestored(false); setSavedAt(null);
  };

  const toggleRitual = (idx: number) =>
    setForm(prev => {
      const sel = prev.selectedRituals;
      const next = sel.includes(idx)
        ? sel.filter(i => i !== idx)
        : sel.length < MAX_SELECT ? [...sel, idx] : sel;
      const n = { ...prev, selectedRituals: next };
      persist(n, stepIndex);
      return n;
    });

  const handleSubmit = async () => {
    setStatus('submitting');
    try {
      const url = process.env.NEXT_PUBLIC_APPS_SCRIPT_INTAKE_URL;
      if (url) {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: process.env.NEXT_PUBLIC_APPS_SCRIPT_SHARED_SECRET,
            type: 'intake',
            ...form,
            selectedRitualNames: form.selectedRituals.map(i => ALL_RITUALS[i].label),
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
            Our team will begin documentation and deliver your heirloom record within 7 days.
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
              This form takes about 20–40 minutes. You don&apos;t have to do it all at once — your answers are saved automatically as you go.
            </p>
            {hasRestored && (
              <div className="w-full max-w-md bg-[#3E1A0C] border border-[#C9A84C]/30 rounded-2xl p-5 mb-8 text-left">
                <p className="text-[#C9A84C] text-sm font-medium mb-1">✦ Welcome back</p>
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
            <p className="text-[#5C564F] text-xs mt-6 font-light">Takes 20–40 min · Save &amp; resume anytime · Completely private</p>
          </div>
        )}

        {/* CONTACT */}
        {currentId === 'contact' && (
          <Card step={stepLabel} total={stepTotal} title="Let's start with you" sub="So we can send your documentation and resume link.">
            <Fld label="Your name" req><input className={inputCls} type="text" placeholder="Rohit Sharma" value={form.name} onChange={e => updateForm({ name: e.target.value })} /></Fld>
            <Fld label="Email address" req><input className={inputCls} type="email" placeholder="rohit@example.com" value={form.email} onChange={e => updateForm({ email: e.target.value })} /></Fld>
            <Fld label="Phone number" hint="optional"><input className={inputCls} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => updateForm({ phone: e.target.value })} /></Fld>
            <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)} canNext={!!(form.name && form.email)} />
          </Card>
        )}

        {/* RITUAL SELECTION */}
        {currentId === 'select' && (
          <Card step={stepLabel} total={stepTotal}
            title="Which rituals did you purchase?"
            sub={urlLocked ? 'Your ritual selection has been pre-loaded from your order.' : `Select up to ${MAX_SELECT} rituals — only those sections will appear in the form.`}
          >
            {urlLocked ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {form.selectedRituals.map(i => (
                  <div key={i} className="flex items-center gap-2 bg-[#BD5319]/15 border border-[#BD5319]/40 rounded-xl px-4 py-2">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#BD5319" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="text-white text-sm">{ALL_RITUALS[i].label}</span>
                  </div>
                ))}
                {form.includeCard9 && <div className="flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-xl px-4 py-2"><span className="text-[#C9A84C] text-sm">Custom Ritual</span></div>}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#5C564F] text-xs">{form.selectedRituals.length} of {MAX_SELECT} selected</span>
                  {form.selectedRituals.length === MAX_SELECT && <span className="text-[#C9A84C] text-xs font-medium">✦ Maximum reached</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {ALL_RITUALS.map(({ index, label, sublabel }) => {
                    const sel = form.selectedRituals.includes(index);
                    const maxed = !sel && form.selectedRituals.length >= MAX_SELECT;
                    return (
                      <button key={index} type="button" disabled={maxed} onClick={() => toggleRitual(index)}
                        className={`text-left px-4 py-3.5 rounded-xl border transition-all ${sel ? 'bg-[#BD5319]/15 border-[#BD5319]/60 ring-1 ring-[#BD5319]/30' : maxed ? 'bg-[#3E1A0C]/40 border-[#5E2E14]/40 opacity-40 cursor-not-allowed' : 'bg-[#3E1A0C] border-[#5E2E14] hover:border-[#BD5319]/40 cursor-pointer'}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-white text-sm font-medium">{label}</p>
                            <p className="text-[#5C564F] text-xs mt-0.5 font-light">{sublabel}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 border transition-colors ${sel ? 'bg-[#BD5319] border-[#BD5319]' : 'border-[#5E2E14]'}`}>
                            {sel && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button type="button" onClick={() => updateForm({ includeCard9: !form.includeCard9 })}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all ${form.includeCard9 ? 'bg-[#C9A84C]/10 border-[#C9A84C]/40' : 'bg-[#3E1A0C] border-[#5E2E14] hover:border-[#C9A84C]/30'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-white text-sm font-medium">Custom / Regional Ritual</p>
                      <p className="text-[#5C564F] text-xs mt-0.5 font-light">Card 9 — your family&apos;s unique ritual not in the list above</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border transition-colors ${form.includeCard9 ? 'bg-[#C9A84C] border-[#C9A84C]' : 'border-[#5E2E14]'}`}>
                      {form.includeCard9 && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                  </div>
                </button>
              </>
            )}
            <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)}
              canNext={form.selectedRituals.length > 0 || form.includeCard9}
              nextLabel={`Fill in my ${form.selectedRituals.length + (form.includeCard9 ? 1 : 0)} ritual${(form.selectedRituals.length + (form.includeCard9 ? 1 : 0)) !== 1 ? 's' : ''}`}
            />
          </Card>
        )}

        {/* ANCESTRAL PROFILE */}
        {currentId === 'ancestral' && (
          <Card step={stepLabel} total={stepTotal} title="Ancestral Profile" sub="These details ground every ritual in your specific lineage. Leave blank if you don't know.">
            <Fld label="Gotra" hint="e.g. Kashyap, Bharadwaj"><input className={inputCls} type="text" placeholder="Your family's patrilineal lineage" value={form.gotra} onChange={e => updateForm({ gotra: e.target.value })} /></Fld>
            <Fld label="Kuldevi" hint="Ancestral goddess"><input className={inputCls} type="text" placeholder="e.g. Chamunda Mata, Vaishno Devi" value={form.kuldevi} onChange={e => updateForm({ kuldevi: e.target.value })} /></Fld>
            <Fld label="Kuldevta" hint="Ancestral deity"><input className={inputCls} type="text" placeholder="e.g. Shiva, Vishnu, Ganesha" value={form.kuldevta} onChange={e => updateForm({ kuldevta: e.target.value })} /></Fld>
            <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)} canNext />
          </Card>
        )}

        {/* RITUAL DETAIL (only selected rituals appear) */}
        {typeof currentId === 'number' && (() => {
          const info = ALL_RITUALS[currentId];
          const pos = form.selectedRituals.indexOf(currentId) + 1;
          return (
            <Card step={stepLabel} total={stepTotal} title={info.label} sub={`Ritual ${pos} of ${form.selectedRituals.length} — ${info.sublabel}. Fill in as much or as little as you know.`}>
              {SUB_QUESTIONS.map(q => (
                <Fld key={q.key} label={q.label}>
                  <textarea className={`${inputCls} min-h-[80px]`} rows={3} placeholder={q.placeholder}
                    value={form.rituals[currentId][q.key] || ''} onChange={e => updateRitual(currentId, q.key, e.target.value)} />
                </Fld>
              ))}
              <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)} canNext />
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
                  value={form.rituals[8][q.key] || ''} onChange={e => updateRitual(8, q.key, e.target.value)} />
              </Fld>
            ))}
            <Nav back={() => goTo(stepIndex - 1)} next={() => goTo(stepIndex + 1)} canNext />
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
                {form.selectedRituals.map(i => {
                  const filled = Object.values(form.rituals[i]).some(v => v.trim());
                  return (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-[#5E2E14]/40">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border ${filled ? 'bg-[#BD5319]/20 border-[#BD5319]/40' : 'border-[#5E2E14]'}`}>
                        {filled && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#BD5319" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span className="text-[#8C847C] text-sm font-light flex-1">{ALL_RITUALS[i].label}</span>
                      {!filled && <span className="text-[#5C564F] text-xs">not filled yet</span>}
                    </div>
                  );
                })}
                {form.includeCard9 && (
                  <div className="flex items-center gap-3 py-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border ${Object.values(form.rituals[8]).some(v => v.trim()) ? 'bg-[#C9A84C]/20 border-[#C9A84C]/40' : 'border-[#5E2E14]'}`}>
                      {Object.values(form.rituals[8]).some(v => v.trim()) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
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
    </Shell>
  );
}

// ─── Page export (Suspense wraps useSearchParams) ──────────────────────────────
export default function IntakePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2A1208] flex items-center justify-center"><span className="text-[#5C564F] text-sm">Loading...</span></div>}>
      <IntakeInner />
    </Suspense>
  );
}

// ─── Tiny reusable components ──────────────────────────────────────────────────

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
            <span className="font-serif text-lg text-white font-normal" style={{ fontFamily: 'var(--font-serif)' }}>Virasat</span>
          </div>
          {savedAt && <span className="text-[#5C564F] text-xs font-light">Saved {savedAt}</span>}
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

function Nav({ back, next, canNext, nextLabel }: { back: () => void; next: () => void; canNext: boolean; nextLabel?: string }) {
  return (
    <div className="flex gap-3 pt-4">
      <button onClick={back} className="text-[#5C564F] hover:text-white text-sm px-5 py-3 rounded-xl border border-[#5E2E14] hover:border-white/20 transition-all">← Back</button>
      <button onClick={next} disabled={!canNext} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#BD5319] hover:bg-[#A34310] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all active:scale-95">
        {nextLabel ?? 'Continue'} <Arrow />
      </button>
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
