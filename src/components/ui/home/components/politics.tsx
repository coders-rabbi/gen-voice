import Link from "next/link";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import cycleMan from "@/assets/home/cycle.jpg";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import basket from "@/assets/home/basket.jpg";
import football from "@/assets/home/football.jpg";
import boxing from "@/assets/home/boxing.jpg";
import PoliticsSideCard from "./politicsSideCard";
import { getAllBlog } from "@/services/postService";

const Politics = async () => {
  const posts = await getAllBlog();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2.5  ">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-xl text-[#3E3232] ">Politics</h2>
        </div>

        <Link
          href="/"
          className="border border-[#D1E2FD] text-[#3385FF] px-3 py-1.5 rounded-2xl flex items-center gap-1.5"
        >
          View All
          <MdArrowForwardIos />
        </Link>
      </div>

      <div className="flex gap-3 items-center w-full mt-2.5">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-4">
        <div className="md:col-span-8">
          <Image
            src={cycleMan}
            alt="gen voice"
            className="w-full h-auto object-cover"
          />
          <div className="mt-4">
            <h2 className="text-[#6D757F] text-xs font-semibold">Swimming</h2>
            <p className="text-[#183354] text-xl font-bold mt-1.5">
              How To Protect Your App With Threat Model Based On w To Protect
              Your App With Based
            </p>
            <p className="flex items-center gap-1 text-[16px] text-[#6D757F] mt-2.5 font-semibold">
              <CiCalendar /> 27 Jun, 2026
            </p>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {posts.slice(0, 4).map((item) => (
              <PoliticsSideCard key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politics;
