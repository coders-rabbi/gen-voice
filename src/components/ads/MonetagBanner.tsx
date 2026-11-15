// components/MonetagBanner.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  scriptSrc: string; // Monetag দেওয়া script URL
  zoneId?: string; // Monetag দেওয়া zone id (থাকলে)
  width: number;
  height: number;
};

export default function MonetagBanner({
  scriptSrc,
  zoneId,
  width,
  height,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    if (zoneId) script.setAttribute("data-zone", zoneId);

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [scriptSrc, zoneId]);

  return (
    <div
      ref={containerRef}
      style={{ width, height, minHeight: height }}
      className="mx-auto my-4 flex items-center justify-center"
    />
  );
}
