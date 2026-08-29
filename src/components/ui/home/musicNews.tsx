import Advertisement from "@/components/advertisement";
import NewsCardVertical from "@/components/newsCardVertical";
import { getAllNews } from "@/services/news";
import { TNews } from "@/types/news";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

interface newsProps {
  news: TNews[];
}

const MusicNews = async ({ news }: newsProps) => {
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2.5  ">
          <div className="w-1.5 h-4 rounded-3xl bg-[#3385FF]"></div>
          <h2 className="text-[14px] font-semibold text-[#3E3232] ">Music</h2>
        </div>

        <Link
          href="/categories/music"
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

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-4">
        {news.slice(0, 9).map((item) => (
          <NewsCardVertical key={item._id} news={item} />
        ))}
      </div>

      <Advertisement />
    </div>
  );
};

export default MusicNews;
