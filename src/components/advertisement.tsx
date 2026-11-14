"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

export default function Advertisement() {
  const adRef = useRef<HTMLModElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;

    // বিজ্ঞাপন এল কিনা (data-ad-status = "filled" / "unfilled") সেটা দেখার জন্য
    const observer = new MutationObserver(() => {
      setFilled(ad.getAttribute("data-ad-status") === "filled");
    });
    observer.observe(ad, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });

    try {
      if (!ad.dataset.adsbygoogleStatus) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`w-full max-w-[750px] mx-auto overflow-hidden ${
        filled ? "my-8" : "my-0 h-0"
      }`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8538918502717714"
        data-ad-slot="3019047900"
      />
    </div>
  );
}
