
"use client";

import Script from "next/script";

export default function MonetagAd() {
  return (
    <Script
      id="monetag-zone-12267535"
      strategy="afterInteractive"
    >
      {`
        (function(s) {
          s.dataset.zone = '12267535';
          s.src = 'https://nap5k.com/tag.min.js';
          document.head.appendChild(s);
        })(document.createElement('script'));
      `}
    </Script>
  );
}
