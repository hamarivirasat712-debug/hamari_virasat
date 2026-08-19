import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const ADMIN_SECRET_KEY = process.env.ADMIN_SESSION_SECRET || 'eb56f8c6b3947e248f27245af749234efcc1d92fd57afd62d0d6f5f9bc598fbf';
const secret = () => new TextEncoder().encode(ADMIN_SECRET_KEY);

export async function createAdminSession(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret());
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminSession(token);
}

export { COOKIE_NAME };
