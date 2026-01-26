// components/PageLoaderHandler.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Loader from './Loader'; // Your spinner component

let timeout: NodeJS.Timeout;

export default function PageLoaderHandler({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    clearTimeout(timeout);
    // Simulate loading for UX purposes
    timeout = setTimeout(() => {
      setLoading(false);
    }, 350); // Minimum loading time
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <div className="fixed inset-0 z-50 bg-white/50"><Loader /></div>}
      {children}
    </>
  );
}
