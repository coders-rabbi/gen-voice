
"use client";

import Script from "next/script";

export default function MonetagIPP() {
  return (
    <Script
      id="monetag-ipp-12267571"
      strategy="afterInteractive"
    >
      {`
        (function(s) {
          s.dataset.zone = '12267571';
          s.src = 'https://nap5k.com/tag.min.js';
        })(
          [document.documentElement, document.body]
            .filter(Boolean)
            .pop()
            .appendChild(document.createElement('script'))
        );
      `}
    </Script>
  );
}
