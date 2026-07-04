import NewsCard from "@/components/newsCardHorizontal";
import React from "react";

const Sports = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5 ">
        <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
        <h2 className="text-2xl text-[#3E3232] ">Sport</h2>
      </div>
      <div className="flex gap-3 items-center w-full mt-2.5">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <NewsCard />
        <NewsCard />
      </div>
      <div className="flex gap-4 mb-4">
        <NewsCard />
        <NewsCard />
      </div>
      <div className="flex gap-4">
        <NewsCard />
        <NewsCard />
      </div>
    </div>
  );
};

export default Sports;
