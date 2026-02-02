"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { deleteDatabase } from "@src/lib/indexedDB";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/logout");
        await deleteDatabase();
        // Clear any client-side accessible cookies just in case
        Cookies.remove("log-user");
        Cookies.remove("log-menu");
        
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Logout failed", error);
        router.push("/");
      }
    };

    logout();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-500">Logging out...</p>
    </div>
  );
};

export default LogoutPage;
