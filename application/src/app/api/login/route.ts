import { apiFetch } from '../../../lib/api';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

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
    
    
    if (!menuResponse || !menuResponse.userpermission || menuResponse.userpermission.length === 0) {
      console.error("ERROR: No permissions returned from API!");
      return NextResponse.json({ message: 'Failed to fetch user permissions' }, { status: 500 });
    }

    const maxAge = body.remember ? 60 * 60 * 24 * 30 : 3600;

    const cookie = serialize('auth-token', response.token, {
      httpOnly: true,
      path: '/',
      maxAge: maxAge,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    const userData = serialize('log-user', JSON.stringify(response.user), {
      httpOnly: false,
      path: '/',
      maxAge: maxAge,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    const userMenu = serialize('log-menu', JSON.stringify(menuResponse.userpermission), {
      httpOnly: false,
      path: '/',
      maxAge: maxAge,
      sameSite: 'lax',
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

    const responseData = { 
        message: 'Success', 
        redirect: `/${roleName}`,
        // Return sensitive data for client-side fallback (Electron)
        token: response.token,
        user: response.user,
        userpermission: menuResponse.userpermission
    };
    
    
    // Create response with all cookies using NextResponse
    const finalResponse = NextResponse.json(responseData, { status: 200 });
    
    // CRITICAL: Use the cookies() method which properly handles multiple cookies
    finalResponse.cookies.set({
      name: 'auth-token',
      value: response.token,
      httpOnly: true,
      path: '/',
      maxAge: maxAge,
      sameSite: 'lax',
      secure: false
    });
    
    finalResponse.cookies.set({
      name: 'log-user',
      value: JSON.stringify(response.user),
      httpOnly: false,
      path: '/',
      maxAge: maxAge,
      sameSite: 'lax',
      secure: false
    });
    
    // Reduce permissions data size - only store essential fields
    const compactPermissions = menuResponse.userpermission.map((p: any) => ({
      slug: p.slug,
      name: p.name,
      icon: p.icon,
      group: p.group,
      group_id: p.group_id
    }));
    
    
    finalResponse.cookies.set({
      name: 'log-menu',
      value: JSON.stringify(compactPermissions),
      httpOnly: false,
      path: '/',
      maxAge: maxAge,
      sameSite: 'lax',
      secure: false
    });
    
    
    return finalResponse;
  } catch (err: any) {
    console.error("CRITICAL Login Error:", err.message, err.stack);
    return NextResponse.json({ message: err.message || "Internal Server Error" }, { status: 500 });
  }
}