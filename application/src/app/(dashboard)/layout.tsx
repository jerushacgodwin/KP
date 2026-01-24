'use client';
import Menu from "@src/components/Menu";
import Navbar from "@src/components/Navbar";
import { apiFetch } from "@src/lib/api";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

//import { useUser } from '../context/UserContext';
//import { serialize } from 'cookie';
import Cookies from "js-cookie"
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    //const user = useUser();
     //let response
     //const logUserCookie = Cookies.get('log-user');
//const userMenu= JSON.parse(logUserCookie);
 //const logUserCookie = Cookies.get('log-menu')
   const [menuLsit, setMenuList] = useState<any>(null)
    const [currentUser, setUser] = useState<any>(null)
    const [siteDetail, setSiteDetail] = useState<any>(null);

 const [loading, setLoading] = useState(false);

  
  useEffect(() => {
   
 const fetchMenu = async () => {
      const menuCookie = Cookies.get('log-menu');
      const logUserCookie = Cookies.get('log-user');
      if (menuCookie) {
        try {
          const parsed = JSON.parse(menuCookie);
          let user = null;
          if (logUserCookie) {
            user = JSON.parse(logUserCookie);
          }
          setMenuList(parsed);
            setLoading(true);
            setUser(user);
        } catch (err) {
          console.error('Failed to parse menu cookie', err);
          window.location.href = "/sign-in";
        }
      } else {
         window.location.href = "/sign-in";
      }
     // done loading, render the page
    };
    fetchMenu();
   
  }, []);
  useEffect(() => {
      const getSiteDetails = async () => {
       const response: any = await apiFetch(`${apiUrl}/class/getsite`,"GET");
        if (response || response.siteDetail) {
          const siteData = JSON.parse(response.siteDetail.meta_value);
       setSiteDetail(siteData);
       //console.log("Site Details:", siteData);
        }
      
    };
    getSiteDetails();
  }, []);
if (!loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }
  if (loading) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src={`/uploads/school/${siteDetail?.logo}`} alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">{siteDetail?.school_name}</span>
        </Link>
        <Menu menulist={menuLsit} userDetail={currentUser}/>
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA]  flex flex-col">
        <Navbar userDetail={currentUser}/>
        {children}
      </div>
    </div>
  );
}
}
