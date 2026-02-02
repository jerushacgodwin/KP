 import { NextRequest, NextResponse } from 'next/server';
type User = {
  id: number;
  username: string;
  email: string;
  role: number;
  school_id: string;
};
 export function middleware(req: NextRequest) {
    

   const token = req.cookies.get('auth-token')?.value;
   const userString=req.cookies.get('log-user')?.value;
   const menuCookie = req.cookies.get("log-menu")?.value;
 let user: any = null;


  if (!token) {
    // console.log("Middleware: No token properly received from Electron. Allowing Client-Side auth to handle it.");
    // return NextResponse.redirect(new URL('/', req.url));
  }

  //try {
  if (userString) {
       user = JSON.parse(userString) as User;
  }

      
       //console.log(usermenu)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    //   role: string;
    // };
    
         const url = new URL(req.url);
  if (menuCookie && user?.role !== 1) {
    try {
      const userMenu = JSON.parse(menuCookie) as string[];
      const path = url.pathname;
      
      // Implicitly allow dashboard roots based on role
      let isAllowed = userMenu.includes(path);
      if (user.role === 1 && path === '/admin') isAllowed = true;
      if (user.role === 2 && path === '/teacher') isAllowed = true;
      if (user.role === 3 && path === '/student') isAllowed = true;

      // Handle sub-paths
      if (['/admin', '/teacher', '/student', '/hr', '/library', '/transport', '/hostel'].some(p => path.startsWith(p)) && !isAllowed) {
         return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (e) {
      console.error("Middleware error parsing menu:", e);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/student/:path*', 
    '/teacher/:path*',
    '/hr/:path*',
    '/library/:path*',
    '/transport/:path*',
    '/hostel/:path*'
  ],
}
//import { NextResponse } from 'next/server'


// export function middleware(request: NextRequest) {

// }

// export const config = {
//   matcher: ['/:path*'],
// }