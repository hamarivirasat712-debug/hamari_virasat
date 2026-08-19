import { NextResponse } from 'next/server';
import { createAdminSession, COOKIE_NAME } from '@/lib/adminAuth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Virasat@2025';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = await createAdminSession();

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
