import { jwtVerify } from 'jose';
import IntakeClient from './IntakeClient';
import Link from 'next/link';

const JWT_SECRET = process.env.JWT_SECRET || 'hamari_virasat_super_secure_random_key_998877';

export default async function IntakePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; r?: string }>;
}) {
  const resolvedParams = await searchParams;
  const token = resolvedParams.token;
  const rParam = resolvedParams.r;

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
    // Verify the token and get decoded payload
    const { payload } = await jwtVerify(token, secretKey);
    
    const initialEmail = typeof payload.email === 'string' ? payload.email : '';
    let initialRituals: number[] = Array.isArray(payload.ritualIndices)
      ? payload.ritualIndices.map(Number).filter(n => !isNaN(n) && n >= 0 && n <= 7)
      : [];

    if (initialRituals.length === 0 && rParam) {
      initialRituals = rParam.split(',').map(Number).filter(n => !isNaN(n) && n >= 0 && n <= 7);
    }

    // If successful, render the client form with server-verified JWT parameters
    return (
      <IntakeClient
        initialEmail={initialEmail}
        initialRitualIndices={initialRituals}
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
