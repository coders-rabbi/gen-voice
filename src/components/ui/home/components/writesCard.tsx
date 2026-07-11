import Image from "next/image";
import React from "react";
import img from "@/assets/home/man2.jpg";
import { FaBookmark, FaEye, FaPlus, FaRegBookmark } from "react-icons/fa6";
import Link from "next/link";
import { IWriter } from "@/types/wrtiers";

interface writersPrps {
  writers: IWriter;
}

const WritesCard = ({ writers }: writersPrps) => {
  return (
    <div>
      <Link href="/dashboard">
        <div className="flex items-center gap-2 border p-1.5 w-full rounded-[12px]">
          <Image
            src={writers?.profile_image}
            alt="gen voice"
            width={100}
            height={100}
            className="h-20 w-20 object-cover"
          />
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <h3>{writers?.writers_name}</h3>
              <p className="text-[#3E3232BF]">{writers?.posts} posts</p>
            </div>
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="flex gap-1 items-center border py-1 px-2 rounded-xl text-[10px]"
              >
                <FaPlus />
                Follow
              </Link>

              <Link
                href="/dashboard"
                className="flex gap-1 items-center border-2 py-1 px-2 rounded-xl bg-[#3385FF] text-white text-[10px]"
              >
                <FaEye />
                View Profile
              </Link>

              <FaRegBookmark className="text-[16px]" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WritesCard;
