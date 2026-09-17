import Image from "next/image";
import React from "react";
import { GoBookmark, GoDotFill } from "react-icons/go";
import manimg from "@/assets/home/man2.jpg";
import { TNews } from "@/types/news";
import Link from "next/link";

interface newsProps {
  news: TNews;
}
const TechnologyCard = ({ news }: newsProps) => {
  return (
    <div className="relative z-10 md:ml-10 -mt-30 w-[80%] bg-white border p-5 md:p-8 rounded-xl mx-auto">
      <div className="flex justify-between mb-4">
        <Link href="/categories/technology" className="flex items-center bg-[#3385FF] px-3 py-2 text-white text-xs md:text-sm font-semibold rounded-[6px]">
          <GoDotFill />
          Technology
        </Link>
        <GoBookmark className="text-3xl text-[#3385FF]" />
      </div>
      <Link
        href={`/news/${news?.newsId}`}
        className="text-sm md:text-[20px] mb-2 md:mb-4 font-semibold text-black"
      >
        {news?.title}
      </Link>
      <div className="flex items-center gap-2">
        <Image
          src={news?.reporterId?.profileImage}
          alt="gen voice"
          className="w-10 md:w-12 h-10 md:h-12 rounded-full "
          width={10}
          height={10}
          unoptimized
        />
        <h1 className="text-[#97989F] text-[10px] md:text-[16px]">
          {news?.reporterId?.fullName}
        </h1>
        <h1 className="text-[#97989F] text-[10px] md:text-[16px]">
          {news?.createdAt.split("T")[0]}
        </h1>
      </div>
    </div>
  );
};

export default TechnologyCard;
