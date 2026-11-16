"use client";

import { useEffect, useRef, useState } from "react";

const AD_KEY = "19dd77840952e69b112c74461acc41d4";

export default function AdsterraNative() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(250);

  // iframe এর ভেতরের ad এর উচ্চতা অনুযায়ী height ঠিক করে
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (
        e.source === iframeRef.current?.contentWindow &&
        typeof e.data?.adHeight === "number" &&
        e.data.adHeight > 0
      ) {
        setHeight(e.data.adHeight);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const srcDoc = `<!DOCTYPE html><html><head>
<base target="_blank">
<style>body{margin:0}</style></head><body>
<script async="async" data-cfasync="false" src="https://bicea.org/21/${AD_KEY}"></script>
<div id="container-${AD_KEY}"></div>
<script>
new ResizeObserver(function(){
  parent.postMessage({adHeight: document.documentElement.scrollHeight}, "*");
}).observe(document.body);
</script>
</body></html>`;

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      title="Advertisement"
      scrolling="no"
      style={{ width: "100%", height, border: 0 }}
    />
  );
}
