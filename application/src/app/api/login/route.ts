import { apiFetch } from '../../../lib/api';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
export async function POST(req: Request) {
  const body = await req.json();


const apiUrl = process.env.API_URL;
//console.log("API URL:", apiUrl);
 // const role = ;
  //const user={}
  // For example, proxy to external auth service (optional)
  try {
    //console.log("Request body:", body);
    const response = await apiFetch<{ token: string; role: string;user:{} }>(
      `${apiUrl}/user/login`,
      'POST',
      body
    );
   if (!response || !response.token || !response.user) {
      return NextResponse.json({ message: 'Invalid user ' }, { status: 400 });
    }
       const menuResponse = await apiFetch<{ roleList: {} }>(
        `${apiUrl}/user/role`,
        'POST',
        {role:response.user.role}
      );
     // const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1h' });
const cookie = serialize('auth-token', response.token, {
    httpOnly: true,
    path: '/',
    maxAge: 3600,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  const UserData=serialize('log-user',JSON.stringify(response.user),{
    httpOnly: false,
    path: '/',
    maxAge: 3600,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
   const userMenu=serialize('log-menu',JSON.stringify(menuResponse.userpermission),{
    httpOnly: false,
    path: '/',
    maxAge: 3600,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
  console.log(response)
switch (response.user.role) {
  case 3:
    response.role = 'student';
    break;
  case 2:
    response.role = 'teacher';
    break;
  case 1:
    response.role = 'admin';
    break;

}

  // Check if the role is valid

  const res = NextResponse.json({ message: 'Success', redirect: `/${response.role}` }, { status: 200 });
 res.headers.append('Set-Cookie', cookie);
res.headers.append('Set-Cookie', UserData);;
res.headers.append('Set-Cookie', userMenu);;
    return res;
  } catch (err) {
     return NextResponse.json({ message: err.message }, { status: 401 });
  }
}