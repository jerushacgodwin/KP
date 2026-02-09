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
import { getPermissions } from "@src/lib/indexedDB";
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
            // Try getting from IndexedDB first (Primary Source)
      try {
        const dbPermissions = await getPermissions();
                if (dbPermissions && dbPermissions.length > 0) {
                        setMenuList(dbPermissions);
            const logUserCookie = Cookies.get('log-user');
            if (logUserCookie) {
                setUser(JSON.parse(logUserCookie));
            }
            setLoading(true);
            return;
        } else {
             console.warn("DASHBOARD: IDB returned empty or null");
        }
      } catch (e) {
        console.error("Failed to load from IndexedDB", e);
      }

      // Fallback: Check cookie (Legacy/Backup)
      const menuCookie = Cookies.get('log-menu');
      const userCookie = Cookies.get('log-user');

      if (userCookie) {
                    try {
              const user = JSON.parse(userCookie);
              const response: any = await apiFetch(`${apiUrl}/user/role`, 'POST', { role: user.role });
              
              if (response && response.userpermission) {
                  // Replicate Login Logic: Filter & Deduplicate
                  const rawPermissions = response.userpermission
                     .filter((p: any) => user.role == 1 || p.group_id == user.role);
                  
                  const uniquePermissionsMap = new Map();
                  rawPermissions.forEach((p: any) => {
                      if (!uniquePermissionsMap.has(p.slug)) {
                          uniquePermissionsMap.set(p.slug, p);
                      }
                  });
                  const cleanPermissions = Array.from(uniquePermissionsMap.values());
                  
                                    await import("@src/lib/indexedDB").then(mod => mod.savePermissions(cleanPermissions));
                  setMenuList(cleanPermissions);
                  setUser(user);
                  setLoading(true);
                  return; // Recovered!
              }
          } catch (apiErr) {
              console.error("DASHBOARD: Self-heal failed", apiErr);
          }
      }

      if (menuCookie) {
         // Cookie now has slugs, so we can't fully render strings.
         console.warn("IndexedDB empty but cookie exists. IDB might be slow or failed.");
         setLoading(true); // Allow page to render even if menu is empty for now
      } else {
         console.warn("DASHBOARD: No IDB and No Cookie. Redirecting...");
         // window.location.href = "/sign-in"; 
      }
    };
    fetchMenu();
   
  }, []);
  useEffect(() => {
      const getSiteDetails = async () => {
       const response: any = await apiFetch(`${apiUrl}/class/getsite`,"GET");
        if (response || response.siteDetail) {
          const siteData = JSON.parse(response.siteDetail.meta_value);
       setSiteDetail(siteData);
       //
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
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 overflow-y-auto h-screen sticky top-0">
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
