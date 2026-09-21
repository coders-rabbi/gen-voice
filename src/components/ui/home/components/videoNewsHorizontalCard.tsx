"use client";

import { useState } from "react";
import { TNews } from "@/types/news";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { FaPlay } from "react-icons/fa6";

interface VideoNewsProps {
  videoNews: TNews;
}

// যেকোনো ফরম্যাটের YouTube লিংক (watch?v=, youtu.be/, embed/, shorts/) থেকে video ID বের করা
function getYoutubeVideoId(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/watch")) {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1];
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/shorts/")[1];
      }
    }

    if (!videoId) return null;
    return videoId.split("&")[0].split("?")[0];
  } catch {
    return null;
  }
}

const VideoNewsHorizontalCard = ({ videoNews }: VideoNewsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeVideoId(videoNews?.videoUrl ?? "");
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  // publishAt কে আলাদা ভ্যারিয়েবলে বের করে নিলাম যাতে টাইপ নিরাপদ থাকে
  const publishAt = videoNews?.publishAt;
  const publishDate = publishAt
    ? publishAt.slice(0, publishAt.indexOf("T"))
    : "";

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative w-full sm:w-[120px] aspect-video sm:h-[90px] flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
        {isPlaying && embedUrl ? (
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={videoNews?.title || "YouTube video player"}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={handlePlayClick}
            className="relative w-full h-full overflow-hidden"
          >
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail}
                alt={videoNews?.title || "Video thumbnail"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
                No preview
              </div>
            )}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-8 w-8 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors">
                <FaPlay className="text-white text-xs sm:text-[10px] ml-0.5" />
              </span>
            </span>
          </button>
        )}
      </div>

      <Link href={`/news/${videoNews?.newsId}`} className="flex-1 min-w-0">
        <div>
          <h5 className="text-[#6D757F] text-xs font-semibold truncate">
            {videoNews?.categoryId?.categoryName}
          </h5>
          <h3 className="text-[#183354] text-[13px] sm:text-[10px] font-semibold mt-1.5 line-clamp-2">
            {videoNews?.title || "Using Instagram tawo promote your"}
          </h3>
          <p className="flex items-center gap-1 text-xs text-[#6D757F] mt-2.5">
            <CiCalendar /> {publishDate}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default VideoNewsHorizontalCard;