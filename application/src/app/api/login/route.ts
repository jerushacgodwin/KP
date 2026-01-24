import { apiFetch } from '../../../lib/api';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface User {
  role: number;
  [key: string]: any;
}

interface LoginResponse {
  token: string;
  user: User;
  role?: string; // We might attach this later
}

interface MenuResponse {
  userpermission: any;
  [key: string]: any;
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await apiFetch<LoginResponse>(
      `${apiUrl}/user/login`,
      'POST',
      body
    );

    if (!response || !response.token || !response.user) {
      return NextResponse.json({ message: 'Invalid user' }, { status: 400 });
    }

    const menuResponse = await apiFetch<MenuResponse>(
      `${apiUrl}/user/role`,
      'POST',
      { role: response.user.role }
    );

    const cookie = serialize('auth-token', response.token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    const userData = serialize('log-user', JSON.stringify(response.user), {
      httpOnly: false,
      path: '/',
      maxAge: 3600,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    const userMenu = serialize('log-menu', JSON.stringify(menuResponse.userpermission), {
      httpOnly: false,
      path: '/',
      maxAge: 3600,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    let roleName = 'student';
    switch (response.user.role) {
      case 3:
        roleName = 'student';
        break;
      case 2:
        roleName = 'teacher';
        break;
      case 1:
        roleName = 'admin';
        break;
    }

    const res = NextResponse.json({ message: 'Success', redirect: `/${roleName}` }, { status: 200 });
    res.headers.append('Set-Cookie', cookie);
    res.headers.append('Set-Cookie', userData);
    res.headers.append('Set-Cookie', userMenu);
    
    return res;
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Internal Server Error" }, { status: 401 });
  }
}