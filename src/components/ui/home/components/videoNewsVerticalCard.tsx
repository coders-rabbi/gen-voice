import Link from "next/link";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosTime } from "react-icons/io";

const VideoNewsVerticalCard = () => {
  return (
    <div className="card bg-white shadow-sm">
      <iframe
        src="https://www.youtube.com/embed/LijdyVaaDnY?si=UddbM73azEwKYvNS"
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
        <h2 className="card-title mt-2">TECH</h2>
        <p className="text-[#183354] text-[17px] font-bold mt-2.5">
          Implementing A Reset Password Feature With Dynamic Routes
        </p>
        <div className="card-actions mt-2.5">
          <div className="flex  gap-4 mb-3">
            <p className="flex items-center gap-1 text-xs text-[#6D757F]">
              <CiCalendar /> 27 Jun, 2026
            </p>
            <p className="flex items-center gap-1 text-xs text-[#6D757F]">
              <IoIosTime /> 20 MINS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoNewsVerticalCard;
