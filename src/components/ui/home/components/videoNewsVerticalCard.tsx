"use client";

import { useState } from "react";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { IoIosTime } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { TNews } from "@/types/news";

interface VideoNewsVerticalCardProps {
  videoNews?: TNews;
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

const VideoNewsVerticalCard = ({ videoNews }: VideoNewsVerticalCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeVideoId(videoNews?.videoUrl ?? "");
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(true);
  };

  return (
    <div className="card bg-white shadow-sm w-full overflow-hidden">
      <div className="relative w-full aspect-video">
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
            className="relative w-full h-full overflow-hidden bg-gray-200"
          >
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail}
                alt={videoNews?.title || "Video thumbnail"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                No preview
              </div>
            )}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors">
                <FaPlay className="text-white text-base sm:text-lg ml-0.5" />
              </span>
            </span>
          </button>
        )}
      </div>

      <Link href={`/news/${videoNews?.newsId}`}>
        <div className="px-2">
          <h2 className="card-title mt-1 text-sm truncate">
            {videoNews?.categoryId?.categoryName}
          </h2>
          <p className="text-[#183354] text-sm font-bold mt-1 line-clamp-2">
            {videoNews?.title ||
              "Implementing A Reset Password Feature With Dynamic Routes"}
          </p>
          <div className="card-actions mt-1">
            <div className="flex gap-4 mb-3 flex-wrap">
              <p className="flex items-center gap-1 text-xs text-[#6D757F]">
                <CiCalendar />{" "}
                {videoNews?.publishAt?.slice(
                  0,
                  videoNews.publishAt.indexOf("T"),
                )}
              </p>
              <p className="flex items-center gap-1 text-xs text-[#6D757F]">
                <IoIosTime /> 20 MINS
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoNewsVerticalCard;
