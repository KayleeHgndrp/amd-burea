"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function GtmPageview(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = searchParams.toString();
    const url = pathname + (query ? `?${query}` : "");

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }, [pathname, searchParams]);

  return null;
}
