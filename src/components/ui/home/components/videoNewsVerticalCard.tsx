import Link from "next/link";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosTime } from "react-icons/io";
import { IPost } from "@/types/blogs";

interface VideoNewsVerticalCardProps {
  videoNews?: IPost;
}

const VideoNewsVerticalCard = ({ videoNews }: VideoNewsVerticalCardProps) => {
  return (
    <div className="card bg-white shadow-sm">
      <Link href={`news/${videoNews?.postId}`}>
      <iframe
        src={videoNews?.mainImage}
        title="YouTube video player"
        style={{
          border: "none",
          width: "100%",
          height: "250px",
          flexShrink: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="px-2">
        <h2 className="card-title mt-2">{videoNews?.category || "TECH"}</h2>
        <p className="text-[#183354] text-sm font-bold mt-2.5">
          {videoNews?.title || "Implementing A Reset Password Feature With Dynamic Routes"}
        </p>
        <div className="card-actions mt-2.5">
          <div className="flex  gap-4 mb-3">
            <p className="flex items-center gap-1 text-xs text-[#6D757F]">
              <CiCalendar /> {videoNews?.postDate || "27 Jun, 2026"}
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
