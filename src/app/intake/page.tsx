import { jwtVerify } from 'jose';
import IntakeClient from './IntakeClient';
import Link from 'next/link';

// Fallback secret for local development
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';

export default async function IntakePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const resolvedParams = await searchParams;
  const token = resolvedParams.token;

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
    // Verify the token
    await jwtVerify(token, secretKey);
    
    // If successful, render the client form
    return <IntakeClient />;
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
