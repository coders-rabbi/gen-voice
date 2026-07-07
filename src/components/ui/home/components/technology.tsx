import Image from "next/image";
import React from "react";
import { GoBookmark, GoDotFill } from "react-icons/go";
import manimg from "@/assets/home/man2.jpg";

const TechnologyCard = () => {
  return (
    <div className="relative z-10 md:ml-10 -mt-30 w-[80%] bg-white border p-5 md:p-10 rounded-xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="flex items-center bg-[#3385FF] px-3 py-2 text-white font-semibold rounded-[6px]">
          <GoDotFill />
          Technology
        </h1>
        <GoBookmark className="text-3xl text-[#3385FF]" />
      </div>
      <h1 className="text-[15px] md:text-[28px] mb-4 font-semibold text-black">
        The Impact of Technology on the Workplace: How Technology is Changing
      </h1>
      <div className="flex items-center gap-2">
        <Image
          src={manimg}
          alt="gen voice"
          className="w-16 h-16 rounded-full "
        />
        <h1 className="text-[#97989F] text-[10px] md:text-[16px]">Json Francisco</h1>
        <h1 className="text-[#97989F] text-[10px] md:text-[16px]">August 20, 2025</h1>
      </div>
    </div>
  );
};

export default TechnologyCard;
