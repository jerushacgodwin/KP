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
 
    return NextResponse.redirect(new URL('/', req.url));
  }

  //try {
       user =JSON.parse(userString)as User;

      
       //console.log(usermenu)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    //   role: string;
    // };
    
         const url = new URL(req.url);
    if(menuCookie) {

 const userMenu=JSON.parse(menuCookie) as any;
 //console.log("User Menu:", userMenu);
  if (userMenu.includes(url.pathname) ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    }    
   

    // if (url.pathname.startsWith('/student') && user.role !== 1) {
    //   return NextResponse.redirect(new URL('/unauthorized', req.url));
    // }

    // if (url.pathname.startsWith('/teacher') && decoded.role !== 'teacher') {
    //   return NextResponse.redirect(new URL('/unauthorized', req.url));
    // }
//return new NextResponse('Middleware Intercepted This Page')

     return NextResponse.next();
//  } catch (err) {
//     console.error('JWT verification failed:', err);
//     return NextResponse.redirect(new URL('/login', req.url));
//    }
}

export const config = {
  matcher: ['/admin/:path*', '/student/:path*', '/teacher/:path*'],
}
//import { NextResponse } from 'next/server'


// export function middleware(request: NextRequest) {

// }

// export const config = {
//   matcher: ['/:path*'],
// }