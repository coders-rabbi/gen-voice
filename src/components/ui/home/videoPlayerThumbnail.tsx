"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa6";

interface VideoPlayerThumbnailProps {
  embedUrl?: string;
  title?: string;
}

function getYoutubeThumbnail(embedUrl?: string): string | null {
  if (!embedUrl) return null;
  try {
    const url = new URL(embedUrl);
    const videoId = url.pathname.split("/").pop();
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return null;
  }
}

const VideoPlayerThumbnail = ({
  embedUrl,
  title,
}: VideoPlayerThumbnailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = getYoutubeThumbnail(embedUrl);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <iframe
        src={`${embedUrl}${embedUrl?.includes("?") ? "&" : "?"}autoplay=1`}
        title={title || "YouTube video player"}
        style={{
          border: "none",
          width: "100vw",
          maxWidth: "350px",
          height: "250px",
          flexShrink: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlayClick}
      className="relative overflow-hidden bg-gray-200"
      style={{
        width: "100vw",
        maxWidth: "350px",
        height: "250px",
        flexShrink: 0,
      }}
    >
      {thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnail}
          alt={title || "Video thumbnail"}
          className="w-full h-full object-cover"
        />
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors">
          <FaPlay className="text-white text-xl ml-1" />
        </span>
      </span>
    </button>
  );
};

export default VideoPlayerThumbnail;