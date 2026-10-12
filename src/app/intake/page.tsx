import { jwtVerify } from 'jose';
import IntakeClient from './IntakeClient';
import Link from 'next/link';
import { client } from '@/sanity/client';
import zlib from 'zlib';

const JWT_SECRET = process.env.JWT_SECRET || 'hamari_virasat_super_secure_random_key_998877';

// Legacy index→slug map for backward compat with old JWT tokens
const LEGACY_INDEX_TO_SLUG: Record<number, string> = {
  0: 'namkaran',
  1: 'mundan',
  2: 'upanayana',
  3: 'engagement',
  4: 'wedding-haldi',
  5: 'wedding-mehendi',
  6: 'wedding-main',
  7: 'griha-pravesh',
};

// Fetch full ritual metadata from Sanity at request time (no caching)
const RITUALS_QUERY = `*[_type == "ritual"] | order(order asc, number asc) {
  _id,
  number,
  slug,
  title,
  sublabel,
  category,
  subSections,
  isDIY
}`;

function computeSlug(r: { slug?: string | { current?: string }; number: string; title: string }) {
  if (r.slug) return typeof r.slug === 'string' ? r.slug : r.slug.current || '';
  const numIdx = parseInt(r.number, 10) - 1;
  if (!isNaN(numIdx) && LEGACY_INDEX_TO_SLUG[numIdx]) return LEGACY_INDEX_TO_SLUG[numIdx];
  return r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function IntakePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; r?: string; d?: string }>;
}) {
  const resolvedParams = await searchParams;
  const token = resolvedParams.token;
  const rParam = resolvedParams.r;
  const dParam = resolvedParams.d;

  if (!token) {
    return (
      <div className="min-h-screen bg-[#2A1208] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-3xl text-[#BD5319] mb-4">Access Denied</h1>
        <p className="text-[#8C847C] mb-6">
          You need a secure link to access this form. Please complete your purchase to receive the link via email.
        </p>
        <Link 
          href="/#pricing" 
          className="bg-[#BD5319] text-white px-6 py-3 rounded-xl hover:bg-[#A34310] transition-colors"
        >
          View Pricing
        </Link>
      </div>
    );
  }

  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    
    const initialEmail = typeof payload.email === 'string' ? payload.email : '';

    // Extract ritual slugs from JWT (new flow)
    let initialSlugs: string[] = [];

    if (Array.isArray(payload.ritualSlugs)) {
      initialSlugs = (payload.ritualSlugs as string[]).filter(s => typeof s === 'string' && s.length > 0);
    }

    // Backward compat: if JWT has ritualIndices but no slugs, convert
    if (initialSlugs.length === 0 && Array.isArray(payload.ritualIndices)) {
      initialSlugs = (payload.ritualIndices as number[])
        .map(Number)
        .filter(n => !isNaN(n) && n >= 0 && n <= 7)
        .map(i => LEGACY_INDEX_TO_SLUG[i])
        .filter(Boolean);
    }

    // URL `r` param fallback (can be slug strings or legacy indices)
    if (initialSlugs.length === 0 && rParam) {
      const parts = rParam.split(',').map(s => s.trim()).filter(Boolean);
      // Check if they are numeric (legacy) or slug strings
      const allNumeric = parts.every(p => /^\d+$/.test(p));
      if (allNumeric) {
        initialSlugs = parts.map(Number).filter(n => n >= 0 && n <= 7).map(i => LEGACY_INDEX_TO_SLUG[i]).filter(Boolean);
      } else {
        initialSlugs = parts; // Already slug strings
      }
    }

    // Try decompressing draft state from `d` param
    let initialDraft: any = null;
    if (dParam) {
      try {
        const inflated = zlib.inflateRawSync(Buffer.from(dParam, 'base64url')).toString('utf8');
        initialDraft = JSON.parse(inflated);
      } catch (err) {
        console.error('Failed to inflate draft parameter:', err);
      }
    }

    // Fetch rituals from Sanity CMS — always fresh
    const rawRituals = await client.fetch(RITUALS_QUERY);
    const sanityRituals = (rawRituals || []).map((r: any) => ({
      ...r,
      slug: computeSlug(r),
    }));

    return (
      <IntakeClient
        initialEmail={initialEmail}
        initialRitualSlugs={initialSlugs}
        sanityRituals={sanityRituals}
        token={token}
        initialDraft={initialDraft}
      />
    );
  } catch (error) {
    console.error('Invalid token:', error);
    return (
      <div className="min-h-screen bg-[#2A1208] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-3xl text-[#BD5319] mb-4">Link Expired or Invalid</h1>
        <p className="text-[#8C847C] mb-6">
          The secure link you used is invalid or has expired. If you believe this is an error, please contact support.
        </p>
        <Link 
          href="/" 
          className="bg-[#3E1A0C] border border-[#5E2E14] text-white px-6 py-3 rounded-xl hover:border-[#C9A84C]/30 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }
}
