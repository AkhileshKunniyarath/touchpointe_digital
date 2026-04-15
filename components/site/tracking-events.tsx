"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export function TrackingEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialView = useRef(false);

  useEffect(() => {
    if (!hasTrackedInitialView.current) {
      hasTrackedInitialView.current = true;
      return;
    }

    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (gaId && typeof window.gtag === "function") {
      window.gtag("config", gaId, { page_path: url });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

