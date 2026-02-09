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
    const loginUrl = `${apiUrl}/user/login`;
        
    const response = await apiFetch<LoginResponse>(
      loginUrl,
      'POST',
      body
    );
    
    if (!response || !response.token || !response.user) {
      console.error("DEBUG_LOGIN: Invalid response content", response);
      return NextResponse.json({ message: 'Invalid user' }, { status: 400 });
    }

    const roleUrl = `${apiUrl}/user/role`;
        const menuResponse = await apiFetch<MenuResponse>(
      roleUrl,
      'POST',
      { role: response.user.role }
    );
        
    if (!menuResponse || !menuResponse.userpermission) {
      console.error("DEBUG_LOGIN: No permissions returned from API!", menuResponse);
      return NextResponse.json({ message: 'Failed to fetch user permissions' }, { status: 500 });
    }

    const maxAge = body.remember ? 60 * 60 * 24 * 30 : 3600;

    // RESTORED: roleName definition
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

    // Process and deduplicate permissions
    let compactPermissions: any[] = [];
    try {
        if (Array.isArray(menuResponse.userpermission)) {
            const rawPermissions = menuResponse.userpermission
              .filter((p: any) => response.user.role == 1 || p.group_id == response.user.role);
            
            // Deduplicate by slug
            const uniquePermissionsMap = new Map();
            rawPermissions.forEach((p: any) => {
                if (!uniquePermissionsMap.has(p.slug)) {
                    uniquePermissionsMap.set(p.slug, {
                        slug: p.slug,
                        name: p.name,
                        icon: p.icon,
                        group: p.group,
                        group_id: p.group_id
                    });
                }
            });
            
            compactPermissions = Array.from(uniquePermissionsMap.values());
                    } else {
             console.warn("DEBUG_LOGIN: userpermission is not an array", menuResponse.userpermission);
        }
    } catch (filterError) {
        console.error("DEBUG_LOGIN: ERROR during permission filtering:", filterError);
    }

    const responseData = { 
        message: 'Success', 
        redirect: `/${roleName}`,
        token: response.token,
        user: response.user,
        userpermission: compactPermissions 
    };

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
    
    // Store ONLY minimal slugs in the cookie for Middleware security
    const minimalisticSlugs = compactPermissions.map((p: any) => p.slug);
    finalResponse.cookies.set({
      name: 'log-menu',
      value: JSON.stringify(minimalisticSlugs),
      httpOnly: false,
      path: '/',
      maxAge: maxAge,
      sameSite: 'lax',
      secure: false
    });
    
    return finalResponse;
  } catch (err: any) {
    console.error("CRITICAL Login Error:", err.message);
    const status = err.status || 500;
    return NextResponse.json({ message: err.message || "Internal Server Error" }, { status });
  }
}