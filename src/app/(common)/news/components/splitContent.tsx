// src/lib/splitContent.ts
export function splitContentAtMidpoint(html: string) {
  if (!html) return { first: "", second: "" };

  // <p>...</p> ব্লকগুলো আলাদা আলাদা ধরা
  const paragraphs = html.match(/<p[\s\S]*?<\/p>/gi);

  // যদি <p> ট্যাগ না পাওয়া যায় (content অন্যভাবে structured), পুরোটাই first-এ রাখা নিরাপদ
  if (!paragraphs || paragraphs.length < 2) {
    return { first: html, second: "" };
  }

  const midpoint = Math.ceil(paragraphs.length / 2);
  const first = paragraphs.slice(0, midpoint).join("");
  const second = paragraphs.slice(midpoint).join("");

  return { first, second };
}
