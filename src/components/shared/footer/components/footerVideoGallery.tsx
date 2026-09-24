"use client";

import { useState } from "react";
import Image from "next/image";

interface VideosProps {
  videos?: string[];
}

type VideoItem = {
  id: number;
  url: string;
  youtubeId: string | null;
};

const BG_COLORS = [
  "bg-[#E2B2E6]",
  "bg-[#F2BA1D]",
  "bg-[#35265F]",
  "bg-[#F8C360]",
  "bg-[#55B4FF]",
  "bg-[#CBC8CE]",
  "bg-[#E5E4E6]",
  "bg-[#1F1235]",
  "bg-[#0F1115]",
];

// watch?v=, youtu.be/, /embed/, /shorts/, /live/ সব ধরনের link থেকে ID বের করে
const getYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return u.pathname.slice(1) || null;

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const match = u.pathname.match(/^\/(embed|shorts|live)\/([\w-]{6,})/);
      if (match) return match[2];
    }
    return null;
  } catch {
    return null;
  }
};

export default function FooterVideoGallery({ videos = [] }: VideosProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const items: VideoItem[] = videos
    .map((url) => url.trim())
    .filter(Boolean)
    .slice(0, 9)
    .map((url, index) => ({
      id: index,
      url,
      youtubeId: getYouTubeId(url),
    }));

  if (items.length === 0) {
    return <p className="text-xs text-gray-400">No videos added yet.</p>;
  }

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-3 gap-2 sm:gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveVideo(item)}
            className={`${BG_COLORS[item.id % BG_COLORS.length]} group relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl shadow-sm transition-transform duration-300 hover:scale-105 sm:rounded-[32px]`}
          >
            {item.youtubeId && (
              <Image
                src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                alt={`Video ${item.id + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            )}

            <div className="absolute z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/60 shadow-md backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/90">
              <div className="ml-0.5 h-0 w-0 border-b-[6px] border-l-[10px] border-t-[6px] border-b-transparent border-l-gray-800 border-t-transparent sm:ml-1 sm:border-b-[10px] sm:border-l-[16px] sm:border-t-[10px]"></div>
            </div>
          </div>
        ))}
      </div>

      {/* ভিডিও পপ-আপ (Modal) */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute right-6 top-6 text-5xl font-extralight text-white transition-colors hover:text-gray-300"
            onClick={() => setActiveVideo(null)}
          >
            &times;
          </button>

          <div
            className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {activeVideo.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={`Video ${activeVideo.id + 1}`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <video
                src={activeVideo.url}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
