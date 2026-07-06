import Image from "next/image";
import React from "react";
import img from "@/assets/home/man2.jpg";
import { FaBookmark, FaEye, FaPlus, FaRegBookmark } from "react-icons/fa6";
import Link from "next/link";

const WritesCard = () => {
  return (
    <div className="flex items-center gap-2 border shadow-xl p-1.5 w-full rounded-[12px]">
      <Image src={img} alt="gen voice" className="h-20 w-20 object-cover" />
      <div>
        <div className="flex justify-between mb-2">
          <h3>Louis Hebregts</h3>
          <p className="text-[#3E3232BF]">27 post</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Link
            href="/"
            className="flex gap-3 items-center border-2 py-1 px-3 rounded-xl"
          >
            <FaPlus />
            Follow
          </Link>

          <Link
            href="/"
            className="flex gap-3 items-center border-2 py-1 px-3 rounded-xl bg-[#3385FF] text-white"
          >
            <FaEye />
            Follow
          </Link>

          <FaRegBookmark className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default WritesCard;
