import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieOptions = {
    httpOnly: true,
    path: '/',
    maxAge: -1, // Expire immediately
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };

  const publicCookieOptions = {
    ...cookieOptions,
    httpOnly: false,
  };

  const authToken = serialize('auth-token', '', cookieOptions);
  const logUser = serialize('log-user', '', publicCookieOptions);
  const logMenu = serialize('log-menu', '', publicCookieOptions);

  const res = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

  res.headers.append('Set-Cookie', authToken);
  res.headers.append('Set-Cookie', logUser);
  res.headers.append('Set-Cookie', logMenu);

  return res;
}
