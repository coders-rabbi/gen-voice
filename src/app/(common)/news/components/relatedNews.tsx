import NewsCard from "@/components/newsCardHorizontal";
import { TNews } from "@/types/news";
import React from "react";

interface newsProps {
  news: TNews[];
}

const RelatedNews = ({ news }: newsProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5 ">
        <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
        <h2 className="text-xl text-[#3E3232] ">Related News</h2>
      </div>
      <div className="flex gap-3 items-center w-full mt-2.5 mb-5">
        <div className="w-8 h-2 rounded-br-2xl bg-[#3385FF] flex-shrink-0"></div>
        <div className="flex flex-col gap-0.5 flex-1">
          <hr className="w-full border-t border-[#3384FE33]" />
          <hr className="w-full border-t border-[#3384FE33]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {news.slice(0, 3).map((item) => (
          <NewsCard key={item?._id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedNews;
