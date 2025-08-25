"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoader } from "./LoaderContext";

export default function RouteLoader() {
  const router = useRouter();
  const { setLoading } = useLoader();

  useEffect(() => {
    // In Next.js 13+ app router, we don't have router.events
    // Instead, use `router.push` triggers directly or track changes via startTransition
    setLoading(false); // Ensure false initially
  }, [router, setLoading]);

  return null; // No UI, just logic
}
